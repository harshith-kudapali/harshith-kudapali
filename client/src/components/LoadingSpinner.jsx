import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 dark:border-blue-900 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Loading amazing content...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait while we fetch the latest blog posts
        </p>
      </div>
    </div>
  );
}
