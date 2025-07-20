import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ selectedPost, setSelectedPost }) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-8">
      <button
        onClick={() => setSelectedPost(null)}
        className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
      >
        <Home className="w-4 h-4 mr-1" />
        Home
      </button>
      
      <ChevronRight className="w-4 h-4 text-gray-400" />
      
      <span className="text-gray-600 dark:text-gray-400">Blog</span>
      
      {selectedPost && (
        <>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-900 dark:text-white font-medium truncate max-w-md">
            {selectedPost.title}
          </span>
        </>
      )}
    </nav>
  );
}
