import React, { useState } from 'react';
import NewProject from './NewProject';
import SkillFormPopup from './SkillFormPopup';
import { backendApi } from '../App';
import AddResumeModal from './AddResumeModal';
import BlogCreator from './BlogCreator';
export default function AdminPannel() {
  const [formType, setFormType] = useState(null); // Start with null instead of 'Skill'
  const [notifications, setNotifications] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [show, setShow] = useState(false);

  const API_BASE_URL = `${backendApi}/api`

  // Function to add notifications
  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    const notification = { id, message, type };
    setNotifications(prev => [...prev, notification]);

    // Auto-remove notification after 3 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  // Function to get the correct API endpoint
  const getApiUrl = (type) => {
    const endpoints = {
      'Skill': `${API_BASE_URL}/skills`,
      'Education': `${API_BASE_URL}/education`,
      'Certification': `${API_BASE_URL}/certifications`
    };
    return endpoints[type] || `${API_BASE_URL}/${type.toLowerCase()}`;
  };

  // Function to handle form success
  const handleFormSuccess = (type) => {
    setFormType(null); // Close the popup
    addNotification(`${type} added successfully!`, 'success');
  };

  return (
    <div className="admin-panel min-h-screen bg-gray-900 text-white p-6">
      <NewProject />

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50">
          {notifications.map(notification => (
            <div
              key={notification.id}
              className={`mb-2 p-3 rounded-lg shadow-2xl border ${notification.type === 'success'
                ? 'bg-green-600 border-green-500 text-white'
                : 'bg-red-600 border-red-500 text-white'
                }`}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="my-6 flex flex-wrap gap-4">
        <button
          onClick={() => setFormType('Skill')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500"
        >
          Add Skill
        </button>
        <button
          onClick={() => setFormType('Education')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-all duration-200 shadow-lg hover:shadow-xl border border-green-500"
        >
          Add Education
        </button>
        <button
          onClick={() => setFormType('Certification')}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:bg-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl border border-purple-500"
        >
          Add Certification
        </button>
      </div>

      {/* Form Popup */}
      {formType && (
        <SkillFormPopup
          type={formType}
          apiUrl={getApiUrl(formType)}
          onClose={() => setFormType(null)}
          onSuccess={() => handleFormSuccess(formType)}
        />
      )}


      <button
        onClick={() => setIsFormOpen(true)}
        className="w-full py-2 mb-4 bg-cyan-600 hover:bg-cyan-500 rounded text-white text-sm font-medium"
      >
        + Add Resume Link
      </button>
      <AddResumeModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onAdd={(newResume) => setPdfs((prev) => [newResume, ...prev])}
      />
       <div>
      <button onClick={() => setShow(true)}>Open Blog Creator</button>
      {show && (
        <BlogCreator
          onClose={() => setShow(false)}
          onBlogCreated={(blog) =>
            alert("Blog created! " + JSON.stringify(blog))}
        />
      )}
    </div>

    </div>
  );
}