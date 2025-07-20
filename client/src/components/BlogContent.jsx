import React from 'react';
import BlogPostGrid from './BlogPostGrid';
import SinglePostView from './SinglePostView';
import FeaturedPosts from './FeaturedPosts';
import TrendingPosts from './TrendingPosts';
import Pagination from './Pagination';
import Breadcrumbs from './Breadcrumbs';

export default function BlogContent({
  selectedPost,
  setSelectedPost,
  filteredPosts,
  currentPage,
  setCurrentPage,
  postsPerPage,
  blogPosts,
  setSelectedCategory,
  setSelectedTag
}) {
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="space-y-8">
      <Breadcrumbs selectedPost={selectedPost} setSelectedPost={setSelectedPost} />

      {selectedPost ? (
        <SinglePostView 
          post={selectedPost} 
          setSelectedPost={setSelectedPost}
          blogPosts={blogPosts}
          setSelectedTag={setSelectedTag}
        />
      ) : (
        <>
          <FeaturedPosts 
            posts={blogPosts.filter(post => post.featured)} 
            setSelectedPost={setSelectedPost}
            setSelectedCategory={setSelectedCategory}
          />
          
          <TrendingPosts 
            posts={blogPosts.filter(post => post.trending)} 
            setSelectedPost={setSelectedPost}
          />

          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
              Latest Articles
            </h2>
            
            {currentPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-4xl">📝</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              <BlogPostGrid 
                posts={currentPosts} 
                setSelectedPost={setSelectedPost}
                setSelectedCategory={setSelectedCategory}
              />
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
