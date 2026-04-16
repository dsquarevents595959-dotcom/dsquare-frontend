import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCookie, FaIceCream, FaCoffee, FaUtensils } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

const foodStallServices = [
  {
    id: 'popcorn-stalls',
    title: 'Popcorn Stalls',
    description: 'Fresh popcorn stalls with various flavors',
    image: '/images/food-stalls/popcorn.jpg'
  },
  {
    id: 'chocolate-fountain',
    title: 'Chocolate Fountain',
    description: 'Delicious chocolate fountain with dipping options',
    image: '/images/food-stalls/chocolate-fountain.jpg'
  },
  {
    id: 'breakfast',
    title: 'Breakfast',
    description: 'Complete breakfast arrangements',
    hasSubItems: true,
    subItems: [
      { name: 'Veg Breakfast', description: 'Vegetarian breakfast options' },
      { name: 'Non-Veg Breakfast', description: 'Non-vegetarian breakfast options' }
    ],
    image: '/images/food-stalls/breakfast.jpg'
  },
  {
    id: 'lunch',
    title: 'Lunch',
    description: 'Complete lunch arrangements',
    hasSubItems: true,
    subItems: [
      { name: 'Veg Lunch', description: 'Vegetarian lunch options' },
      { name: 'Non-Veg Lunch', description: 'Non-vegetarian lunch options' }
    ],
    image: '/images/food-stalls/lunch.jpg'
  },
  {
    id: 'snacks',
    title: 'Snacks',
    description: 'Variety of snack options',
    hasSubItems: true,
    subItems: [
      { name: 'Veg Snacks', description: 'Vegetarian snack options' },
      { name: 'Non-Veg Snacks', description: 'Non-vegetarian snack options' }
    ],
    image: '/images/food-stalls/snacks.jpg'
  },
  {
    id: 'dinner',
    title: 'Dinner',
    description: 'Complete dinner arrangements',
    hasSubItems: true,
    subItems: [
      { name: 'Veg Dinner', description: 'Vegetarian dinner options' },
      { name: 'Non-Veg Dinner', description: 'Non-vegetarian dinner options' }
    ],
    image: '/images/food-stalls/dinner.jpg'
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

const FoodStalls = () => (
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
          Complete food stall arrangements with veg and non-veg options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodStallServices.map((service, index) => (
          <motion.div
            key={service.id}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardMotion}
            className="group relative bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-green-500/50 transition-all duration-300"
          >
            <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-slate-800 to-slate-700 flex items-center justify-center">
              {service.id === 'popcorn-stalls' && <FaCookie className="text-6xl text-green-500/30" />}
              {service.id === 'chocolate-fountain' && <FaIceCream className="text-6xl text-green-500/30" />}
              {(service.id === 'breakfast' || service.id === 'lunch' || service.id === 'snacks' || service.id === 'dinner') && <FaUtensils className="text-6xl text-green-500/30" />}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              {service.hasSubItems && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-green-500 uppercase tracking-wider">Options:</p>
                  <div className="space-y-1">
                    {service.subItems.map((subItem, subIndex) => (
                      <div key={subIndex} className="flex items-center justify-between text-xs text-slate-400">
                        <span>{subItem.name}</span>
                        <span className="text-slate-500">-</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FoodStalls;
