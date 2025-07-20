import React from 'react';
import { Clock } from 'lucide-react';

export default function RecentPosts({ posts, setSelectedPost }) {
  return (
    <section className='relative z-10'>
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center mb-4">
        <Clock className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Posts</h3>
      </div>
      
      <div className="space-y-4">
        {posts.map(post => (
          <div
            key={post._id}
            className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={post.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop'}
              alt={post.title}
              className="w-16 h-16 object-cover rounded-lg flex-shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div></section>
  );
}
