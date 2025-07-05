import React, { useState, useEffect } from 'react';
import { Plus, X, Upload, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios'
import { backendApi } from '../App';

const NewProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    image: '',
    repo: '',
    link: '',
    category: ''
  });

  const categories = [
    'Web Development',
    'Mobile App',
    'Desktop Application',
    'API/Backend',
    'Data Science',
    'Machine Learning',
    'UI/UX Design',
    'Other'
  ];

  // Validation rules
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (formData.tags.trim()) {
      const tags = formData.tags.split(',').map(tag => tag.trim());
      if (tags.some(tag => tag.length < 2)) {
        newErrors.tags = 'Each tag must be at least 2 characters long';
      }
    }

    if (formData.repo && !isValidUrl(formData.repo)) {
      newErrors.repo = 'Please enter a valid repository URL';
    }

    if (formData.link && !isValidUrl(formData.link)) {
      newErrors.link = 'Please enter a valid project URL';
    }

    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }

    return newErrors;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setIsSubmitting(true);
  setSubmitStatus(null);
  setErrors({});

  try {
    // Process tags into array
    const processedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      id: Date.now() // Temporary ID generation - replace with UUID in production
    };

    // API call using axios
    const response = await axios.post(`${backendApi}/api/createProject`, processedData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = response.data;
    
    setSubmitStatus('success');
    setTimeout(() => {
      setIsModalOpen(false);
      resetForm();
    }, 2000);

  } catch (error) {
    console.error('Error creating project:', error);
    setSubmitStatus('error');
    
    // Handle axios error responses
    if (error.response) {
      // Server responded with error status
      setErrors({ submit: `Failed to create project. Server error: ${error.response.status}` });
    } else if (error.request) {
      // Network error
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } else {
      // Other error
      setErrors({ submit: 'Failed to create project. Please try again.' });
    }
  } finally {
    setIsSubmitting(false);
  }
};

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tags: '',
      image: '',
      repo: '',
      link: '',
      category: ''
    });
    setErrors({});
    setSubmitStatus(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
    resetForm();
  };

  const closeModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false);
      resetForm();
    }
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen && !isSubmitting) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, isSubmitting]);

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-0.5 transition-all duration-200 ease-out"
      >
        <Plus className="w-5 h-5 transition-transform group-hover:rotate-90 duration-200" />
        <span>Add New Project</span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
      </button>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
          <div 
            className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Create New Project</h2>
                  <p className="text-gray-400 mt-1">Add your project details below</p>
                </div>
                <button
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-full transition-colors disabled:opacity-50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400 ${
                    errors.title ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Enter project title"
                  disabled={isSubmitting}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-white placeholder-gray-400 ${
                    errors.description ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="Describe your project..."
                  disabled={isSubmitting}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white ${
                    errors.category ? 'border-red-500' : 'border-gray-700'
                  }`}
                  disabled={isSubmitting}
                >
                  <option value="" className="text-gray-400">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="text-white">
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.category}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400 ${
                    errors.tags ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="React, JavaScript, Node.js (comma-separated)"
                  disabled={isSubmitting}
                />
                {errors.tags && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.tags}
                  </p>
                )}
              </div>

              {/* URLs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Repository URL */}
                <div>
                  <label htmlFor="repo" className="block text-sm font-medium text-gray-300 mb-2">
                    Repository URL
                  </label>
                  <input
                    type="url"
                    id="repo"
                    name="repo"
                    value={formData.repo}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400 ${
                      errors.repo ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="https://github.com/username/repo"
                    disabled={isSubmitting}
                  />
                  {errors.repo && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.repo}
                    </p>
                  )}
                </div>

                {/* Live Demo URL */}
                <div>
                  <label htmlFor="link" className="block text-sm font-medium text-gray-300 mb-2">
                    Live Demo URL
                  </label>
                  <input
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400 ${
                      errors.link ? 'border-red-500' : 'border-gray-700'
                    }`}
                    placeholder="https://your-project.com"
                    disabled={isSubmitting}
                  />
                  {errors.link && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.link}
                    </p>
                  )}
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-gray-800 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400 ${
                    errors.image ? 'border-red-500' : 'border-gray-700'
                  }`}
                  placeholder="https://example.com/image.jpg"
                  disabled={isSubmitting}
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-900/50 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {errors.submit}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div className="bg-green-900/50 border border-green-500/50 rounded-lg p-4">
                  <p className="text-green-300 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Project created successfully!
                  </p>
                </div>
              )}

              {/* Footer */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-800">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 hover:border-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-400 hover:to-purple-400 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Create Project
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewProject;