import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Heart, MessageSquare, Bookmark, Share2, User, ExternalLink, AlertTriangle } from 'lucide-react';
import axios from 'axios';

export default function SinglePostView({ post, setSelectedPost, blogPosts, setSelectedTag }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(post.isLikedByCurrentUser || false);
    const [likeCount, setLikeCount] = useState(post.likes || 0);
    const [commentText, setCommentText] = useState('');
    const [commentNameOfUser, setcommentNameOfUser] = useState('Anonymous User');

    const calculateReadTime = (content) => {
        const wordsPerMinute = 200;
        const words = content.split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    const handleLike = async () => {
        try {
            // Optimistically update the UI first for better UX
            const newIsLiked = !isLiked;
            const newLikeCount = newIsLiked ? likeCount + 1 : likeCount - 1;
            
            setIsLiked(newIsLiked);
            setLikeCount(newLikeCount);
            
            // Make API call to persist the like
            const response = await axios.post(`http://localhost:3000/api/blog-posts/${post._id}/like`, {
                liked: newIsLiked
            });
            
            // Update with the actual count from server (optional)
            if (response.data && response.data.likes !== undefined) {
                setLikeCount(response.data.likes);
            }
            
        } catch (error) {
            console.error('Error updating like:', error);
            // Revert the UI changes if the API call fails
            setIsLiked(!isLiked);
            setLikeCount(likeCount);
            alert('Failed to update like. Please try again.');
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/blog-posts/${post._id}/comments`, {
                text: commentText,
                author: commentNameOfUser
            });
            alert('Comment added successfully!');
            setCommentText('');
            // Optionally refresh the comments or update the post state
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment. Please try again.');
        }
    };

    // Disclaimer Component
    const DisclaimerSection = ({ post }) => {
        const [showFullDisclaimer, setShowFullDisclaimer] = useState(false);
        const [originalSource, setOriginalSource] = useState(null);
        const [loading, setLoading] = useState(false);

        const fetchOriginalSource = async () => {
            if (originalSource) return; // Already fetched
            
            setLoading(true);
            try {
                // Check if post has a source URL or try to find original content
                const response = await axios.get(`http://localhost:3000/api/blog-posts/${post._id}/source`);
                setOriginalSource(response.data.originalSource);
            } catch (error) {
                console.error('Error fetching original source:', error);
                // If no specific source found, you can set a generic disclaimer
                setOriginalSource({
                    url: null,
                    author: 'Unknown',
                    warning: 'Source information unavailable'
                });
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
                <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                        <h4 className="font-semibold text-yellow-800 mb-2">
                            Content Disclaimer
                        </h4>
                        <p className="text-yellow-700 text-sm mb-3">
                            <strong>Legal Notice:</strong> This content may or may not be taken from other websites or sources. 
                            We may not have rights to all materials presented. This disclaimer is provided for legal protection.
                        </p>
                        
                        {showFullDisclaimer && (
                            <div className="text-yellow-700 text-sm space-y-2">
                                <p>
                                    • Content may be sourced from various websites, blogs, or publications
                                </p>
                                <p>
                                    • We acknowledge that original authors retain their intellectual property rights
                                </p>
                                <p>
                                    • If you are the original author and wish to claim ownership or request removal, please contact us
                                </p>
                                <p>
                                    • This content is shared for educational and informational purposes
                                </p>
                                <p>
                                    • We thank all original content creators for their valuable contributions
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3 mt-4">
                            <button
                                onClick={() => setShowFullDisclaimer(!showFullDisclaimer)}
                                className="text-yellow-600 hover:text-yellow-800 font-medium text-sm underline"
                            >
                                {showFullDisclaimer ? 'Show Less' : 'Read Full Disclaimer'}
                            </button>
                            
                            <button
                                onClick={fetchOriginalSource}
                                disabled={loading}
                                className="flex items-center space-x-2 text-yellow-600 hover:text-yellow-800 font-medium text-sm underline disabled:opacity-50"
                            >
                                <ExternalLink className="w-4 h-4" />
                                <span>
                                    {loading ? 'Finding Source...' : 'Find Original Source'}
                                </span>
                            </button>
                        </div>

                        {originalSource && (
                            <div className="mt-4 p-4 bg-white rounded-lg border border-yellow-300">
                                <p className="text-sm text-gray-700 mb-2">
                                    <strong>Original Source Information:</strong>
                                </p>
                                {originalSource.url ? (
                                    <div className="space-y-1 text-gray-500">
                                        <p className="text-sm">
                                            <strong>Author/Source:</strong> {originalSource.url||originalSource.author || 'Unknown'}
                                        </p>
                                        <a
                                            href={originalSource.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm underline"
                                        >
                                            <span>View Original Content</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                        <p className="text-xs text-gray-500 mt-2">
                                            We thank the original author for their contribution to knowledge sharing.
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-600">
                                        {originalSource.warning || 'Original source information is not available at this time.'}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative z-10 max-w-3xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center mb-6 text-blue-600 hover:text-blue-800 transition-colors group"
            >
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to articles
            </button>

            <article className="bg-white backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                {/* Hero Image */}
                <div className="relative h-96">
                    <img
                        src={post.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop'}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>

                <div className="p-8 lg:p-12">
                    {/* Title */}
                    <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-black leading-tight">
                        {post.title}
                    </h1>

                    {/* Author Info */}
                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-gray-200">
                        <div className="flex items-center">
                            <img
                                src={post.author?.avatar || 'https://ui-avatars.com/api/?name=' + (post.author?.name || 'Anonymous')}
                                alt={post.author?.name || 'Author'}
                                className="w-14 h-14 rounded-full mr-4 ring-4 ring-white shadow-lg"
                            />
                            <div>
                                <h3 className="font-bold text-black text-lg">
                                    {post.author?.name || 'Anonymous'}
                                </h3>
                                <p className="text-gray-600">
                                    {post.author?.bio || 'Content Creator'}
                                </p>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="flex items-center text-gray-500 mb-1">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                                <Clock className="w-4 h-4 mr-2" />
                                <span>{post.readTime || calculateReadTime(post.content)} min read</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none mb-8 text-black">
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    {/* Disclaimer Section */}
                    <DisclaimerSection post={post} />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {post.tags?.map(tag => (
                            <button
                                key={tag}
                                onClick={() => {
                                    setSelectedTag(tag);
                                    setSelectedPost(null);
                                }}
                                className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 hover:from-blue-200 hover:to-purple-200 transition-all transform hover:scale-105"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>

                    {/* Engagement Bar */}
                    <div className="flex items-center justify-between py-6 border-y border-gray-200 mb-8">
                        <div className="flex items-center space-x-6">
                            <button
                                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all hover:scale-105 ${
                                    isLiked
                                        ? 'bg-red-100 text-red-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                onClick={handleLike}
                            >
                                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''} transition-all`} />
                                <span>{likeCount}</span>
                            </button>

                            <div className="flex items-center space-x-2 text-gray-600">
                                <MessageSquare className="w-5 h-5" />
                                <span>{post.comments?.length || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Author Bio */}
                    <div className="bg-white backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden rounded-2xl p-6 mb-8">
                        <div className="flex items-start">
                            <img
                                src={post.author?.avatar || 'https://ui-avatars.com/api/?name=' + (post.author?.name || 'Anonymous')}
                                alt={post.author?.name}
                                className="w-16 h-16 rounded-full mr-4 ring-4 ring-white"
                            />
                            <div>
                                <h4 className="font-bold text-xl text-black mb-2">
                                    About {post.author?.name || 'the Author'}
                                </h4>
                                <p className="text-gray-600 mb-3">
                                    {post.author?.bio || 'Passionate writer and content creator sharing insights on technology, design, and innovation.'}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold mb-6 text-black">
                            Comments ({post.comments?.length || 0})
                        </h3>

                        {/* Comment Form */}
                        <form onSubmit={handleAddComment} className="mb-8">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <textarea
                                    placeholder="Share your thoughts..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="w-full p-4 bg-white border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                                    rows="4"
                                    required
                                />
                                <div className="flex items-center justify-end mt-4 gap-4">
                                    <label className="text-lg font-bold text-black">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={commentNameOfUser}
                                        onChange={(e) => setcommentNameOfUser(e.target.value)}
                                        className="p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-black"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-lg transition-all transform hover:scale-105"
                                    >
                                        Post Comment
                                    </button>
                                </div>
                            </div>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {post.comments?.map((comment, index) => (
                                <div key={index} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center mr-3">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-black">
                                                {comment.author}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-black leading-relaxed">
                                        {comment.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Related Posts */}
                    <div>
                        <h3 className="text-2xl font-bold mb-6 text-black">
                            You Might Also Like
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {blogPosts
                                .filter(p => p._id !== post._id)
                                .slice(0, 2)
                                .map(relatedPost => (
                                    <div
                                        key={relatedPost._id}
                                        className="group bg-gray-50 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                                        onClick={() => {
                                            setSelectedPost(relatedPost);
                                            window.scrollTo(0, 0);
                                        }}
                                    >
                                        <div className="flex">
                                            <img
                                                src={relatedPost.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop'}
                                                alt={relatedPost.title}
                                                className="w-24 h-24 object-cover group-hover:scale-105 transition-transform"
                                            />
                                            <div className="p-4 flex-1">
                                                <h4 className="font-semibold text-black mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                    {relatedPost.title}
                                                </h4>
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <Calendar className="w-3 h-3 mr-1" />
                                                    <span>{new Date(relatedPost.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
