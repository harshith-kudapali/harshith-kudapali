import React from 'react';
import { Mail, Phone, MapPin, Code, Briefcase, User, FileText, Coffee } from 'lucide-react';
import DangerButton from './DangerBtn';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { backendApi } from '../App';
import axios from 'axios'

const Footer = ({ addNotification }) => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendApi}/api/contact`, {
        email,
        message,
      });
      // alert('Message sent successfully!');
      addNotification('🎮 Mission Complete! Message sent successfully!', 'success');

      setEmail('');
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      // alert('Failed to send message.');
      addNotification('Failed to send message.', 'error');

    }
  };
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 border-t border-blue-500/30">
      <div className="container mx-auto px-4">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">

          {/* About Me */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Harshith S Kudapali</h3>
            <p className="mb-4 text-gray-400">
              Frontend Developer specializing in React and modern web technologies.
              Crafting user-friendly interfaces and elegant solutions for the web.
            </p>
            <div className="flex items-center mb-2">
              <Phone size={16} className="mr-2 text-blue-400" />
              <Link to="tel:+919632692471" className="hover:text-blue-400 transition-colors">+91 9632692471</Link>
            </div>
            <div className="flex items-center mb-2">
              <Mail size={16} className="mr-2 text-blue-400" />
              <Link to="mailto:harshithsk2003@gmail.com" className="hover:text-blue-400 transition-colors">harshithsk2003@gmail.com</Link>
            </div>
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-blue-400" />
              <span>Mysore, KA, India</span>
            </div>
          </div>

          {/* Portfolio Links */}
          <div>
            <h3 className="text-white text-xl font-semibold mb-4">Portfolio</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="flex items-center hover:text-blue-400 transition-colors">
                  <User size={16} className="mr-2 text-blue-400" />
                  About Me
                </Link>
              </li>
              <li>
                <Link to="/skills" className="flex items-center hover:text-blue-400 transition-colors">
                  <Code size={16} className="mr-2 text-blue-400" />
                  Skills & Technologies
                </Link>
              </li>
              <li>
                <Link to="/projects" className="flex items-center hover:text-blue-400 transition-colors">
                  <Briefcase size={16} className="mr-2 text-blue-400" />
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/blog" className="flex items-center hover:text-blue-400 transition-colors">
                  <FileText size={16} className="mr-2 text-blue-400" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/resume" className="flex items-center hover:text-blue-400 transition-colors">
                  <FileText size={16} className="mr-2 text-blue-400" />
                  Resume
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center hover:text-blue-400 transition-colors">
                  <Mail size={16} className="mr-2 text-blue-400" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Let's Connect</h3>
              <p className="mb-4 text-gray-400">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex flex-col space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2 w-full bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <textarea
                    placeholder="Your message"
                    rows="3"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="px-4 py-2 w-full bg-gray-800 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors w-full"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="flex space-x-3">
              <a href="https://github.com/harshith-kudapali" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-all hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/harshith-s-k-12a7b8256" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-all hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a href="https://x.com/harshithsk2003" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-all hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://instagram.com/harshith_kudapali" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-all hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-all hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.628 0-12 5.373-12 12s5.372 12 12 12 12-5.373 12-12-5.372-12-12-12zm9.885 11.441c-2.575-.422-4.943-.445-7.103-.073-.244-.563-.497-1.125-.767-1.68 2.31-1 4.165-2.358 5.548-4.082 1.35 1.594 2.197 3.619 2.322 5.835zm-3.842-7.282c-1.205 1.554-2.868 2.783-4.986 3.68-1.016-1.861-2.178-3.676-3.488-5.438.779-.197 1.591-.314 2.431-.314 2.275 0 4.368.779 6.043 2.072zm-10.516-.993c1.331 1.742 2.511 3.538 3.537 5.381-2.43.715-5.331 1.082-8.684 1.105.692-2.835 2.601-5.193 5.147-6.486zm-5.44 8.834l.013-.256c3.849-.005 7.169-.448 9.95-1.322.233.475.456.952.67 1.432-3.38 1.057-6.165 3.222-8.337 6.48-1.432-1.719-2.296-3.927-2.296-6.334zm3.829 7.81c1.969-3.088 4.482-5.098 7.598-6.027.928 2.42 1.609 4.91 2.043 7.46-3.349 1.291-6.953.666-9.641-1.433zm11.586.43c-.438-2.353-1.08-4.653-1.92-6.897 1.876-.265 3.94-.196 6.199.196-.437 2.786-2.028 5.192-4.279 6.701z" />
                </svg>
              </a>
              <a href="https://codepen.io/" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-all hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.045-.046-.03-.06-.044-.044-.04-.015-.02L12.58.19c-.347-.232-.796-.232-1.142 0L.453 7.502l-.015.015-.044.035-.06.05-.038.04-.05.056-.037.045-.05.06c-.02.017-.03.03-.03.046l-.05.06-.02.06c-.02.01-.02.04-.03.07l-.01.05C0 8.12 0 8.15 0 8.18v7.497c0 .044.003.09.01.135l.01.046c.005.03.01.06.02.086l.015.05c.01.027.016.053.027.075l.022.05c0 .01.015.04.03.06l.03.04c.015.01.03.04.045.06l.03.04.04.04c.01.013.01.03.03.03l.06.042.04.03.01.014 10.97 7.33c.164.12.375.163.57.163s.39-.06.57-.18l10.99-7.28.014-.01.046-.037.06-.043.048-.036.052-.058.033-.045.04-.06.03-.05.03-.07.016-.052.03-.077.015-.045.03-.08v-7.5c0-.05 0-.095-.016-.14l-.014-.045.044.003zm-11.99 6.28l-3.65-2.44 3.65-2.442 3.65 2.44-3.65 2.44zm-1.034-6.674l-4.473 2.99L2.89 8.362l8.086-5.39V7.79zm-6.33 4.233l-2.582 1.73V10.3l2.582 1.726zm1.857 1.25l4.473 2.99v4.82L2.89 15.69l3.618-2.417v-.004zm6.537 2.99l4.474-2.98 3.613 2.42-8.087 5.39v-4.82zm6.33-4.23l2.583-1.72v3.456l-2.583-1.73zm-1.855-1.24L13.042 7.8V2.97l8.085 5.39-3.612 2.415v.003z" />
                </svg>
              </a>
              <a href="https://dev.to/" target="_blank" rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-all hover:text-blue-400">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 flex flex-col md:flex-row items-center text-sm mb-4 md:mb-0">
              <p className="mr-2">© {currentYear} Harshith Kudapali. All rights reserved.</p>
              <p className="mr-4">Built with <span className="text-red-500">♥</span> and <Coffee size={14} className="inline text-yellow-600 mx-1" /> in India</p>
              <DangerButton label="Admin" to="/admin" />
            </div>
            <div className="flex flex-wrap justify-center space-x-4 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy</Link>
              <span className="hidden md:inline">|</span>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms</Link>
              <span className="hidden md:inline">|</span>
              <Link to="/credits" className="hover:text-blue-400 transition-colors">Credits</Link>
              <span className="hidden md:inline">|</span>
              <Link to="/uses" className="hover:text-blue-400 transition-colors">Uses</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
