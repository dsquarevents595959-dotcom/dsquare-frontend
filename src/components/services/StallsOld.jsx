import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHandSparkles, FaPalette, FaUtensils } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

const stallServices = [
  {
    id: 'mehandi',
    title: 'Mehandi',
    description: 'Traditional mehandi artists for beautiful henna designs',
    image: '/images/stalls/mehandi.jpg'
  },
  {
    id: 'nail-art',
    title: 'Nail Art',
    description: 'Professional nail art services for guests',
    image: '/images/stalls/nail-art.jpg'
  },
  {
    id: 'food-stalls',
    title: 'Food Stalls',
    description: 'Complete food stall arrangements with various cuisines',
    image: '/images/stalls/food-stalls.jpg',
    hasSubItems: true,
    link: '/services/stalls/food-stalls'
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

const Stalls = () => (
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
          Stall Services
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Complete stall arrangements for your events with various services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stallServices.map((service, index) => (
          <motion.div
            key={service.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardMotion}
            className="group relative bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-orange-500/50 transition-all duration-300"
          >
            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
              {service.id === 'mehandi' && <FaHandSparkles className="text-6xl text-orange-500/30" />}
              {service.id === 'nail-art' && <FaPalette className="text-6xl text-orange-500/30" />}
              {service.id === 'food-stalls' && <FaUtensils className="text-6xl text-orange-500/30" />}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              {service.hasSubItems && (
                <Link 
                  to={service.link}
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 font-semibold text-sm"
                >
                  Explore Options <FaArrowLeft className="rotate-180" />
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stalls;
