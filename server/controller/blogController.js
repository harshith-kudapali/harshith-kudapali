import BlogPost from '../models/BlogPost.js';
import Newsletter from '../models/Newsletter.js';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
// Get all blog posts
export const getAllPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag, search } = req.query;
    const query = {};

    // Add filters
    if (category) {
      query.categories = { $in: [category] };
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const posts = await BlogPost.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const total = await BlogPost.countDocuments(query);

    res.json(posts); // Return posts directly as expected by frontend
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Error fetching blog posts', error: error.message });
  }
};

// Get single blog post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Increment view count
    post.views = (post.views || 0) + 1;
    await post.save();

    res.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ message: 'Error fetching blog post', error: error.message });
  }
};

// Create new blog post (manual)
export const createPost = async (req, res) => {
  try {
    const postData = {
      ...req.body,
      readTime: calculateReadTime(req.body.content)
    };

    const newPost = new BlogPost(postData);
    const savedPost = await newPost.save();
    
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(400).json({ message: 'Error creating blog post', error: error.message });
  }
};

// Create blog post from URL

const makeUrlAbsolute = (relativeUrl, baseUrl) => {
  if (!relativeUrl || relativeUrl.startsWith('http') || relativeUrl.startsWith('data:')) {
    return relativeUrl;
  }
  try {
    return new URL(relativeUrl, baseUrl).href;
  } catch (error) {
    console.warn('Could not convert to absolute URL:', relativeUrl);
    return relativeUrl;
  }
};


export const createPostFromUrl = async (req, res) => {
  const { url, customTitle, customExcerpt, categories, tags, featured, trending } = req.body;

  // 1. Input Validation
  if (!url) {
    return res.status(400).json({ message: 'URL is required.' });
  }
  try {
    new URL(url);
  } catch (_) {
    return res.status(400).json({ message: 'Invalid URL format provided.' });
  }

  try {
    // 2. Fetch Page Content
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 15000
    });

    const html = response.data;
    const baseUrl = new URL(url).origin;

    // 3. Use JSDOM and Readability for robust article extraction
    const doc = new JSDOM(html, { url });
    const reader = new Readability(doc.window.document);
    const article = reader.parse();

    if (!article) {
      throw new Error('Failed to parse the article. The page may not be a readable article.');
    }

    // 4. Use Cheerio for detailed metadata and avatar extraction
    const $ = cheerio.load(html);

    // 5. Extract Metadata (Title, Excerpt, Image, Author Name)
    const extractedTitle = article.title || $('meta[property="og:title"]').attr('content') || $('title').text() || 'Untitled';
    const extractedExcerpt = article.excerpt || $('meta[property="og:description"]').attr('content') || $('meta[name="description"]').attr('content');
    const mainImage = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || article.lead_image_url;
    const extractedAuthorName = article.byline || $('meta[name="author"]').attr('content');

    // --- NEW: Avatar Extraction Logic ---
    let extractedAvatar = '';

    // Strategy 1: Look for JSON-LD structured data (most reliable)
    $('script[type="application/ld+json"]').each((i, el) => {
        try {
            const jsonData = JSON.parse($(el).html());
            const graph = jsonData['@graph'] || jsonData;
            const articles = Array.isArray(graph) ? graph : [graph];

            const articleNode = articles.find(node => ['Article', 'NewsArticle', 'BlogPosting'].includes(node['@type']));
            
            if (articleNode && articleNode.author) {
                const authors = Array.isArray(articleNode.author) ? articleNode.author : [articleNode.author];
                const person = authors.find(a => a['@type'] === 'Person' && a.image);
                if (person) {
                    const image = person.image;
                    if (typeof image === 'string') {
                        extractedAvatar = image;
                    } else if (image && typeof image === 'object' && image.url) {
                        extractedAvatar = image.url;
                    }
                }
            }
        } catch (e) { /* Ignore JSON parsing errors */ }
        if (extractedAvatar) return false; // Exit loop if found
    });

    // Strategy 2: Heuristic search (if JSON-LD fails)
    if (!extractedAvatar) {
        const authorElement = $('[rel="author"]').first() || $('.author-name').first() || $('.byline a').first();
        if (authorElement.length) {
            const parent = authorElement.closest('.author-info, .author-bio, .byline, .author-card');
            if (parent.length) {
                extractedAvatar = parent.find('img').attr('src');
            } else {
                extractedAvatar = authorElement.parent().find('img').attr('src');
            }
        }
    }
    // --- End of Avatar Logic ---

    // 6. Assemble the data payload
    const postData = {
      title: customTitle || extractedTitle.trim(),
      excerpt: customExcerpt || extractedExcerpt?.trim(),
      content: article.content,
      image: makeUrlAbsolute(mainImage, baseUrl),
      author: {
        name: extractedAuthorName?.trim() || 'Unknown Author',
        bio: `Content from ${article.siteName || new URL(url).hostname}`,
        // Add the found avatar, ensuring it's an absolute URL
        avatar: makeUrlAbsolute(extractedAvatar, baseUrl),
      },
      categories: categories && categories.length > 0 ? categories : ['General'],
      tags: tags && tags.length > 0 ? tags : ['imported'],
      featured: featured || false,
      trending: trending || false,
      sourceUrl: url,
      readTime: calculateReadTime(article.textContent),
    };
    
    // 7. Save to Database
    const newPost = new BlogPost(postData);
    const savedPost = await newPost.save();
    
    res.status(201).json(savedPost);

  } catch (error) {
    console.error(`Error creating post from URL [${url}]:`, error.message);
    
    // 8. Specific Error Handling
    if (error.isAxiosError) {
      const statusCode = error.response?.status || 500;
      return res.status(400).json({
        message: `Failed to fetch the URL. The site responded with status: ${statusCode}.`,
        error: error.message
      });
    }
    if (error.message.includes('Failed to parse')) {
      return res.status(422).json({
        message: 'The URL was fetched, but a readable article could not be extracted.',
        error: error.message
      });
    }
    res.status(500).json({ message: 'An internal server error occurred.', error: error.message });
  }
};

// Update blog post
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(400).json({ message: 'Error updating blog post', error: error.message });
  }
};

// Delete blog post
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    
    if (!deletedPost) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ message: 'Error deleting blog post', error: error.message });
  }
};

// Add comment to blog post
export const addComment = async (req, res) => {
  try {
    const { text, author } = req.body;
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const newComment = {
      text,
      author,
      createdAt: new Date()
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(400).json({ message: 'Error adding comment', error: error.message });
  }
};

// Toggle like on blog post
export const toggleLike = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    const { liked } = req.body; // Get the liked status from request body

    if (liked) {
      // User is liking the post
      post.likes = (post.likes || 0) + 1;
    } else {
      // User is unliking the post
      post.likes = Math.max((post.likes || 0) - 1, 0); // Ensure likes don't go below 0
    }

    await post.save();

    res.json({ 
      success: true,
      likes: post.likes,
      message: liked ? 'Post liked successfully' : 'Post unliked successfully'
    });
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error toggling like', 
      error: error.message 
    });
  }
};


// Subscribe to newsletter
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email });
    if (existingSubscription) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const newSubscription = new Newsletter({ email });
    await newSubscription.save();

    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    res.status(400).json({ message: 'Error subscribing to newsletter', error: error.message });
  }
};

// Get featured posts
export const getFeaturedPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    res.status(500).json({ message: 'Error fetching featured posts', error: error.message });
  }
};

// Get trending posts
export const getTrendingPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({})
      .sort({ trending: -1, likes: -1, createdAt: -1 })
      .limit(6);
    res.json(posts);
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    res.status(500).json({ message: 'Error fetching trending posts', error: error.message });
  }
};


// Helper functions
function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function extractContent($) {
  // Remove unwanted elements
  $('script, style, nav, header, footer, aside, .ad, .advertisement').remove();
  
  // Try to find main content area
  let content = $('article').html() || 
                $('.content').html() || 
                $('.post-content').html() || 
                $('.entry-content').html() ||
                $('main').html() ||
                $('.container').html();

  // If no specific content area found, try to extract paragraphs
  if (!content) {
    const paragraphs = $('p').map((i, el) => $(el).html()).get();
    content = paragraphs.join('</p><p>');
    if (content) {
      content = `<p>${content}</p>`;
    }
  }

  return content || 'Content could not be extracted';
}
