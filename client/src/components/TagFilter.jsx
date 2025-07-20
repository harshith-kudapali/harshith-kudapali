import React from 'react';
import { Tag } from 'lucide-react';

export default function TagFilter({ tags, selectedTag, setSelectedTag }) {
  return (
    <section className='relative z-10'>
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center mb-4">
        <Tag className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Popular Tags</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? "" : tag)}
            className={`px-4 py-2 text-sm rounded-full transition-all transform hover:scale-105 ${
              selectedTag === tag
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div></section>
  );
}
