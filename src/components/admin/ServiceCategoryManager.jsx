import React, { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes, FaVideo, FaEdit, FaImage } from 'react-icons/fa';

const ServiceCategoryManager = () => {
  const [activeCategory, setActiveCategory] = useState('weddings');
  const [serviceCards, setServiceCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [formData, setFormData] = useState({
    cardTitle: '',
    cardDescription: '',
    mediaType: 'image',
    isSubCard: false,
    parentCardId: '',
    sortOrder: 0
  });

  const serviceCategories = [
    { id: 'weddings', name: 'Weddings', icon: '💒' },
    { id: 'birthdays', name: 'Birthdays', icon: '🎂' },
    { id: 'grand-entry', name: 'Grand Entry', icon: '🚪' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎭' },
    { id: 'stalls', name: 'Stalls', icon: '🏪' },
    { id: 'dj-lighting-visual', name: 'DJ & Lighting & Visual', icon: '🎵' }
  ];

  useEffect(() => {
    fetchCategories();
    fetchServiceCards(activeCategory);
  }, [activeCategory]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dsquare-backend-dygo.onrender.com/api/service-cards/categories/overview');
      
      if (!response.ok) {
        console.error('Failed to fetch categories:', response.status);
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchServiceCards = async (category) => {
    try {
      setLoading(true);
      const response = await fetch(`https://dsquare-backend-dygo.onrender.com/api/service-cards/${category}`);
      
      if (!response.ok) {
        console.error('Failed to fetch service cards:', response.status);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      if (data.success) {
        setServiceCards(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch service cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('adminToken');
    const uploadFormData = new FormData();
    uploadFormData.append('media', file);
    uploadFormData.append('serviceCategory', activeCategory);
    uploadFormData.append('cardTitle', formData.cardTitle);
    uploadFormData.append('cardDescription', formData.cardDescription);
    uploadFormData.append('mediaType', formData.mediaType);
    uploadFormData.append('isSubCard', formData.isSubCard);
    uploadFormData.append('parentCardId', formData.parentCardId);
    uploadFormData.append('sortOrder', formData.sortOrder);

    try {
      const response = await fetch('https://dsquare-backend-dygo.onrender.com/api/service-cards', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadFormData
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload error response:', response.status, errorText);
        try {
          const errorData = JSON.parse(errorText);
          console.error('Upload failed:', errorData.message);
        } catch {
          console.error('Upload failed with non-JSON response:', errorText);
        }
        return;
      }

      const data = await response.json();
      if (data.success) {
        fetchServiceCards(activeCategory);
        fetchCategories();
        resetForm();
        setShowAddForm(false);
      } else {
        console.error('Upload failed:', data.message);
      }
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  const handleEdit = (card) => {
    setEditingCard(card);
    setFormData({
      cardTitle: card.cardTitle,
      cardDescription: card.cardDescription,
      mediaType: card.mediaType,
      isSubCard: card.isSubCard,
      parentCardId: card.parentCardId || '',
      sortOrder: card.sortOrder
    });
    setShowAddForm(true);
  };

  const handleDelete = async (cardId, publicId) => {
    if (!window.confirm('Are you sure you want to delete this card?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://dsquare-backend-dygo.onrender.com/api/service-cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        console.error('Delete error:', response.status);
        return;
      }

      const data = await response.json();
      if (data.success) {
        fetchServiceCards(activeCategory);
        fetchCategories();
      } else {
        console.error('Delete failed:', data.message);
      }
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      cardTitle: '',
      cardDescription: '',
      mediaType: 'image',
      isSubCard: false,
      parentCardId: '',
      sortOrder: 0
    });
    setEditingCard(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (editingCard) {
      // Update existing card
      try {
        const token = localStorage.getItem('adminToken');
        const fileInput = document.querySelector('input[name="media"]');
        const newFile = fileInput ? fileInput.files[0] : null;
        
        if (newFile) {
          // Update with new file using PUT with upload
          const uploadFormData = new FormData();
          uploadFormData.append('media', newFile);
          uploadFormData.append('serviceCategory', activeCategory);
          uploadFormData.append('cardTitle', formData.cardTitle);
          uploadFormData.append('cardDescription', formData.cardDescription);
          uploadFormData.append('mediaType', formData.mediaType);
          uploadFormData.append('isSubCard', formData.isSubCard);
          uploadFormData.append('parentCardId', formData.parentCardId);
          uploadFormData.append('sortOrder', formData.sortOrder);

          const response = await fetch(`https://dsquare-backend-dygo.onrender.com/api/service-cards/${editingCard._id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: uploadFormData
          });

          const data = await response.json();
          if (data.success) {
            fetchServiceCards(activeCategory);
            fetchCategories();
            resetForm();
            setShowAddForm(false);
          } else {
            console.error('Update failed:', data.message);
          }
        } else {
          // Update metadata only (no new file)
          const response = await fetch(`https://dsquare-backend-dygo.onrender.com/api/service-cards/${editingCard._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          });

          const data = await response.json();
          if (data.success) {
            fetchServiceCards(activeCategory);
            fetchCategories();
            resetForm();
            setShowAddForm(false);
          } else {
            console.error('Update failed:', data.message);
          }
        }
      } catch (error) {
        console.error('Update failed:', error);
      }
    } else {
      // Create new card
      const fileInput = document.querySelector('input[name="media"]');
      if (fileInput && fileInput.files[0]) {
        handleFileUpload({ target: { files: [fileInput.files[0]] } });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl pt-9 mx-auto">
        <h1 className="text-3xl font-bold mb-8">Manage Service Categories</h1>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {serviceCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category.id
                  ? 'bg-red-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                activeCategory === cat._id
                  ? 'bg-slate-800 border-red-500'
                  : 'bg-slate-900 border-slate-700 hover:border-slate-600'
              }`}
            >
              <p className="text-2xl font-bold text-white">{cat.count}</p>
              <p className="text-sm text-slate-400 capitalize">{cat._id}</p>
              <p className="text-xs text-green-400">{cat.activeCount} active</p>
            </div>
          ))}
        </div>

        {/* Add New Card Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FaPlus />
            Add New Card
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">
                  {editingCard ? 'Edit Card' : 'Add New Card'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Card Title
                  </label>
                  <input
                    type="text"
                    value={formData.cardTitle}
                    onChange={(e) => setFormData({...formData, cardTitle: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.cardDescription}
                    onChange={(e) => setFormData({...formData, cardDescription: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    rows="3"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Media Type
                  </label>
                  <select
                    value={formData.mediaType}
                    onChange={(e) => setFormData({...formData, mediaType: e.target.value})}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Media File
                  </label>
                  {editingCard && (
                    <div className="mb-4 p-3 bg-slate-900 rounded-lg border border-slate-700">
                      {editingCard.mediaType === 'image' ? (
                        <img 
                          src={editingCard.mediaUrl} 
                          alt={editingCard.cardTitle}
                          className="w-full h-32 object-cover rounded"
                        />
                      ) : (
                        <div className="w-full h-32 flex items-center justify-center bg-slate-800 rounded">
                          <FaVideo className="text-4xl text-slate-500" />
                        </div>
                      )}
                      <p className="text-xs text-slate-400 mt-2">Current media</p>
                    </div>
                  )}
                  <input
                    type="file"
                    name="media"
                    accept={formData.mediaType === 'image' ? 'image/*' : 'video/*'}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && !formData.cardTitle) {
                        setFormData({...formData, cardTitle: file.name.split('.')[0]});
                      }
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required={!editingCard}
                  />
                  {editingCard && (
                    <p className="text-xs text-slate-400 mt-2">Leave empty to keep current media</p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FaSave className="inline mr-2" />
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      resetForm();
                    }}
                    className="flex-1 bg-slate-700 text-white py-2 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Service Cards Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-slate-400 mt-2">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {serviceCards.map((card) => (
              <div key={card._id} className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-slate-700">
                  {card.mediaType === 'image' ? (
                    <img 
                      src={card.mediaUrl} 
                      alt={card.cardTitle}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center">
                      <FaVideo className="text-4xl text-slate-500" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2">{card.cardTitle}</h3>
                  <p className="text-slate-300 text-sm mb-4">{card.cardDescription}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      card.isActive ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                    }`}>
                      {card.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(card)}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        title="Edit Card"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(card._id, card.publicId)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                        title="Delete Card"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {serviceCards.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No cards found in this category.</p>
            <p className="text-slate-500">Click "Add New Card" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceCategoryManager;
