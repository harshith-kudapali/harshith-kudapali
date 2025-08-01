// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import GitHubCalendar from '../components/GitHubCalendar';
import LeetCodeStats from '../components/LeetCodeStats';
import {
  Code,
  Server,
  Database,
  Zap,
  Palette,
  FileText,
  Hash,
  Code2,
  GitBranch,
  Container,
  Workflow,
  Cloud
} from 'lucide-react';
import { backendApi } from '../App';
import axios from 'axios'
const Home = ({ addNotification }) => {
  const technologies = [
    { name: 'React', icon: Code, color: 'text-blue-400' },
    { name: 'Node.js', icon: Server, color: 'text-green-400' },
    { name: 'PostgreSQL', icon: Database, color: 'text-blue-600' },
    { name: 'Express', icon: Zap, color: 'text-yellow-400' },
    { name: 'TailwindCSS', icon: Palette, color: 'text-cyan-400' },
    { name: 'JavaScript', icon: FileText, color: 'text-yellow-300' },
    { name: 'TypeScript', icon: Hash, color: 'text-blue-500' },
    { name: 'Python', icon: Code2, color: 'text-green-500' },
    { name: 'Git', icon: GitBranch, color: 'text-orange-400' },
    { name: 'Docker', icon: Container, color: 'text-blue-300' },
    { name: 'CI/CD', icon: Workflow, color: 'text-purple-400' },
    { name: 'AWS', icon: Cloud, color: 'text-orange-500' }
  ];
  useEffect(() => {
    // Simulate connection established
    const timer = setTimeout(() => {
      addNotification('Systems online. All modules functioning at optimal capacity.', 'info');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
useEffect(() => {
  // Helper to get IP data (remains the same)
  const getIpAndNetworkData = async () => {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) throw new Error('IP API network response was not ok.');
    const data = await response.json();
    if (data.error) throw new Error(data.reason);
    return data;
  };

  // --- NEW, REVISED FUNCTION ---
  // This function now uses the BigDataCloud API, which is free and has no CORS issues.
  const getReverseGeocodedData = async (lat, lon) => {
    // Note: We add '&localityLanguage=en' to ensure results are in English.
    const apiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    
    const response = await fetch(apiUrl); // No special headers needed
    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.statusText}`);
    }
    const data = await response.json();
    return data; 
  };

  // Helper to get browser coordinates (remains the same)
  const getBrowserCoordinates = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        return reject(new Error('Geolocation is not supported by this browser.'));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  // --- Main Orchestration Logic ---
  const fetchAndSendGeolocation = async () => {
    let finalPayload;

    try {
      const ipData = await getIpAndNetworkData();
      
      try {
        // --- HIGH ACCURACY PATH (UNCHANGED LOGIC) ---
        console.log("Attempting to get high-accuracy location from browser...");
        const position = await getBrowserCoordinates();
        const accurateCoords = position.coords;

        // Use the new, reliable reverse geocoding service
        const address = await getReverseGeocodedData(accurateCoords.latitude, accurateCoords.longitude);

        console.log("Success! Using high-accuracy browser location.");
        
        finalPayload = {
          ip: ipData.ip,
          location: {
            // Map the new API's response fields to your required format
            city: address.city,
            region: address.principalSubdivision, // 'principalSubdivision' is state/region
            country: address.countryName,
            postalCode: address.postcode,
          },
          coordinates: {
            latitude: accurateCoords.latitude,
            longitude: accurateCoords.longitude,
          },
          network: {
            isp: ipData.isp,
            organization: ipData.org,
          },
        };

      } catch (browserError) {
        // --- FALLBACK PATH (UNCHANGED LOGIC) ---
        console.warn(`High-accuracy location failed: ${browserError.message}`);
        console.log("Falling back to less-accurate IP-based location.");

        finalPayload = {
          ip: ipData.ip,
          location: {
            city: ipData.city,
            region: ipData.region,
            country: ipData.country_name,
            postalCode: ipData.postal,
          },
          coordinates: {
            latitude: ipData.latitude,
            longitude: ipData.longitude,
          },
          network: {
            isp: ipData.isp,
            organization: ipData.org,
          },
        };
      }
      
      if (finalPayload) {
        console.log('Sending data to backend:');
        const result = await axios.post(`${backendApi}/api/save-geolocation`, finalPayload);
        console.log('Data successfully sent to backend:', result.data);
      }

    } catch (error) {
      console.error('A critical error occurred during geolocation fetching:', error.message);
    }
  };

  fetchAndSendGeolocation();

}, []);



  return (
    <div className="space-y-8 sm:space-y-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-300 block sm:inline">Hello, I'm </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 block sm:inline">
                Harshith S Kudapali
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light">
              <span className="font-mono text-blue-400">Engineering Student</span>
              <span className="block sm:inline"> & </span>
              <span className="font-mono text-purple-400">Developer</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0">
              I build interactive experiences and solve complex problems. Currently focused on web development,
              machine learning, and exploring new technologies.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Link
                to="/projects"
                className="px-6 py-3 bg-blue-600 bg-opacity-90 rounded-md text-white font-medium hover:bg-opacity-100 transition-colors shadow-lg shadow-blue-500/20 text-center"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 bg-gray-800 border border-blue-500/30 rounded-md text-gray-300 font-medium hover:bg-gray-700 transition-colors text-center"
              >
                Contact Me
              </Link>
            </div>

            <div className="pt-4 flex items-center justify-center lg:justify-start">
              <span className="text-green-400 flex items-center text-sm sm:text-base">
                <span className="block w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                Available for opportunities
              </span>
            </div>
          </div>

          <div className="relative flex justify-center order-1 lg:order-2 mb-6 lg:mb-0">
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-30 animate-pulse"></div>
              <img
                src="/profilePic.png"
                alt="Harshith S Kudapali - Profile Picture"
                className="w-full h-full rounded-full border-4 border-blue-500/20 object-cover object-top relative z-10"
              />

              <div className="absolute inset-0 border-4 border-dashed border-blue-400/30 rounded-full animate-spin-slow z-0"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white text-center lg:text-left">
          <span className="text-blue-400">&lt;</span> Progress Tracker <span className="text-blue-400">/&gt;</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="w-full">
            <GitHubCalendar username="harshith-kudapali" />
          </div>
          <div className="w-full">
            <LeetCodeStats username="harshy03" />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative z-10 max-w-6xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white text-center lg:text-left">
          <span className="text-blue-400">&lt;</span> Tech Arsenal <span className="text-blue-400">/&gt;</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <div
                key={index}
                className="group flex flex-col items-center justify-center p-3 sm:p-4 lg:p-6 bg-gray-800 bg-opacity-50 rounded-lg border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20 min-h-[80px] sm:min-h-[100px] cursor-pointer relative overflow-hidden"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
                  <div className="absolute top-4 right-3 w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-3 left-4 w-1 h-1 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>

                {/* Icon container with rotation animation */}
                <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300">
                  <div className="w-full h-full rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors duration-300 group-hover:rotate-3">
                    <IconComponent
                      className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 ${tech.color} group-hover:scale-110 transition-all duration-300`}
                    />
                  </div>
                </div>

                {/* Tech name with typewriter effect simulation */}
                <span className="relative z-10 text-gray-300 text-xs sm:text-sm font-mono text-center leading-tight group-hover:text-white transition-colors duration-300">
                  {tech.name}
                </span>

                {/* Sliding bottom border */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .group:hover {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>

    </div>
  );
};

export default Home;