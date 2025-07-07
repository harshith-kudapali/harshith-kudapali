// src/pages/Projects.jsx
import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { backendApi } from '../App';
import axios from 'axios';

const Projects = ({ addNotification }) => {
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', label: 'All Projects' }]);

  useEffect(() => {
    axios.get(`${backendApi}/api/projects`)
      .then(res => {
        setProjects(res.data);
        
        // Generate dynamic categories
        const projectCategories = res.data || [];
        const uniqueCategories = [];
        
        projectCategories.forEach(project => {
          if (project && project.category && typeof project.category === 'string') {
            if (!uniqueCategories.includes(project.category)) {
              uniqueCategories.push(project.category);
            }
          }
        });
        
        const dynamicCategories = uniqueCategories.map(category => ({
          id: category,
          label: formatCategoryLabel(category)
        }));
        
        setCategories([{ id: 'all', label: 'All Projects' }, ...dynamicCategories]);
      })
      .catch(err => {
        console.error('Failed to fetch projects', err);
        // Keep default categories on error
        setCategories([{ id: 'all', label: 'All Projects' }]);
      });
  }, []);
  
  // Helper function to format category labels
  const formatCategoryLabel = (category) => {
    // Since categories are already properly formatted, return as-is
    return category;
  };
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project && project.category === filter);
  
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
          <ProjectCard 
            key={project._id} 
            id={project._id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            image={project.image}
            link={project.link}
            repo={project.repo}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;