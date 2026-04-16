import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaSignOutAlt,
  FaCog
} from 'react-icons/fa';
import ServiceCategoryManager from './ServiceCategoryManager';

const AdminDashboard = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [activeSection, setActiveSection] = useState('categories');
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
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'categories':
        return <ServiceCategoryManager />;

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
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          {adminInfo && (
            <p className="text-slate-400 text-sm mt-1">{adminInfo.email}</p>
          )}
        </div>
        
        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left transition-colors ${
                  activeSection === item.id
                    ? 'bg-slate-800 text-red-500 border-r-2 border-red-500'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-left text-slate-400 hover:text-white hover:bg-slate-800 transition-colors rounded-lg"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
