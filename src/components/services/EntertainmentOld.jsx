import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMicrophone, FaMusic, FaGuitar, FaMagic } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

const entertainmentServices = [
  {
    id: 'anchor',
    title: 'Anchor',
    description: 'Professional event anchors and hosts for your special occasions',
    image: '/images/entertainment/anchor.jpg'
  },
  {
    id: 'dancers',
    title: 'Dancers',
    description: 'Talented dance performers for entertainment shows',
    image: '/images/entertainment/dancers.jpg'
  },
  {
    id: 'singers',
    title: 'Singers',
    description: 'Professional singers for live performances',
    image: '/images/entertainment/singers.jpg'
  },
  {
    id: 'live-band',
    title: 'Live Band',
    description: 'Complete live band setup for musical entertainment',
    image: '/images/entertainment/live-band.jpg'
  },
  {
    id: 'magician',
    title: 'Magician',
    description: 'Amazing magic shows to entertain your guests',
    image: '/images/entertainment/magician.jpg'
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

const Entertainment = () => (
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
          Entertainment Services
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Professional entertainment options to make your event unforgettable
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {entertainmentServices.map((service, index) => (
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
              <FaMusic className="text-6xl text-purple-500/30" />
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

export default Entertainment;
