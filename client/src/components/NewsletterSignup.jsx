import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import axios from 'axios';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post('http://localhost:3000/api/newsletter/subscribe', { email });
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl shadow-lg border border-blue-200/50 dark:border-blue-700/50">
      <div className="flex items-center mb-4">
        <Mail className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Stay Updated</h3>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        Get the latest posts delivered right to your inbox.
      </p>

      {isSubscribed ? (
        <div className="flex items-center justify-center py-3 text-green-600 dark:text-green-400">
          <CheckCircle className="w-5 h-5 mr-2" />
          <span className="font-medium">Successfully subscribed!</span>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100"
          >
            {isLoading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
    </div>
  );
}
