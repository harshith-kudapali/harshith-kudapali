import React from 'react';
import { Calendar, Star } from 'lucide-react';

export default function FeaturedPosts({ posts, setSelectedPost, setSelectedCategory }) {
    if (posts.length === 0) return null;

    return (
        <section className="relative z-10 mb-12">
            <div className="flex items-center mb-8">
                <Star className="w-6 h-6 mr-2 text-yellow-500" />
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Posts</h2>
            </div>

            {/* Updated grid layout for 5 posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {posts.slice(0, 5).map(post => (
                    <article
                        key={post._id}
                        className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                        onClick={() => setSelectedPost(post)}
                    >
                        {/* Rest of your article content remains the same */}
                        <div className="relative h-80">
                            <img
                                src={post.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop'}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 group-hover:blur-md transition-all duration-700"
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=400&fit=crop';
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            <div className="absolute top-4 left-4">
                                <span className="bg-yellow-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg">
                                    ⭐ Featured
                                </span>
                            </div>
                        </div>

                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="flex flex-wrap gap-2 mb-3 max-h-16 overflow-hidden">
                                {post.categories?.slice(0, 2).map(category => (
                                    <button
                                        key={category}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedCategory(category);
                                        }}
                                        className="text-xs font-semibold px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors truncate max-w-20"
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>

                            <h3 className="text-lg font-bold mb-2 group-hover:text-yellow-300 transition-colors line-clamp-2">
                                {post.title}
                            </h3>

                            <div className="flex flex-col gap-1 text-xs opacity-90">
                                <div className="flex items-center">
                                    <img
                                        src={post.author?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author?.name || 'Anonymous')}`}
                                        alt={post.author?.name}
                                        className="w-5 h-5 rounded-full mr-2 flex-shrink-0"
                                    />
                                    <span className="truncate">{post.author?.name || 'Anonymous'}</span>
                                </div>

                                <div className="flex items-center">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    <span className="whitespace-nowrap">
                                        {new Date(post.createdAt).toLocaleDateString()}
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
