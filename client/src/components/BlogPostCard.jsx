import React from 'react';
import { Calendar, Clock, Heart, MessageSquare, User } from 'lucide-react';

export default function BlogPostCard({ post, setSelectedPost, setSelectedCategory }) {
    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    return (
        <section className='relative z-10'>
            <article
                className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedPost(post)}
            >
                <div className="relative overflow-hidden">
                    <img
                        src={post.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop'}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                        {post.featured && (
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                Featured
                            </span>
                        )}
                        {post.trending && (
                            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                Trending
                            </span>
                        )}
                    </div>
                </div>

                <div className="p-6">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories?.slice(0, 2).map(category => (
                            <button
                                key={category}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedCategory(category);
                                }}
                                className="text-xs font-medium px-3 py-1 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full transition-colors"
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {post.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                        {post.excerpt}
                    </p>

                    {/* Author and Meta */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img
                                src={post.author?.avatar || 'https://ui-avatars.com/api/?name=' + (post.author?.name || 'Anonymous')}
                                alt={post.author?.name || 'Author'}
                                className="w-10 h-10 rounded-full mr-3 ring-2 ring-gray-200 dark:ring-gray-700"
                            />
                            <div>
                                <p className="font-medium text-gray-900 dark:text-white text-sm">
                                    {post.author?.name || 'Anonymous'}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    <span className="mr-3">{new Date(post.createdAt).toLocaleDateString()}</span>
                                    <Clock className="w-3 h-3 mr-1" />
                                    <span>{post.readTime || calculateReadTime(post.content)} min</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                            <div className="flex items-center">
                                <Heart className="w-4 h-4 mr-1" />
                                <span className="text-sm">{post.likes || 0}</span>
                            </div>
                            <div className="flex items-center">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                <span className="text-sm">{post.comments?.length || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </section>
    );
}
