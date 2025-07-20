import React from 'react';
import BlogPostCard from './BlogPostCard';

export default function BlogPostGrid({ posts, setSelectedPost, setSelectedCategory }) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
    
      {posts.map(post => (
        <BlogPostCard
          key={post._id}
          post={post}
          setSelectedPost={setSelectedPost}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
}
