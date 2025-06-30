import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'
import { backendApi } from '../App';
const Contact = ({ addNotification }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [formLevel, setFormLevel] = useState(0);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Track message character count
  useEffect(() => {
    setCharacterCount(formData.message.length);
  }, [formData.message]);

  // Animation for progress bar during sending
  useEffect(() => {
    let interval;
    if (sending) {
      interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
    } else {
      setLoadingProgress(0);
    }

    return () => clearInterval(interval);
  }, [sending]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const progressToNextLevel = () => {
    if (formLevel < 3) {
      setFormLevel(prev => prev + 1);
    }
  };

  const goBackLevel = () => {
    if (formLevel > 0) {
      setFormLevel(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      // Add a small delay to ensure loading state is visible
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send form data to backend using axios
      const response = await axios.post(`${backendApi}/api/contact`, formData);
      
      // Success notification
      addNotification('🎮 Mission Complete! Message sent successfully!', 'success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setFormLevel(0);

    } catch (error) {
      console.error('Error sending message:', error);
      
      // Error notification
      const errorMessage = error.response?.data?.message || 'Please try again.';
      addNotification(`❌ Mission Failed! ${errorMessage}`, 'error');
    } finally {
      setSending(false);
    }
  };

  // Form fields by level
  const renderFormLevel = () => {
    switch (formLevel) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <div className="text-xs font-mono text-gray-500 mb-1">LEVEL 1/4</div>
              <h3 className="text-xl font-bold text-blue-400">Identify Yourself</h3>
            </div>
            <div>
              <label htmlFor="name" className="block text-gray-300 font-mono mb-2">
                <span className="text-blue-400">&gt;</span> ENTER NAME
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-blue-500/30 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Agent Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 font-mono mb-2">
                <span className="text-blue-400">&gt;</span> ENTER EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-blue-500/30 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="comms@example.com"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={progressToNextLevel}
              disabled={!formData.name || !formData.email}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              CONTINUE <span className="ml-2">→</span>
            </motion.button>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <div className="text-xs font-mono text-gray-500 mb-1">LEVEL 2/4</div>
              <h3 className="text-xl font-bold text-blue-400">Mission Briefing</h3>
            </div>
            <div>
              <label htmlFor="subject" className="block text-gray-300 font-mono mb-2">
                <span className="text-blue-400">&gt;</span> SUBJECT LINE
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-blue-500/30 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mission Objective"
              />
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={goBackLevel}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition-colors flex justify-center items-center"
              >
                <span className="mr-2">←</span> BACK
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={progressToNextLevel}
                disabled={!formData.subject}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CONTINUE <span className="ml-2">→</span>
              </motion.button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <div className="text-xs font-mono text-gray-500 mb-1">LEVEL 3/4</div>
              <h3 className="text-xl font-bold text-blue-400">Transmission Details</h3>
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-300 font-mono mb-2">
                <span className="text-blue-400">&gt;</span> MESSAGE CONTENT
              </label>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full bg-gray-900 border border-blue-500/30 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Type your message here..."
                ></textarea>
                <div className="absolute bottom-2 right-2 text-xs text-gray-500 font-mono">
                  {characterCount}/500
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={goBackLevel}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition-colors flex justify-center items-center"
              >
                <span className="mr-2">←</span> BACK
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={progressToNextLevel}
                disabled={!formData.message}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                CONTINUE <span className="ml-2">→</span>
              </motion.button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-4">
              <div className="text-xs font-mono text-gray-500 mb-1">LEVEL 4/4</div>
              <h3 className="text-xl font-bold text-blue-400">Mission Summary</h3>
            </div>

            <div className="bg-gray-900 rounded-lg p-4 border border-blue-500/30">
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-xs text-gray-500 font-mono">AGENT:</div>
                <div className="col-span-2 text-white font-mono">{formData.name}</div>

                <div className="text-xs text-gray-500 font-mono">COMMS:</div>
                <div className="col-span-2 text-white font-mono">{formData.email}</div>

                <div className="text-xs text-gray-500 font-mono">OBJECTIVE:</div>
                <div className="col-span-2 text-white font-mono">{formData.subject}</div>
              </div>

              <div className="text-xs text-gray-500 font-mono mb-2">MESSAGE:</div>
              <div className="text-white font-mono text-sm bg-gray-800 p-3 rounded max-h-40 overflow-y-auto">
                {formData.message}
              </div>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={goBackLevel}
                className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-md transition-colors flex justify-center items-center"
              >
                <span className="mr-2">←</span> EDIT
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                onClick={handleSubmit}
                disabled={sending}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex justify-center items-center disabled:opacity-70"
              >
                {sending ? (
                  <div className="w-full">
                    <div className="flex items-center justify-center mb-1">
                      <span>TRANSMITTING...</span>
                      <span className="ml-2">{loadingProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div
                        className="bg-blue-400 h-1.5 rounded-full transition-all duration-300 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                ) : 'SEND TRANSMISSION'}
              </motion.button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Background animated elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl opacity-5 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-5 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2 text-white flex items-center">
          <span className="text-blue-400">&lt;</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Communications Terminal
          </motion.span>
          <span className="text-blue-400">/&gt;</span>
        </h1>

        <p className="text-gray-400 mb-8 font-mono">
          <span className="text-blue-400">$</span> Establish a secure connection to send your message
        </p>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Contact Form */}
          <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30 shadow-lg shadow-blue-900/10"
            whileHover={{ boxShadow: "0 8px 32px rgba(30, 64, 175, 0.15)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderFormLevel()}
            </form>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-6">
            <motion.div
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={{ boxShadow: "0 8px 32px rgba(30, 64, 175, 0.15)" }}
            >
              <h3 className="text-xl font-mono mb-4 text-blue-400">Network Nodes</h3>

              <div className="space-y-5">
                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-blue-500 bg-opacity-20 text-blue-400 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium font-mono">MAIL SERVER</p>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=harshithsk2003@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:underline flex items-center group"
                    >
                      harshithsk2003@gmail.com
                      <svg
                        className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </a>

                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-blue-500 bg-opacity-20 text-blue-400 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium font-mono">BASE LOCATION</p>
                    <p className="text-gray-400">Mysore, India</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-blue-500 bg-opacity-20 text-blue-400 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-300 font-medium font-mono">SOCIAL LINKS</p>
                    <div className="flex space-x-3 mt-2">
                      <a
                        href="https://www.github.com/harshith-kudapali"
                        target="_blank"

                        className="text-gray-400 hover:text-blue-400 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      <a href="https://www.linkedin.com/in/harshith-s-k-12a7b8256"
                        target='_blank'
                        className="text-gray-400 hover:text-blue-400 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a href="https://x.com/HarshithSK2003?t=D40lu6IdL6RvchfKZeUL4A&s=08"
                        target='_blank'
                        className="text-gray-400 hover:text-blue-400 transition-colors">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-lg p-6 border border-blue-500/30"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ boxShadow: "0 8px 32px rgba(30, 64, 175, 0.15)" }}
            >
              <h3 className="text-xl font-mono mb-4 text-blue-400">Response Time</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Typical Response Time</span>
                  <span className="text-green-400 font-mono">24-48 hrs</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-green-400 h-1.5 rounded-full w-3/4"></div>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  <span className="text-blue-400">TIP:</span> For urgent matters, please indicate "URGENT" in your subject line.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;