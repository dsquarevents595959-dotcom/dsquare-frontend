import React, { useEffect, useRef, useState } from 'react';
import DsquareLogo from './DsquareLogo';
// import BookingForm from '../booking/BookingForm';

const Hero = () => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [heroVideo, setHeroVideo] = useState(null);
  const [videoLoadError, setVideoLoadError] = useState(false);
  const videoRef = useRef(null);

  // Fetch hero video from API
  useEffect(() => {
    fetchHeroVideo();
    // Test if API is accessible
    testApiHealth();
  }, []);

  // Ensure video plays properly on mobile devices
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      
      // Try to play the video (muted autoplay with promise)
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented
          video.muted = true;
          video.play();
        });
      }
    }
  }, []);

  const fetchHeroVideo = async () => {
    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://dsquare-backend-dygo.onrender.com/api/hero/video'
        : 'http://localhost:5000/api/hero/video';
      
      // console.log('[Hero] Fetching hero video from:', apiUrl);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // console.log('[Hero] API response status:', response.status, response.statusText);
      
      if (!response.ok) {
        // console.warn(`[Hero] Hero video API returned ${response.status} ${response.statusText}. Using fallback video.`);
        const errorText = await response.text();
        console.warn('[Hero] Error response body:', errorText);
        
        setHeroVideo({
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          videoTitle: 'DSquare Events'
        });
        return;
      }
      
      const result = await response.json();
      // console.log('[Hero] API response received:', result.success);
      
      if (result.success && result.data) {
        // console.log('[Hero] Hero video loaded successfully');
        setHeroVideo(result.data);
      } else {
        console.warn('[Hero] Invalid hero video response. Using fallback.');
        setHeroVideo({
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          videoTitle: 'DSquare Events'
        });
      }
    } catch (error) {
      console.error('[Hero] Error fetching hero video:', error.message);
      // Fallback to working video
      setHeroVideo({
        videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
        videoTitle: 'DSquare Events'
      });
    }
  };

  const testApiHealth = async () => {
    try {
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? 'https://dsquare-backend-dygo.onrender.com/api/hero/health'
        : 'http://localhost:5000/api/hero/health';
      
      // console.log('[Hero] Testing API health at:', apiUrl);
      const response = await fetch(apiUrl, { 
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        const data = await response.json();
        // console.log('[Hero] API health check passed:', data);
      } else {
        console.warn('[Hero] API health check failed with status:', response.status);
      }
    } catch (error) {
      console.warn('[Hero] API health check error:', error.message);
    }
  };

  return (
    <section className="relative hero-min-height flex items-center justify-center text-white overflow-hidden bg-black">
      {/* Video Background Container */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Video Element */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute w-full h-full object-cover"
          style={{
            objectFit: 'cover',
            minHeight: '100vh',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            filter: 'brightness(0.85) contrast(1.1) saturate(1.05)'
          }}
          key={heroVideo?.videoUrl || 'default'}
          onError={() => {
            console.warn('Video element failed to load');
            setVideoLoadError(true);
          }}
          onLoadedMetadata={() => {
            setVideoLoadError(false);
          }}
        >
          <source 
            src={heroVideo?.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'} 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Premium Gradient Overlay - Optimized for Video Visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/40 mix-blend-multiply"></div>
        
        {/* Additional Subtle Overlay for Text Readability */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30"></div>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto z-10 px-4 text-center sm:px-6 w-full max-w-6xl">
        {/* Logo Section */}
        <div className="mb-6 sm:mb-8 md:mb-5 animate-fade-in px-1">
          <DsquareLogo />
        </div>

        {/* Main Headline - Premium Typography */}
        <div className="mb-8 sm:mb-10 md:mb-12 max-w-5xl mx-auto px-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}>
            <span className="block text-white drop-shadow-lg">Igniting Your Special Moments</span>
            <span className="block bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">with Spectacular Events</span>
          </h1>
        </div>

        {/* Tagline */}
        <p className="mb-10 sm:mb-12 max-w-4xl mx-auto px-1 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-relaxed text-yellow-100 drop-shadow-lg animate-fade-in-up" style={{ fontFamily: "'Playfair Display', 'Georgia', serif", animationDelay: '0.4s' }}>
          <span className="text-white">Find </span><span className="text-red-400">Big Deals</span><span className="text-white"> in </span><span className="text-yellow-300">Small Budget!</span>
        </p>
        
        {/* CTA Buttons Container */}
        <div className="flex w-full max-w-lg mx-auto flex-col gap-4 px-2 sm:max-w-2xl sm:flex-row sm:justify-center sm:gap-6 animate-fade-in-up pr-9" style={{ animationDelay: '0.6s' }}>
          {/* Primary Button */}
          <button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-lg hover:shadow-red-500/50 uppercase tracking-wider"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            🎉 Explore Services
          </button>
          
          <button
            type="button"
            className="w-full sm:w-auto border-3 border-yellow-300 bg-transparent py-4 px-10 text-base sm:text-lg font-bold text-yellow-300 rounded-full hover:bg-yellow-300 hover:text-black transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-yellow-300/50 uppercase tracking-wider"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ✨ Get Quote
          </button>
        </div>

        {/* Trust Indicator */}
        <div className="mt-12 sm:mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 font-semibold tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            ⭐ Trusted by Hundreds of Happy Clients ⭐
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator Arrow */}
      <div 
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer py-8 sm:py-12 group"
        onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <svg 
          className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300 group-hover:text-white transition-all duration-300 drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,0,0.5)]" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={3}
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
