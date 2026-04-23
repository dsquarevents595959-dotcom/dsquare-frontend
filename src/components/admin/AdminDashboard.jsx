import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSignOutAlt,
  FaCog,
  FaVideo,
  FaBars,
  FaTimes,
  FaStar,
  FaPhone
} from 'react-icons/fa';
import ServiceCategoryManager from './ServiceCategoryManager';
import HeroManager from './HeroManager';
import ReviewsManager from './ReviewsManager';
import ContactInfoManager from './ContactInfoManager';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [activeSection, setActiveSection] = useState('categories');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const info = localStorage.getItem('adminInfo');
    
    if (!token || !info) {
      navigate('/admin/login');
      return;
    }
    
    setAdminInfo(JSON.parse(info));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const token = localStorage.getItem('adminToken');
    const formData = new FormData();
    
    if (files.length === 1) {
      formData.append('file', files[0]);
    } else {
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });
    }

    try {
      const endpoint = files.length === 1 ? '/api/upload/single' : '/api/upload/multiple';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        // Refresh the media list from database
        fetchMediaFiles();
        fetchMediaStats();
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const sidebarItems = [
    { id: 'categories', label: 'Manage Categories', icon: FaCog },
    { id: 'hero', label: 'Hero Video', icon: FaVideo },
    { id: 'reviews', label: 'Manage Reviews', icon: FaStar },
    { id: 'contact-info', label: 'Contact Information', icon: FaPhone },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'categories':
        return <ServiceCategoryManager />;
      case 'hero':
        return <HeroManager />;
      case 'reviews':
        return <ReviewsManager />;
      case 'contact-info':
        return <ContactInfoManager />;

      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">{sidebarItems.find(item => item.id === activeSection)?.label}</h2>
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <p className="text-slate-400">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-all duration-200 shadow-lg"
      >
        {sidebarOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 ease-in-out lg:transform-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        <div className="p-4 lg:p-6">
          <h1 className="text-lg lg:text-xl font-bold text-white">Admin Panel</h1>
          {adminInfo && (
            <p className="text-slate-400 text-xs lg:text-sm mt-1 truncate">{adminInfo.email}</p>
          )}
        </div>
        
        <nav className="mt-4 lg:mt-6 px-2 lg:px-3">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center px-2 lg:px-3 py-2 lg:py-3 text-left transition-all duration-200 rounded-lg ${
                  activeSection === item.id
                    ? 'bg-slate-800 text-red-500 border-r-2 border-red-500 shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="mr-2 lg:mr-3 h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
                <span className="text-sm lg:text-base truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-4 lg:p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 lg:px-6 py-2 lg:py-3 text-left text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 rounded-lg"
          >
            <FaSignOutAlt className="mr-2 lg:mr-3 h-4 w-4 lg:h-5 lg:w-5 flex-shrink-0" />
            <span className="text-sm lg:text-base truncate">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0 pt-16 lg:pt-0 px-4 lg:px-8 pb-4 lg:pb-8 overflow-x-hidden">
        <div className="max-w-full">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
