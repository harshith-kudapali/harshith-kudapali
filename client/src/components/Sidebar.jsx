import React from 'react';
import { Search } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import TagFilter from './TagFilter';
import RecentPosts from './RecentPosts';
import NewsletterSignup from './NewsletterSignup';

export default function Sidebar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  blogPosts,
  setSelectedPost,
  mobileMenuOpen
}) {
  const allCategories = [...new Set(blogPosts.flatMap(post => post.categories || []))];
  const allTags = [...new Set(blogPosts.flatMap(post => post.tags || []))];

  return (
    <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-80 xl:w-96 space-y-6 min-w-0`}>
      {/* Search */}
      <section className='relative z-10'>
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          </div>
        </div>
      </section>
      <CategoryFilter
        categories={allCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <TagFilter
        tags={allTags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />

      <RecentPosts
        posts={blogPosts.slice(0, 3)}
        setSelectedPost={setSelectedPost}
      />


    </aside>
  );
}
