import React, { useState, useEffect } from 'react';
import { FaStar, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaUpload } from 'react-icons/fa';

const ReviewsManager = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingReview, setEditingReview] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    rating: 5,
    quote: '',
    response: '',
    avatar: '',
    avatarFile: null,
    sortOrder: 0,
    isActive: true
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://dsquare-backend-dygo.onrender.com' : 'http://localhost:5000'}/api/reviews/admin/all`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data);
      } else {
        setError('Failed to load reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      
      // Create FormData for multipart/form-data
      const submitFormData = new FormData();
      submitFormData.append('name', formData.name);
      submitFormData.append('date', formData.date);
      submitFormData.append('rating', formData.rating);
      submitFormData.append('quote', formData.quote);
      submitFormData.append('response', formData.response);
      submitFormData.append('sortOrder', formData.sortOrder);
      submitFormData.append('isActive', formData.isActive);
      
      // Add avatar if file exists, otherwise add URL
      if (formData.avatarFile) {
        submitFormData.append('avatar', formData.avatarFile);
      } else if (formData.avatar) {
        submitFormData.append('avatarUrl', formData.avatar);
      }

      const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://dsquare-backend-dygo.onrender.com' : 'http://localhost:5000'}/api/reviews`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitFormData
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchReviews();
        setShowAddForm(false);
        resetForm();
      } else {
        setError(data.message || 'Failed to add review');
      }
    } catch (err) {
      console.error('Error adding review:', err);
      setError('Failed to add review');
    }
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      
      // Create FormData for multipart/form-data
      const submitFormData = new FormData();
      submitFormData.append('name', formData.name);
      submitFormData.append('date', formData.date);
      submitFormData.append('rating', formData.rating);
      submitFormData.append('quote', formData.quote);
      submitFormData.append('response', formData.response);
      submitFormData.append('sortOrder', formData.sortOrder);
      submitFormData.append('isActive', formData.isActive);
      
      // Add avatar if file exists, otherwise add URL
      if (formData.avatarFile) {
        submitFormData.append('avatar', formData.avatarFile);
      } else if (formData.avatar) {
        submitFormData.append('avatarUrl', formData.avatar);
      }

      const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://dsquare-backend-dygo.onrender.com' : 'http://localhost:5000'}/api/reviews/${editingReview._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitFormData
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchReviews();
        setEditingReview(null);
        resetForm();
      } else {
        setError(data.message || 'Failed to update review');
      }
    } catch (err) {
      console.error('Error updating review:', err);
      setError('Failed to update review');
    }
  };

  const handleDeleteReview = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://dsquare-backend-dygo.onrender.com' : 'http://localhost:5000'}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchReviews();
      } else {
        setError(data.message || 'Failed to delete review');
      }
    } catch (err) {
      console.error('Error deleting review:', err);
      setError('Failed to delete review');
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create FormData for file upload
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${process.env.NODE_ENV === 'production' ? 'https://dsquare-backend-dygo.onrender.com' : 'http://localhost:5000'}/api/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      const data = await response.json();
      
      if (data.success) {
        // Update form with uploaded image URL
        setFormData(prev => ({
          ...prev,
          avatar: data.url
        }));
      } else {
        setError('Failed to upload image');
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image');
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({
      name: review.name,
      date: review.date,
      rating: review.rating,
      quote: review.quote,
      response: review.response,
      avatar: review.avatar,
      avatarFile: null,
      sortOrder: review.sortOrder,
      isActive: review.isActive
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      date: '',
      rating: 5,
      quote: '',
      response: '',
      avatar: '',
      sortOrder: 0,
      isActive: true
    });
  };

  const handleCancel = () => {
    setEditingReview(null);
    setShowAddForm(false);
    resetForm();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Reviews</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <FaPlus /> Add Review
        </button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {(showAddForm || editingReview) && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-xl font-semibold text-white mb-4">
            {editingReview ? 'Edit Review' : 'Add New Review'}
          </h3>
          <form onSubmit={editingReview ? handleUpdateReview : handleAddReview} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Date</label>
                <input
                  type="text"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  placeholder="e.g., 04 Feb"
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Rating (1-5)</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  {[1, 2, 3, 4, 5].map(rating => (
                    <option key={rating} value={rating}>{rating} Stars</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Sort Order</label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Quote</label>
              <textarea
                required
                value={formData.quote}
                onChange={(e) => setFormData({...formData, quote: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Response</label>
              <textarea
                required
                value={formData.response}
                onChange={(e) => setFormData({...formData, response: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Avatar Image</label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 file:mr-2"
                />
                {formData.avatar && typeof formData.avatar === 'string' && formData.avatar.trim() !== '' && (
                  <div className="mt-2">
                    <img 
                      src={formData.avatar} 
                      alt="Avatar preview" 
                      className="h-16 w-16 rounded-full object-cover border-2 border-slate-600"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({...formData, avatar: ''})}
                      className="ml-2 px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                className="w-4 h-4 text-yellow-500 bg-slate-700 border-slate-600 rounded focus:ring-yellow-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-slate-300">Active</label>
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <FaSave /> {editingReview ? 'Update' : 'Save'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Quote</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {reviews.map((review) => (
                <tr key={review._id} className="hover:bg-slate-700/50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={review.avatar} alt={review.name} className="h-8 w-8 rounded-full mr-3" />
                      <span className="text-white font-medium">{review.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-slate-300">{review.date}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(review.rating)].map((_, index) => (
                        <FaStar key={index} className="text-sm" />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-slate-300 max-w-xs truncate">{review.quote}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      review.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {review.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(review)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Edit"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {reviews.length === 0 && (
          <div className="text-center py-8 text-slate-400">
            No reviews found. Add your first review above.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsManager;
