// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import NotificationSystem from './components/NotificationSystem';
import Particles from './components/Particles';
import AdminPrank from './pages/AdminPrank';
import NotFound from './pages/NotFound';
import ResumePage from './pages/ResumePage';
import BlogPage from './pages/BlogPage';
import AboutMePage from './pages/AboutMePage';
function App() {
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      // setLoading(false);
      addNotification('Welcome to my portfolio! Ready to explore?', 'success');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);


  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);

    // Auto remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };

  if (loading) return <LoadingScreen onComplete={() => {
    setLoading(false);
    // addNotification('Welcome to my portfolio! Ready to explore?', 'success');
  }} />;


  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
        <Navbar addNotification={addNotification} />
        {/* <AdminPrank/> */}
        <div className="container mx-auto px-4 pt-20 pb-16">
          <Routes>
            <Route path="/" element={<Home addNotification={addNotification} />} />
            <Route path="/projects" element={<Projects addNotification={addNotification} />} />
            <Route path="/skills" element={<Skills addNotification={addNotification} />} />
            <Route path="/contact" element={<Contact addNotification={addNotification} />} />
            <Route path="/admin" element={<AdminPrank addNotification={addNotification} />} />
            <Route path="/resume" element={<ResumePage addNotification={addNotification} />} />
            <Route path="/blog" element={<BlogPage addNotification={addNotification} />} />
            <Route path="/about" element={<AboutMePage addNotification={addNotification} />} />
            {/* Catch-all 404 route (MUST be last) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Particles />
        <NotificationSystem notifications={notifications} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;