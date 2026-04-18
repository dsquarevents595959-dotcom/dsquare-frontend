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
    <section className="relative hero-min-height flex items-center justify-center text-white overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover brightness-100 contrast-105"
          style={{
            objectFit: 'cover',
            minHeight: '100vh',
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
          key={heroVideo?.videoUrl || 'default'}
          onError={() => {
            console.warn('Video element failed to load');
            setVideoLoadError(true);
          }}
          onLoadedMetadata={() => {
            // console.log('Video metadata loaded successfully');
            setVideoLoadError(false);
          }}
        >
          <source 
            src={heroVideo?.videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'} 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        {/* Lighter Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto z-10 px-4 text-center sm:px-6">
        <div className="mb-4 sm:mb-6 animate-fade-in px-1">
          <DsquareLogo />
        </div>

        <p className="mb-8 max-w-4xl mx-auto px-1 text-2xl font-extrabold leading-tight sm:mb-10 sm:text-2xl md:text-4xl lg:text-5xl tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
          Igniting Your Special Moments with Spectacular Fireworks &{' '}
          <span className="text-red-500">Unforgettable Events</span>
        </p>


        
        <p className="mb-8 max-w-full mx-auto px-1 text-lg font-bold leading-relaxed sm:mb-10 sm:text-xl md:text-3xl lg:text-4xl font-serif tracking-wide" style={{ fontFamily: "'Playfair Display', serif" }}>
          <span className="text-red-500">Big Deals</span> in Small Budget!
        </p>
        
        <div className="flex w-full max-w-md flex-col gap-3 px-2 sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
          {/* <button
            type="button"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3.5 px-8 rounded-full text-base sm:w-auto sm:py-4 sm:px-10 sm:text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer shadow-lg hover:shadow-yellow-500/30"
            onClick={(e) => {
              e.preventDefault();
              setShowBookingForm(true);
            }}
          >
            Book Now
          </button> */}
          
          <button
            type="button"
            className="w-full border-2 border-white bg-transparent py-3.5 px-8 text-base font-bold text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-white/20 sm:w-auto sm:py-4 sm:px-10 sm:text-lg"
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Services
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator Arrow */}
      <div 
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer py-8 sm:py-12"
        onClick={() => document.getElementById('about-us')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <svg 
          className="w-8 h-8 sm:w-10 sm:h-10 text-white hover:text-yellow-400 transition-colors drop-shadow-lg" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={3}
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-4">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowBookingForm(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 mt-auto w-full max-h-[90dvh] max-w-md overflow-y-auto rounded-t-2xl sm:mt-0 sm:rounded-2xl sm:mx-4">
            <BookingForm onClose={() => setShowBookingForm(false)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
