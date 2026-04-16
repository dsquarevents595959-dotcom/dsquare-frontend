import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUtensils, FaCookie, FaIceCream } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

const FoodStalls = () => {
  const [foodStallServices, setFoodStallServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFoodStallServices();
  }, []);

  const fetchFoodStallServices = async () => {
    try {
      const response = await fetch('https://dsquare-backend-dygo.onrender.com/api/service-cards/stalls');
      const result = await response.json();
      if (result.success) {
        // Filter for food stall related services
        const foodStalls = result.data.filter(service => 
          service.cardTitle.toLowerCase().includes('food') || 
          service.cardTitle.toLowerCase().includes('stall')
        );
        setFoodStallServices(foodStalls);
      }
    } catch (error) {
      console.error('Failed to fetch food stall services:', error);
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
            <p className="text-slate-400 mt-2">Loading food stall services...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Link to="/services/stalls" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors">
            <FaArrowLeft />
            Back to Stalls
          </Link>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Food Stall Services
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Complete food stall setup for your events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {foodStallServices.map((service, index) => (
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
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-slate-800">
                    <video
                      src={service.mediaUrl}
                      alt={service.cardTitle}
                      className="w-full h-48 object-cover"
                      controls
                      muted
                      loop
                      playsInline
                    >
                      Your browser does not support the video tag.
                    </video>
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
          ))}
        </div>

        {foodStallServices.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">No food stall services available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FoodStalls;
