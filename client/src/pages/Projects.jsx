// src/pages/Projects.jsx
import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects = ({ addNotification }) => {
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'A modern personal portfolio website built with React and TailwindCSS.',
      tags: ['React', 'TailwindCSS', 'CI/CD'],
      image: '/api/placeholder/800/600',
      repo: 'https://github.com/username/portfolio',
      link: 'https://portfolio.example.com',
      category: 'web'
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce application with user authentication and payment integration.',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '/api/placeholder/800/600',
      repo: 'https://github.com/username/ecommerce',
      link: 'https://ecommerce.example.com',
      category: 'web'
    },
    {
      id: 3,
      title: 'Machine Learning Weather Prediction',
      description: 'A machine learning model to predict weather patterns based on historical data.',
      tags: ['Python', 'TensorFlow', 'Data Science'],
      image: '/api/placeholder/800/600',
      repo: 'https://github.com/username/weather-prediction',
      category: 'ml'
    },
    {
      id: 4,
      title: 'Mobile Task Manager',
      description: 'A cross-platform mobile app for task management with cloud synchronization.',
      tags: ['React Native', 'Firebase', 'Redux'],
      image: '/api/placeholder/800/600',
      repo: 'https://github.com/username/task-manager',
      link: 'https://taskmanager.example.com',
      category: 'mobile'
    },
    {
      id: 5,
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for visualizing complex datasets using D3.js.',
      tags: ['JavaScript', 'D3.js', 'CSS'],
      image: '/api/placeholder/800/600',
      repo: 'https://github.com/username/data-dashboard',
      category: 'web'
    },
    {
      id: 6,
      title: 'Blockchain Explorer',
      description: 'A web application to explore and visualize blockchain transactions.',
      tags: ['React', 'Web3.js', 'Ethereum'],
      image: '/api/placeholder/800/600',
      repo: 'https://github.com/username/blockchain-explorer',
      category: 'blockchain'
    }
  ];
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Development' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'blockchain', label: 'Blockchain' }
  ];
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">
        <span className="text-blue-400">&lt;</span> My Projects <span className="text-blue-400">/&gt;</span>
      </h1>
      
      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => {
              setFilter(category.id);
              addNotification(`Filtering projects: ${category.label}`, 'info');
            }}
            className={`px-4 py-2 rounded-md font-mono text-sm transition-all ${
              filter === category.id 
                ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;