import { Router } from 'express';
const blogRoutes = Router();
import { getAllPosts, getPostById, createPost, createPostFromUrl, updatePost, deletePost, addComment, toggleLike, subscribeNewsletter, getFeaturedPosts, getTrendingPosts } from '../controller/blogController.js';
import BlogPost from '../models/BlogPost.js';
// Get all blog posts
blogRoutes.get('/blog-posts', getAllPosts);

// Get a single blog post by ID
blogRoutes.get('/blog-posts/:id', getPostById);

// Create a new blog post (manual)
blogRoutes.post('/blog-posts', createPost);

// Create a blog post from URL
blogRoutes.post('/blog-posts/from-url', createPostFromUrl);

// Update a blog post
blogRoutes.put('/blog-posts/:id', updatePost);

// Delete a blog post
blogRoutes.delete('/blog-posts/:id', deletePost);

// Add comment to a blog post
blogRoutes.post('/blog-posts/:id/comments', addComment);

// Like/Unlike a blog post
blogRoutes.post('/blog-posts/:id/like', toggleLike);

// Subscribe to newsletter
blogRoutes.post('/newsletter/subscribe', subscribeNewsletter);

// Get featured posts
blogRoutes.get('/blog-posts/featured/list', getFeaturedPosts);

// Get trending posts
blogRoutes.get('/blog-posts/trending/list', getTrendingPosts);

// Add this to your backend routes (e.g., in your blog routes file)
blogRoutes.get('/blog-posts/:id/source', async (req, res) => {
    try {
        const postId = req.params.id;
        console.log('Fetching source for post ID:', postId);
        
        // Find the post in your database
        const post = await BlogPost.findById(postId);
        console.log('Found post:', post ? 'Yes' : 'No');
        
        if (!post) {
            console.log('Post not found for ID:', postId);
            return res.status(500).json({ error: 'Post not found' });
        }

        // Return source information - modify this based on your data structure
        const originalSource = {
            url: post.sourceUrl || null,
            author: post.originalAuthor || 'Unknown',
            warning: post.originalUrl ? null : 'Source information unavailable'
        };
        console.log('Returning source info:', originalSource);

        res.json({ originalSource });
        
    } catch (error) {
        console.error('Error in /api/blog-posts/:id/source:', error);
        res.status(500).json({ error: 'Failed to fetch source information' });
    }
});


export default blogRoutes;
