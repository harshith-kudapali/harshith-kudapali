// src/pages/Skills.jsx
import React from 'react';
import SkillBar from '../components/SkillBar';

const Skills = ({ addNotification }) => {
  const programmingSkills = [
    { name: 'JavaScript', level: 90, color: 'yellow' },
    { name: 'Python', level: 80, color: 'blue' },
    { name: 'Java', level: 75, color: 'red' },
    { name: 'C++', level: 65, color: 'purple' },
    { name: 'SQL', level: 85, color: 'green' },
    { name: 'TypeScript', level: 70, color: 'blue' }
  ];
  
  const webSkills = [
    { name: 'React', level: 85, color: 'blue' },
    { name: 'Node.js', level: 80, color: 'green' },
    { name: 'HTML/CSS', level: 95, color: 'red' },
    { name: 'Express', level: 75, color: 'yellow' },
    { name: 'TailwindCSS', level: 90, color: 'blue' },
    { name: 'PostgreSQL', level: 70, color: 'purple' }
  ];
  
  const otherSkills = [
    { name: 'Git & Version Control', level: 85, color: 'red' },
    { name: 'Docker', level: 65, color: 'blue' },
    { name: 'CI/CD Pipelines', level: 70, color: 'green' },
    { name: 'System Architecture', level: 75, color: 'purple' },
    { name: 'Problem Solving', level: 90, color: 'yellow' },
    { name: 'Agile Methodology', level: 80, color: 'blue' }
  ];
  
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
              key={index}
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
              key={index}
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
              key={index}
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
            {/* Education Item 1 */}
            <div className="relative">
              <div className="absolute -left-10 top-1 w-6 h-6 rounded-full bg-blue-500 border-4 border-gray-900 shadow"></div>
              <div className="bg-gray-800 bg-opacity-70 p-5 rounded-lg border border-blue-500/20">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-white">Bachelor of Science in Computer Engineering</h3>
                  <span className="text-blue-400 font-mono">2020 - Present</span>
                </div>
                <p className="text-gray-300 mt-1">University of Technology</p>
                <p className="text-gray-400 mt-3">Specializing in software systems and computer architecture with a focus on web technologies and artificial intelligence.</p>
              </div>
            </div>
            
            {/* Certification 1 */}
            <div className="relative">
              <div className="absolute -left-10 top-1 w-6 h-6 rounded-full bg-purple-500 border-4 border-gray-900 shadow"></div>
              <div className="bg-gray-800 bg-opacity-70 p-5 rounded-lg border border-purple-500/20">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-white">Full Stack Web Development</h3>
                  <span className="text-purple-400 font-mono">2022</span>
                </div>
                <p className="text-gray-300 mt-1">Udemy</p>
                <p className="text-gray-400 mt-3">Comprehensive course covering modern web development technologies including React, Node.js, and database design.</p>
              </div>
            </div>
            
            {/* Certification 2 */}
            <div className="relative">
              <div className="absolute -left-10 top-1 w-6 h-6 rounded-full bg-green-500 border-4 border-gray-900 shadow"></div>
              <div className="bg-gray-800 bg-opacity-70 p-5 rounded-lg border border-green-500/20">
                <div className="flex justify-between">
                  <h3 className="text-lg font-bold text-white">AWS Cloud Practitioner</h3>
                  <span className="text-green-400 font-mono">2023</span>
                </div>
                <p className="text-gray-300 mt-1">Amazon Web Services</p>
                <p className="text-gray-400 mt-3">Certification in cloud fundamentals, covering AWS services, security, architecture, and pricing models.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;