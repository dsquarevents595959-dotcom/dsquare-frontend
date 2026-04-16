import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GiFlowers, GiFlowerPot, GiRingBox } from 'react-icons/gi';
import { FaArrowLeft } from 'react-icons/fa';

const grandEntryServices = [
  {
    id: 'flower-decoration',
    title: 'Flower Decoration',
    description: 'Beautiful floral arrangements for grand entrance',
    image: '/images/grand-entry/flower-decoration.jpg'
  },
  {
    id: 'haldi-flower-decoration',
    title: 'Haldi Flower Decoration',
    description: 'Traditional haldi ceremony with vibrant flowers',
    image: '/images/grand-entry/haldi-decoration.jpg'
  },
  {
    id: 'mehandi-flower-decoration',
    title: 'Mehandi Flower Decoration',
    description: 'Elegant mehandi ceremony adorned with flowers',
    image: '/images/grand-entry/mehandi-decoration.jpg'
  },
  {
    id: 'reception-flower-decoration',
    title: 'Reception Flower Decoration',
    description: 'Stunning reception venue floral decorations',
    image: '/images/grand-entry/reception-decoration.jpg'
  },
  {
    id: 'half-saree-decoration',
    title: 'Half Saree Flower Decoration',
    description: 'Traditional half saree ceremony with floral themes',
    image: '/images/grand-entry/half-saree-decoration.jpg'
  },
  {
    id: 'cloth-decoration',
    title: 'Cloth Decoration',
    description: 'Luxurious fabric and cloth decorations',
    image: '/images/grand-entry/cloth-decoration.jpg'
  },
  {
    id: 'passage-decoration',
    title: 'Passage Decoration',
    description: 'Beautifully decorated walkways and passages',
    image: '/images/grand-entry/passage-decoration.jpg'
  },
  {
    id: 'arch-decoration',
    title: 'Arch Decoration',
    description: 'Stunning ceremonial arches and entryways',
    image: '/images/grand-entry/arch-decoration.jpg'
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

const GrandEntry = () => (
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
          Grand Entry Services
        </h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto">
          Make a spectacular entrance with our grand entry decoration services
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {grandEntryServices.map((service, index) => (
          <motion.div
            key={service.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardMotion}
            className="group relative bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-amber-500/50 transition-all duration-300"
          >
            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
              <GiFlowers className="text-6xl text-amber-500/30" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
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

export default GrandEntry;
