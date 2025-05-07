import React, { useState, useEffect } from 'react';
import { Search, Share2, Heart, MessageSquare, Calendar, Clock, User, Bookmark, ChevronLeft, ChevronRight, Moon, Sun, Menu, X } from 'lucide-react';

// Sample blog data
const BLOG_POSTS = [
  {
    id: 1,
    title: "How to Build a Modern React Application",
    excerpt: "Learn the best practices for creating scalable React applications with hooks, context API, and more.",
    content: "Full content of the article would go here with multiple paragraphs of detailed information about React development...",
    image: "/api/placeholder/800/450",
    author: {
      name: "Alex Johnson",
      avatar: "/api/placeholder/80/80",
      bio: "Frontend Developer & UX Enthusiast"
    },
    readTime: 8,
    date: "May 3, 2025",
    featured: true,
    trending: true,
    categories: ["Development", "React"],
    tags: ["javascript", "react", "frontend", "hooks"],
    likes: 128,
    comments: 23
  },
  {
    id: 2,
    title: "Mastering Tailwind CSS: Tips and Tricks",
    excerpt: "Discover how to leverage Tailwind CSS to build beautiful interfaces quickly while maintaining consistency.",
    content: "Tailwind CSS provides a utility-first approach to styling that can dramatically improve your workflow...",
    image: "/api/placeholder/800/450",
    author: {
      name: "Samantha Lee",
      avatar: "/api/placeholder/80/80",
      bio: "CSS Architect & Design Systems Specialist"
    },
    readTime: 6,
    date: "May 1, 2025",
    featured: true,
    trending: false,
    categories: ["Design", "CSS"],
    tags: ["css", "tailwind", "design", "frontend"],
    likes: 95,
    comments: 14
  },
  {
    id: 3,
    title: "The Future of Web Development in 2025",
    excerpt: "Exploring emerging technologies and frameworks that will shape web development in the coming years.",
    content: "As we look ahead to the future of web development, several key trends are emerging that will transform how we build applications...",
    image: "/api/placeholder/800/450",
    author: {
      name: "Marcus Williams",
      avatar: "/api/placeholder/80/80",
      bio: "Tech Futurist & Senior Developer"
    },
    readTime: 10,
    date: "April 28, 2025",
    featured: false,
    trending: true,
    categories: ["Technology", "Trends"],
    tags: ["webdev", "future", "technology", "trends"],
    likes: 204,
    comments: 37
  },
  {
    id: 4,
    title: "Optimizing Performance in JavaScript Applications",
    excerpt: "Learn techniques to make your JavaScript applications blazing fast and responsive.",
    content: "Performance optimization is critical for delivering excellent user experiences in modern web applications...",
    image: "/api/placeholder/800/450",
    author: {
      name: "Jasmine Chen",
      avatar: "/api/placeholder/80/80",
      bio: "Performance Engineer & JavaScript Expert"
    },
    readTime: 12,
    date: "April 25, 2025",
    featured: false,
    trending: false,
    categories: ["Development", "Performance"],
    tags: ["javascript", "performance", "optimization", "web"],
    likes: 156,
    comments: 19
  },
  {
    id: 5,
    title: "Creating Accessible Web Interfaces",
    excerpt: "How to ensure your web applications are accessible to all users, including those with disabilities.",
    content: "Web accessibility is not just a legal requirement but also a moral imperative for developers...",
    image: "/api/placeholder/800/450",
    author: {
      name: "David Rodriguez",
      avatar: "/api/placeholder/80/80",
      bio: "Accessibility Advocate & Frontend Engineer"
    },
    readTime: 9,
    date: "April 22, 2025",
    featured: false,
    trending: false,
    categories: ["Accessibility", "Design"],
    tags: ["a11y", "design", "user-experience", "standards"],
    likes: 89,
    comments: 11
  }
];

// Extract all unique categories and tags
const ALL_CATEGORIES = [...new Set(BLOG_POSTS.flatMap(post => post.categories))];
const ALL_TAGS = [...new Set(BLOG_POSTS.flatMap(post => post.tags))];

// Blog App
export default function BlogPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailSubscription, setEmailSubscription] = useState("");
  const [commentText, setCommentText] = useState("");

  const postsPerPage = 4;

  // Toggle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Filter posts based on search, category and tag
  useEffect(() => {
    let results = BLOG_POSTS;

    if (searchQuery) {
      results = results.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory) {
      results = results.filter(post => post.categories.includes(selectedCategory));
    }

    if (selectedTag) {
      results = results.filter(post => post.tags.includes(selectedTag));
    }

    setFilteredPosts(results);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, selectedCategory, selectedTag]);

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Handler for subscribing to newsletter
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${emailSubscription}`);
    setEmailSubscription("");
  };

  // Handler for adding comments
  const handleAddComment = (e) => {
    e.preventDefault();
    alert(`Comment added: ${commentText}`);
    setCommentText("");
  };

  // Calculate read time based on content length
  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  // Breadcrumb component
  const Breadcrumbs = () => (
    <nav className="text-sm mb-6">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400" onClick={() => setSelectedPost(null)}>Home</a>
          <span className="mx-2">/</span>
        </li>
        <li className="flex items-center">
          <a href="#" className="text-blue-600 hover:text-blue-800 dark:text-blue-400">Blog</a>
          {selectedPost && (
            <>
              <span className="mx-2">/</span>
              <span className="text-gray-600 dark:text-gray-400">{selectedPost.title}</span>
            </>
          )}
        </li>
      </ol>
    </nav>
  );

  // Blog post preview component
  const BlogPostPreview = ({ post }) => (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer mb-8"
      onClick={() => setSelectedPost(post)}
    >
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        {post.featured && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-md">
            Featured
          </div>
        )}
        {post.trending && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            Trending
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex flex-wrap mb-2">
          {post.categories.map(category => (
            <span
              key={category}
              className="text-xs mr-2 mb-1 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCategory(category);
              }}
            >
              {category}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <span>{post.author.name}</span>
          </div>

          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="mr-3">{post.date}</span>
            <Clock className="w-4 h-4 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <button className="flex items-center mr-4">
              <Heart className="w-4 h-4 mr-1" />
              <span>{post.likes}</span>
            </button>
            <button className="flex items-center">
              <MessageSquare className="w-4 h-4 mr-1" />
              <span>{post.comments}</span>
            </button>
          </div>
          <button className="text-blue-600 dark:text-blue-400 font-medium">
            Read More
          </button>
        </div>
      </div>
    </div>
  );

  // Sidebar component
  const Sidebar = () => (
    <div className={`lg:block ${mobileMenuOpen ? 'block' : 'hidden'} lg:w-80 xl:w-96 lg:sticky lg:top-4 h-auto`}>
      <div className="space-y-6">
        {/* Search Box */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Categories</h3>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedCategory("")}
                className={`block w-full text-left px-2 py-1 rounded ${!selectedCategory ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                All
              </button>
            </li>
            {ALL_CATEGORIES.map(category => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-2 py-1 rounded ${selectedCategory === category ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Popular Tags */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
                className={`px-3 py-1 text-sm rounded-full ${selectedTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">Recent Posts</h3>
          <ul className="space-y-4">
            {BLOG_POSTS.slice(0, 3).map(post => (
              <li key={post.id} className="flex space-x-3">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedPost(post);
                    }}
                  >
                    {post.title}
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{post.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">Subscribe to Newsletter</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Get the latest posts delivered right to your inbox.</p>
          <form onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your email address"
              required
              value={emailSubscription}
              onChange={(e) => setEmailSubscription(e.target.value)}
              className="w-full p-2 mb-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  // Featured posts section
  const FeaturedPosts = () => {
    const featured = BLOG_POSTS.filter(post => post.featured);

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Featured Posts</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map(post => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer relative"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-black opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-5 text-white">
                <div className="flex flex-wrap mb-2">
                  {post.categories.map(category => (
                    <span
                      key={category}
                      className="text-xs mr-2 mb-1 px-2 py-1 bg-blue-500 bg-opacity-80 rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category);
                      }}
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold">{post.title}</h3>
                <div className="flex items-center mt-2 text-sm">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <span className="mr-3">{post.author.name}</span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Trending posts section
  const TrendingPosts = () => {
    const trending = BLOG_POSTS.filter(post => post.trending);

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending.map(post => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer flex flex-col"
              onClick={() => setSelectedPost(post)}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">{post.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-1 text-red-500" />
                    <span className="mr-3">{post.likes}</span>
                    <MessageSquare className="w-4 h-4 mr-1" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-8 mb-12">
        <nav className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-l-md border border-gray-300 dark:border-gray-600 ${
              currentPage === 1
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 border-t border-b border-r border-gray-300 dark:border-gray-600 ${
                currentPage === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-r-md border-t border-b border-r border-gray-300 dark:border-gray-600 ${
              currentPage === totalPages
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </nav>
      </div>
    );
  };

  // Single post view component
  const SinglePostView = ({ post }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    return (
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 lg:p-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h1>

        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">{post.author.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{post.author.bio}</div>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center mr-4">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>

        <div className="relative mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        <div className="prose max-w-none dark:prose-invert mb-6">
          <p>
            {post.content}
          </p>
          <h2>Why This Matters</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2>Key Takeaways</h2>
          <ul>
            <li>Important point number one about this topic</li>
            <li>Another critical insight that readers should remember</li>
            <li>A practical tip that can be implemented right away</li>
            <li>Something to consider for future applications</li>
          </ul>
          <h2>Conclusion</h2>
          <p>
            In conclusion, this article has explored several important aspects of the topic. The implications are far-reaching and will continue to influence the field for years to come.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map(tag => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                setSelectedPost(null);
              }}
              className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              #{tag}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center space-x-4">
            <button
              className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              <span>{isLiked ? post.likes + 1 : post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments}</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className={`flex items-center space-x-1 ${isBookmarked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300'}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
            >
              <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">About {post.author.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{post.author.bio}</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Follow me on Twitter, LinkedIn, and GitHub for more content on web development, design, and technology trends.
          </p>
        </div>

        {/* Comments Section */}
        <div className="mb-8">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Comments ({post.comments})</h3>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="mb-6">
            <textarea
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows="4"
              required
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Post Comment
              </button>
            </div>
          </form>

          {/* Sample Comments */}
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <img
                  src="/api/placeholder/40/40"
                  alt="Commenter"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Jane Cooper</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">2 days ago</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                This was so helpful! I've been struggling with this concept for a while, and your explanation made it click for me.
              </p>
              <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                <button className="flex items-center mr-4">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>12</span>
                </button>
                <button className="text-blue-600 dark:text-blue-400">Reply</button>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-750 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <img
                  src="/api/placeholder/40/40"
                  alt="Commenter"
                  className="w-8 h-8 rounded-full mr-2"
                />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Robert Fox</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">3 days ago</div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                I disagree with point #2. In my experience, the approach you described has several limitations when scaled to larger projects.
              </p>
              <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                <button className="flex items-center mr-4">
                  <Heart className="w-4 h-4 mr-1" />
                  <span>5</span>
                </button>
                <button className="text-blue-600 dark:text-blue-400">Reply</button>
              </div>

              {/* Nested Reply */}
              <div className="ml-8 mt-3 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{post.author.name} <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1 py-0.5 rounded">Author</span></div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">3 days ago</div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Thanks for your feedback, Robert! You make a good point. I'd love to hear more about your experience with larger projects.
                </p>
                <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <button className="flex items-center mr-4">
                    <Heart className="w-4 h-4 mr-1" />
                    <span>8</span>
                  </button>
                  <button className="text-blue-600 dark:text-blue-400">Reply</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">You Might Also Like</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(relatedPost => (
              <div
                key={relatedPost.id}
                className="bg-gray-50 dark:bg-gray-750 rounded-lg overflow-hidden flex cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedPost(relatedPost);
                  window.scrollTo(0, 0);
                }}
              >
                <img
                  src={relatedPost.image}
                  alt={relatedPost.title}
                  className="w-20 h-full object-cover"
                />
                <div className="p-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">{relatedPost.title}</h4>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span>{relatedPost.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200`}>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Breadcrumbs />

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-grow order-2 lg:order-1">
            {selectedPost ? (
              <SinglePostView post={selectedPost} />
            ) : (
              <>
                <FeaturedPosts />
                <TrendingPosts />

                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Latest Articles</h2>
                <div className="grid grid-cols-1 gap-8">
                  {currentPosts.map(post => (
                    <BlogPostPreview key={post.id} post={post} />
                  ))}
                </div>

                <Pagination />
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 xl:w-96 order-1 lg:order-2">
            <Sidebar />
          </div>
        </div>
      </main>

    </div>
  );
}
