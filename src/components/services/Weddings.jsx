import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GiFlowers, GiFlowerPot, GiRingBox } from 'react-icons/gi';
import { FaArrowLeft } from 'react-icons/fa';

const Weddings = () => {
  const [weddingServices, setWeddingServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeddingServices();
  }, []);

  const fetchWeddingServices = async () => {
    try {
      const response = await fetch('/api/service-cards/weddings');
      const result = await response.json();
      if (result.success) {
        setWeddingServices(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch wedding services:', error);
    } finally {
      setLoading(false);
    }
  };

  const cardMotion = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, delay, ease: 'easeOut' }
    })
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-slate-400 mt-2">Loading wedding services...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/#services" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors">
            <FaArrowLeft />
            Back to Services
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Wedding Services
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Complete wedding decoration services from ceremony to reception
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {weddingServices.map((service, index) => {
            console.log('Service data:', service); // Debug log
            console.log('Media type:', service.mediaType); // Debug media type
            console.log('Media URL:', service.mediaUrl); // Debug media URL
            
            return (
            <motion.div
              key={service._id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardMotion}
              className="group relative bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-red-500/50 transition-all duration-300"
            >
              <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-slate-800 to-slate-700">
                {service.mediaType === 'image' ? (
                  <img 
                    src={service.mediaUrl} 
                    alt={service.cardTitle}
                    className="w-full h-48 object-cover"
                    onError={(e) => console.log('Image load error:', e)}
                  />
                ) : service.mediaType === 'video' ? (
                  <div className="w-full h-48 flex items-center justify-center bg-slate-800">
                    <video
                      src={service.mediaUrl}
                      alt={service.cardTitle}
                      className="w-full h-48 object-cover"
                      controls
                      muted
                      loop
                      playsInline
                      onError={(e) => console.log('Video load error:', e)}
                      onLoad={() => console.log('Video loaded successfully')}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-slate-800">
                    <GiFlowers className="text-6xl text-red-500/30" />
                    <p className="text-red-400 text-sm mt-2">Unknown media type: {service.mediaType}</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                  {service.cardTitle}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {service.cardDescription}
                </p>
              </div>
            </motion.div>
            );
          })}
        </div>

        {weddingServices.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No wedding services available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Weddings;
