// src/pages/Skills.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SkillBar from '../components/SkillBar';
import { backendApi } from '../App';


const Skills = ({ addNotification }) => {
  const [programmingSkills, setProgrammingSkills] = useState([]);
  const [webSkills, setWebSkills] = useState([]);
  const [otherSkills, setOtherSkills] = useState([]);
  const [education, setEducation] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL - adjust this to match your backend
  const API_BASE_URL = `${backendApi}/api`;

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all data in parallel
        const [
          programmingResponse,
          webResponse,
          otherResponse,
          educationResponse,
          certificationsResponse
        ] = await Promise.all([
          axios.get(`${API_BASE_URL}/skills/programming`),
          axios.get(`${API_BASE_URL}/skills/web`),
          axios.get(`${API_BASE_URL}/skills/other`),
          axios.get(`${API_BASE_URL}/education`),
          axios.get(`${API_BASE_URL}/certifications`)
        ]);

        setProgrammingSkills(programmingResponse.data);
        setWebSkills(webResponse.data);
        setOtherSkills(otherResponse.data);
        setEducation(educationResponse.data);
        setCertifications(certificationsResponse.data);

        // Show success notification
        if (addNotification) {
          addNotification('Skills data loaded successfully!', 'success');
        }
      } catch (err) {
        console.error('Error fetching skills data:', err);
        setError('Failed to load skills data. Please try again later.');
        
        // Show error notification
        if (addNotification) {
          addNotification('Failed to load skills data', 'error');
        }

        // Fallback to default data if API fails
        setProgrammingSkills([
          { id: 1, name: 'JavaScript', level: 90, color: 'yellow' },
          { id: 2, name: 'Python', level: 80, color: 'blue' },
          { id: 3, name: 'Java', level: 75, color: 'red' },
          { id: 4, name: 'C++', level: 65, color: 'purple' },
          { id: 5, name: 'SQL', level: 85, color: 'green' },
          { id: 6, name: 'TypeScript', level: 70, color: 'blue' }
        ]);
        
        setWebSkills([
          { id: 1, name: 'React', level: 85, color: 'blue' },
          { id: 2, name: 'Node.js', level: 80, color: 'green' },
          { id: 3, name: 'HTML/CSS', level: 95, color: 'red' },
          { id: 4, name: 'Express', level: 75, color: 'yellow' },
          { id: 5, name: 'TailwindCSS', level: 90, color: 'blue' },
          { id: 6, name: 'PostgreSQL', level: 70, color: 'purple' }
        ]);
        
        setOtherSkills([
          { id: 1, name: 'Git & Version Control', level: 85, color: 'red' },
          { id: 2, name: 'Docker', level: 65, color: 'blue' },
          { id: 3, name: 'CI/CD Pipelines', level: 70, color: 'green' },
          { id: 4, name: 'System Architecture', level: 75, color: 'purple' },
          { id: 5, name: 'Problem Solving', level: 90, color: 'yellow' },
          { id: 6, name: 'Agile Methodology', level: 80, color: 'blue' }
        ]);

        setEducation([
          {
            id: 1,
            title: 'Bachelor of Science in Computer Engineering',
            institution: 'University of Technology',
            period: '2020 - Present',
            description: 'Specializing in software systems and computer architecture with a focus on web technologies and artificial intelligence.',
            color: 'blue'
          }
        ]);

        setCertifications([
          {
            id: 1,
            title: 'Full Stack Web Development',
            institution: 'Udemy',
            period: '2022',
            description: 'Comprehensive course covering modern web development technologies including React, Node.js, and database design.',
            color: 'purple'
          },
          {
            id: 2,
            title: 'AWS Cloud Practitioner',
            institution: 'Amazon Web Services',
            period: '2023',
            description: 'Certification in cloud fundamentals, covering AWS services, security, architecture, and pricing models.',
            color: 'green'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

  // Helper function to get color classes
  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-500', border: 'border-blue-500/20', text: 'text-blue-400' },
      purple: { bg: 'bg-purple-500', border: 'border-purple-500/20', text: 'text-purple-400' },
      green: { bg: 'bg-green-500', border: 'border-green-500/20', text: 'text-green-400' },
      red: { bg: 'bg-red-500', border: 'border-red-500/20', text: 'text-red-400' },
      yellow: { bg: 'bg-yellow-500', border: 'border-yellow-500/20', text: 'text-yellow-400' }
    };
    return colorMap[color] || colorMap.blue;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error && programmingSkills.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-white">
        <span className="text-blue-400">&lt;</span> Skills & Expertise <span className="text-blue-400">/&gt;</span>
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Programming Languages */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-blue-500/30">
          <h3 className="text-xl font-mono mb-6 text-blue-400">Programming Languages</h3>
          
          {programmingSkills.map((skill, index) => (
            <SkillBar 
              key={skill.id || index}
              skill={skill.name}
              percentage={skill.level}
              color={skill.color}
            />
          ))}
        </div>
        
        {/* Web Development */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-blue-500/30">
          <h3 className="text-xl font-mono mb-6 text-blue-400">Web Development</h3>
          
          {webSkills.map((skill, index) => (
            <SkillBar 
              key={skill.id || index}
              skill={skill.name}
              percentage={skill.level}
              color={skill.color}
            />
          ))}
        </div>
        
        {/* Other Skills */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-blue-500/30">
          <h3 className="text-xl font-mono mb-6 text-blue-400">Other Skills</h3>
          
          {otherSkills.map((skill, index) => (
            <SkillBar 
              key={skill.id || index}
              skill={skill.name}
              percentage={skill.level}
              color={skill.color}
            />
          ))}
        </div>
      </div>
      
      {/* Education & Certifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-white">
          <span className="text-blue-400">&lt;</span> Education & Certifications <span className="text-blue-400">/&gt;</span>
        </h2>
        
        <div className="space-y-6">
          {/* Timeline */}
          <div className="relative border-l-2 border-blue-500/50 pl-8 ml-4 space-y-10">
            {/* Render education and certifications here */}
            {[...education, ...certifications].map((item, index) => (
              <div key={item.id || index} className="relative">
                <div className="absolute -left-11 h-6 w-6 rounded-full border-2 border-blue-500 bg-gray-900"></div>
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-blue-400">{item.institution}</p>
                  <p className="text-sm text-gray-400">{item.period}</p>
                </div>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;