import React from 'react';

const NotificationSystem = ({ notifications }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={`px-4 py-2 rounded-md shadow-lg font-mono text-sm max-w-xs animate-slideIn
            ${notification.type === 'success' ? 'bg-green-500 text-white' : ''}
            ${notification.type === 'error' ? 'bg-red-500 text-white' : ''}
            ${notification.type === 'info' ? 'bg-blue-500 text-white' : ''}
            ${notification.type === 'warning' ? 'bg-yellow-500 text-black' : ''}
          `}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default NotificationSystem;