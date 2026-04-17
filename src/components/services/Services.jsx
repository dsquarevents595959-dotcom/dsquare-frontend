import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMicrophone, FaFire, FaBullhorn, FaBirthdayCake, FaMusic, FaShoppingCart } from 'react-icons/fa';
import { GiDiamondRing, GiFlowers, GiFireworkRocket } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import Logo2 from '../services/Dsquare.jpeg';

const services = [
  {
    id: 'Weddings',
    icon: <GiDiamondRing className="text-4xl text-yellow-500" />,
    title: 'Weddings',
    description: 'We design stylish and memorable social gatherings tailored to your theme and taste.',
    link: '/readmore/weddings'
  },
  {
    id: 'Birthdays',
    icon: <FaBirthdayCake className="text-4xl text-pink-500" />,
    title: 'Birthdays',
    description: 'From mandap to reception, we turn your wedding dreams into breathtaking reality.',
    link: '/readmore/birthdays'
  },
  {
    id: 'grand-entry',
    icon: <FaMicrophone className="text-4xl text-amber-700" />,
    title: 'Grand Entry',
    description: 'Elegant setups and seamless coordination to celebrate your love in style.',
    link: '/readmore/grand-entry'
  },
  {
    id: 'dj & visual & lighting',
    icon: <FaMusic className="text-4xl text-purple-500" />,
    title: 'DJ & Lighting & Visual',
    description: 'Creative themes and vibrant decor to make every birthday extra special.',
    link: '/readmore/dj-lighting-visual'
  },
  {
    id: 'Enterainment',
    icon: <GiFireworkRocket className="text-4xl text-red-500" />,
    title: 'Entertainment',
    description: 'Beautifully planned engagement ceremonies with personalized decor and charm.',
    link: '/readmore/entertainment'
  },
  {
    id: 'stalls',
    icon: <FaShoppingCart className="text-4xl text-orange-500" />,
    title: 'Stalls',
    description: 'Marketing, social promotions, and design materials to maximize visibility.',
    link: '/readmore/stalls'
  }
];

const cardMotion = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay, ease: 'easeOut' }
  })
};

const Services = () => (
  <section id="services" className="relative py-16 sm:py-20 lg:py-24 bg-slate-950 text-white overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.15),_transparent_45%)]" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.12),_transparent_35%)]" />

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-500">Our Services</p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          Event Services Crafted as a Connected Experience
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-base text-slate-300 sm:text-lg md:text-xl">
          Discover how each service works together like nodes in a network, delivering seamless execution from planning to celebration.
        </p>
      </div>

      <div className="relative rounded-[40px] border border-white/10 bg-slate-900/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle,_rgba(255,255,255,0.08),_transparent_40%)]" />
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-3">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardMotion}
              className={`rounded-[28px] border border-white/10 bg-slate-900/90 p-6 shadow-2xl ${
                index === 0 ? 'lg:col-start-1 lg:row-start-1' :
                index === 1 ? 'lg:col-start-3 lg:row-start-1' :
                index === 2 ? 'lg:col-start-1 lg:row-start-2' :
                index === 3 ? 'lg:col-start-3 lg:row-start-2' :
                index === 4 ? 'lg:col-start-1 lg:row-start-3' :
                index === 5 ? 'lg:col-start-3 lg:row-start-3' : ''
              }`}
            >
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-800 text-white shadow-lg shadow-slate-950/40">
                {service.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>
              <Link to={service.link} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-red-500">
                Read More →
              </Link>
            </motion.div>
          ))}

          <motion.div
            custom={6}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={cardMotion}
            className="lg:col-start-2 lg:row-start-2 flex flex-col items-center justify-center rounded-full border-2 border-red-500 bg-slate-900/95 p-10 shadow-2xl"
          >
            <div className="rounded-full border border-white/10 bg-blue-600 p-10 shadow-xl shadow-slate-950/20">
              <img src={Logo2} alt="Dsquare Events" className="h-30 w-30 rounded-full object-cover" />
            </div>
            <p className="mt-6 text-sm uppercase tracking-[0.35em] text-red-500">Dsquare Events</p>
            <p className="mt-3 text-center text-base font-semibold text-white">Your event partner for stunning experiences.</p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default Services;
