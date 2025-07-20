import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import BlogContent from '../components/BlogContent';
import BlogCreator from '../components/BlogCreator';
import LoadingSpinner from '../components/LoadingSpinner';
import { backendApi } from '../App';

export default function BlogPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [BLOG_POSTS, setBLOG_POSTS] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBlogCreator, setShowBlogCreator] = useState(false);

  const postsPerPage = 4;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backendApi}/api/blog-posts`);
        setBLOG_POSTS(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setBLOG_POSTS([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Filter posts
  useEffect(() => {
    const handler = setTimeout(() => {
      let results = BLOG_POSTS;

      if (searchQuery) {
        results = results.filter(post =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      if (selectedCategory) {
        results = results.filter(post => post.categories?.includes(selectedCategory));
      }

      if (selectedTag) {
        results = results.filter(post => post.tags?.includes(selectedTag));
      }

      setFilteredPosts(results);
      setCurrentPage(1);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery, selectedCategory, selectedTag, BLOG_POSTS]);

  const handleBlogCreated = (newBlog) => {
    setBLOG_POSTS(prev => [newBlog, ...prev]);
    setShowBlogCreator(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={`min-h-screen`}>
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-grow order-2 lg:order-1">
            <BlogContent
              selectedPost={selectedPost}
              setSelectedPost={setSelectedPost}
              filteredPosts={filteredPosts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              postsPerPage={postsPerPage}
              blogPosts={BLOG_POSTS}
              setSelectedCategory={setSelectedCategory}
              setSelectedTag={setSelectedTag}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 xl:w-96 order-1 lg:order-2">
            <Sidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
              blogPosts={BLOG_POSTS}
              setSelectedPost={setSelectedPost}
              mobileMenuOpen={mobileMenuOpen}
            />
          </div>
        </div>
      </main>

    
     
    </div>
  );
}
