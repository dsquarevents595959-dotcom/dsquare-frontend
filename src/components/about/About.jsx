import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaFire, FaCalendarAlt, FaMagic, FaCertificate } from 'react-icons/fa';

const MotionLink = motion.create(Link);

const statsData = [
  { label: 'Events Delivered', value: 2000 },
  { label: 'Yrs Of Experience', value: 12 },
  { label: 'Happy Clients', value: 1900 },
  { label: 'Trusted Partners', value: 60 },
];

const About = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const duration = 1200;
    const frameRate = 24;
    const totalFrames = Math.round((duration / 1000) * frameRate);

    let frame = 0;
    const startCounts = statsData.map(() => 0);
    const endCounts = statsData.map((stat) => stat.value);

    const animate = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const updated = endCounts.map((end, index) =>
        Math.round(startCounts[index] + (end - startCounts[index]) * progress)
      );
      setCounts(updated);

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, []);

  return (
    <section id="about-us" className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950/95" />
        <div className="absolute left-[-10%] top-0 h-full w-1/2 bg-white/5 blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div className="relative">
            <div className="absolute left-0 top-0 h-40 w-40 rounded-[40px] bg-emerald-800/80 blur-2xl" />
            <div className="absolute right-0 top-24 h-44 w-44 rounded-[40px] bg-cyan-600/70 blur-2xl" />
            <div className="relative space-y-8">
              <motion.div
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="max-w-md rounded-[40px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
              >
                <div className="text-sm uppercase tracking-[0.35em] text-emerald-300">01</div>
                <h3 className="mt-4 text-xl font-semibold text-white">Custom Event Decor & Styling</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  We create immersive décor themes and elegant setups tailored to your event style.
                </p>
              </motion.div>

              <motion.div
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="max-w-md rounded-[40px] border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl"
              >
                <div className="text-sm uppercase tracking-[0.35em] text-slate-400">02</div>
                <h3 className="mt-4 text-xl font-semibold text-white">End-To-End Event Coordination</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  From planning to execution, we ensure every detail is handled with precision.
                </p>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ x: 60, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="space-y-8"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-red-500">About Us</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Inspiring Moments, Flawlessly Executed Events
              </h2>
              <p className="mt-6 text-base leading-8 text-slate-300 sm:text-lg">
                At D Square Events, we transform your vision into reality with expert event management. From creative concept design to meticulous planning and flawless execution, we create extraordinary experiences tailored to your unique needs.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-400 sm:text-lg">
                With over a decade of expertise, we manage every detail—logistics, decor, vendor coordination, and more—to make your event unforgettable.
              </p>
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
              >
                <MotionLink
                  to="/readmore"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-3 text-sm font-semibold text-white shadow-xl shadow-red-600/20 transition hover:bg-red-700"
                >
                  Read More
                </MotionLink>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 rounded-[40px] border border-white/10 bg-slate-950/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <div key={stat.label} className="rounded-3xl bg-white/5 p-8 text-center shadow-xl border border-white/5">
                <div className="text-4xl font-bold text-white">
                  {counts[index]}+
                </div>
                <div className="mt-3 text-sm uppercase tracking-[0.35em] text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
