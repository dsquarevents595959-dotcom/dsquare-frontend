import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLightbulb, FaHome, FaBolt } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

const djLightingServices = [
  {
    id: 'house-lighting',
    title: 'House Lighting',
    description: 'Complete house lighting solutions for residential events',
    image: '/images/dj-lighting/house-lighting.jpg'
  },
  {
    id: 'event-lighting',
    title: 'Any Event Lighting',
    description: 'Professional lighting setups for all types of events',
    image: '/images/dj-lighting/event-lighting.jpg'
  }
];

const cardMotion = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay, ease: 'easeOut' }
  })
};

const DjLightingVisual = () => (
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
          DJ & Lighting & Visual Services
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Professional lighting and visual solutions for your events
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {djLightingServices.map((service, index) => (
          <motion.div
            key={service.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardMotion}
            className="group relative bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
              {service.id === 'house-lighting' && <FaHome className="text-6xl text-purple-500/30" />}
              {service.id === 'event-lighting' && <FaLightbulb className="text-6xl text-purple-500/30" />}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DjLightingVisual;
