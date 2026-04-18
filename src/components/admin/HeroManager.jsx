import React, { useState, useEffect } from 'react';
import { FaUpload, FaPlay, FaTrash, FaVideo, FaEdit } from 'react-icons/fa';

const HeroManager = () => {
  const [heroVideo, setHeroVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [videoTitle, setVideoTitle] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchHeroVideo();
  }, []);

  const fetchHeroVideo = async () => {
    try {
      const response = await fetch('https://dsquare-backend-dygo.onrender.com/api/hero/video');
      const result = await response.json();
      if (result.success) {
        setHeroVideo(result.data);
        setVideoTitle(result.data.videoTitle || '');
      }
    } catch (error) {
      console.error('Error fetching hero video:', error);
      setError('Failed to fetch hero video');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setError('');
      setSuccess('');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a video file');
      return;
    }

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('video', file);
    formData.append('videoTitle', videoTitle);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch('https://dsquare-backend-dygo.onrender.com/api/hero/video', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Origin': 'https://dsquare-backend-dygo.onrender.com'
        },
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setSuccess('Hero video updated successfully!');
        setHeroVideo(result.data);
        setFile(null);
        setPreviewUrl('');
        setVideoTitle(result.data.videoTitle || '');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.message || 'Failed to upload hero video');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload hero video');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!heroVideo?._id) return;

    if (!window.confirm('Are you sure you want to delete this hero video?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://dsquare-backend-dygo.onrender.com/api/hero/video/${heroVideo._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Origin': 'https://dsquare-backend-dygo.onrender.com'
        }
      });

      const result = await response.json();
      if (result.success) {
        setSuccess('Hero video deleted successfully!');
        setHeroVideo(null);
        setTimeout(() => setSuccess(''), 3000);
        // Refresh the list to get default video if any
        fetchHeroVideo();
      } else {
        setError(result.message || 'Failed to delete hero video');
      }
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete hero video');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-red-500">Hero Video Management</h1>
        
        {/* Success Message */}
        {success && (
          <div className="bg-green-500 text-white p-4 rounded-lg mb-6">
            {success}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Current Hero Video */}
        {heroVideo && (
          <div className="bg-slate-800 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-red-400">Current Hero Video</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-300 mb-2">Title: {heroVideo.videoTitle}</p>
                <p className="text-sm text-slate-300 mb-2">Uploaded: {new Date(heroVideo.uploadedAt).toLocaleDateString()}</p>
                <p className="text-sm text-slate-300">Status: {heroVideo.isActive ? 'Active' : 'Inactive'}</p>
              </div>
              <div>
                <video 
                  src={heroVideo.videoUrl} 
                  className="w-full max-w-md rounded-lg shadow-lg"
                  controls
                  preload="metadata"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <FaTrash />
                Delete Video
              </button>
            </div>
          </div>
        )}

        {/* Upload Form */}
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 text-red-400">
            {heroVideo ? 'Update Hero Video' : 'Upload New Hero Video'}
          </h2>
          
          <form onSubmit={handleUpload} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Video Title</label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter video title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Video File</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-600 rounded-lg cursor-pointer hover:border-red-500 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {previewUrl ? (
                    <video 
                      src={previewUrl} 
                      className="max-h-full max-w-full rounded-lg"
                      controls
                    />
                  ) : (
                    <div className="text-center">
                      <FaUpload className="text-4xl text-slate-400 mb-2" />
                      <p className="text-slate-400">Click to upload video</p>
                      <p className="text-xs text-slate-500 mt-2">Max size: 500MB</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading || !file}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <FaUpload />
                  {heroVideo ? 'Update Hero Video' : 'Upload Hero Video'}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroManager;
