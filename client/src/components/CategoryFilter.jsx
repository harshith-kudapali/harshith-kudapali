import React from 'react';
import { Folder } from 'lucide-react';

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <section className='relative z-10'>
    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center mb-4">
        <Folder className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Categories</h3>
      </div>
      
      <div className="space-y-2">
        <button
          onClick={() => setSelectedCategory("")}
          className={`block w-full text-left px-4 py-2 rounded-xl transition-all ${
            !selectedCategory 
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md' 
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          All Categories
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`block w-full text-left px-4 py-2 rounded-xl transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
    </section>
  );
}
