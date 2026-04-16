import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaBirthdayCake, FaGift, FaStar } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

const birthdayServices = [
  {
    id: 'first-birthday',
    title: '1st Birthday',
    description: 'Special celebration for baby\'s first milestone',
    image: '/images/birthdays/first-birthday.jpg'
  },
  {
    id: 'any-birthday',
    title: 'Any Birthday',
    description: 'Custom birthday celebrations for all ages',
    image: '/images/birthdays/any-birthday.jpg'
  },
  {
    id: 'vuyyala',
    title: 'Vuyyala',
    description: 'Traditional cradle ceremony decorations',
    image: '/images/birthdays/vuyyala.jpg'
  },
  {
    id: 'corporate-event',
    title: 'Corporate Event',
    description: 'Professional birthday celebrations for corporate settings',
    image: '/images/birthdays/corporate-event.jpg'
  },
  {
    id: 'days',
    title: 'Days',
    description: 'Theme-based birthday day celebrations',
    image: '/images/birthdays/days.jpg'
  },
  {
    id: 'cloth-decoration',
    title: 'Cloth Decoration',
    description: 'Beautiful fabric decorations for birthday venues',
    image: '/images/birthdays/cloth-decoration.jpg'
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

const Birthdays = () => (
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
          Birthday Services
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Make every birthday memorable with our specialized celebration services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {birthdayServices.map((service, index) => (
          <motion.div
            key={service.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardMotion}
            className="group relative bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-pink-500/50 transition-all duration-300"
          >
            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
              <FaBirthdayCake className="text-6xl text-pink-500/30" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-pink-400 transition-colors">
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

export default Birthdays;
