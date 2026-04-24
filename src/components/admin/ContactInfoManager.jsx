import React, { useState, useEffect } from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';

const ContactInfoManager = () => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    address: '',
    facebook: '',
    whatsapp: '',
    instagram: '',
    youtube: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://dsquare-backend-dygo.onrender.com' : 'http://localhost:5000'}/api/admin/contact-info`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      
      if (data.ok && data.contactInfo) {
        setFormData({
          phone: data.contactInfo.phone || '',
          email: data.contactInfo.email || '',
          address: data.contactInfo.address || '',
          facebook: data.contactInfo.facebook || '',
          whatsapp: data.contactInfo.whatsapp || '',
          instagram: data.contactInfo.instagram || '',
          youtube: data.contactInfo.youtube || ''
        });
      }
    } catch (err) {
      setError('Failed to load contact info');
      console.error('Error fetching contact info:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      setSaving(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://dsquare-backend-dygo.onrender.com' : 'http://localhost:5000'}/api/admin/contact-info`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      // console.log('API response:', data);
      // console.log('Response structure check:', {
      //   ok: data.ok,
      //   contactInfo: data.contactInfo,
      //   message: data.message
      // });

      if (data.ok) {
        setSuccess('Contact information updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
        
        // Debug: Log the updated contact info
        console.log('Contact info updated:', data.contactInfo);
        
        // Notify other components that contact info has been updated
        const event = new CustomEvent('contactInfoUpdated', { detail: data.contactInfo });
        console.log('Dispatching contactInfoUpdated event:', event);
        window.dispatchEvent(event);
      } else {
        setError(data.message || 'Failed to update contact info');
      }
    } catch (err) {
      setError('Error updating contact info: ' + err.message);
      console.error('Error updating contact info:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Contact Information Manager</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError('')} className="hover:bg-red-100 p-1 rounded">
            <FaTimes />
          </button>
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="+91 7032619629"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="dinesh@dsquarevents.com"
            />
          </div>

          {/* Facebook */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Facebook URL
            </label>
            <input
              type="url"
              name="facebook"
              value={formData.facebook}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="https://www.facebook.com/..."
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              WhatsApp URL
            </label>
            <input
              type="url"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="https://wa.me/..."
            />
          </div>

          {/* Instagram */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Instagram URL
            </label>
            <input
              type="url"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="https://www.instagram.com/..."
            />
          </div>

          {/* YouTube */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              YouTube URL
            </label>
            <input
              type="url"
              name="youtube"
              value={formData.youtube}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="https://www.youtube.com/..."
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Address
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter full address"
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            <FaSave />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfoManager;
