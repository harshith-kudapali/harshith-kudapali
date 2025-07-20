import React from 'react';
import { TrendingUp, Heart, MessageSquare, Clock } from 'lucide-react';

export default function TrendingPosts({ posts, setSelectedPost }) {
  if (posts.length === 0) return null;

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <section className="relative z-10 mb-12">
      <div className="flex items-center mb-8">
        <TrendingUp className="w-6 h-6 mr-2 text-red-500" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
          Trending Now
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {posts.slice(0, 5).map((post) => (
          <article
            key={post._id}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-1"
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative">
              <img
                src={
                  post.image || 
                  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop'
                }
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center">
                  🔥 Trending
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6 flex flex-col min-h-[140px] sm:min-h-[120px]">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors line-clamp-2 leading-tight flex-grow">
                {post.title}
              </h3>
              
              {/* Stats container that flows vertically on narrow cards */}
              <div className="flex flex-col gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-auto">
                {/* Likes and Comments row */}
                <div className="flex items-center justify-between sm:justify-start sm:space-x-6">
                  <div className="flex items-center">
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    <span className="whitespace-nowrap">{post.likes || 0}</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                    <span className="whitespace-nowrap">{post.comments?.length || 0}</span>
                  </div>
                </div>
                
                {/* Read time on its own row for better spacing */}
                <div className="flex items-center justify-center sm:justify-start">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
                  <span className="whitespace-nowrap">
                    {post.readTime || calculateReadTime(post.content)} min
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
