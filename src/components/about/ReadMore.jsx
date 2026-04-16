import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';
import Logo1 from './Readmore image.jpeg';

const ReadMore = () => {
  const { category } = useParams();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (category) {
      fetchCategoryCards();
    } else {
      setLoading(false);
    }
  }, [category]);

  const fetchCategoryCards = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/service-cards/${category}`);
      const result = await response.json();
      if (result.success) {
        setCards(result.data);
      }
    } catch (error) {
      console.error('Failed to fetch cards:', error);
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

  const categoryTitles = {
    'weddings': 'Wedding Services',
    'birthdays': 'Birthday Celebrations',
    'grand-entry': 'Grand Entry',
    'entertainment': 'Entertainment',
    'stalls': 'Stalls & Setup',
    'dj-lighting-visual': 'DJ, Lighting & Visual'
  };

  // If category is provided, show category cards
  if (category) {
    return (
      <main className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white">
        <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
          <div className="mb-8">
            <Link to="/#services" className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors">
              <FaArrowLeft />
              Back to Services
            </Link>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {categoryTitles[category] || category}
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Explore our premium {categoryTitles[category]?.toLowerCase() || 'services'}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <p className="text-slate-400 mt-2">Loading services...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={card._id}
                  custom={index * 0.1}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={cardMotion}
                  className="group relative bg-slate-900/90 rounded-2xl border border-white/10 overflow-hidden shadow-2xl hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="bg-gradient-to-br from-slate-800 to-slate-700">
                    {card.mediaType === 'image' ? (
                      <img 
                        src={card.mediaUrl} 
                        alt={card.cardTitle}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-700">
                        <span className="text-4xl">🎬</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                      {card.cardTitle}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {card.cardDescription}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && cards.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-400 text-lg">No services available at the moment.</p>
            </div>
          )}
        </div>
      </main>
    );
  }

  // Default ReadMore page with static content
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link to="/" className="text-sm font-semibold text-slate-300 hover:text-white">
            ← Back to Home
          </Link>
          <p className="text-sm uppercase tracking-[0.35em] text-red-500">Read More</p>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-white/10 shadow-2xl">
          <img
            src={Logo1}
            alt="Event celebration"
            className="w-full object-cover max-h-[520px]"
          />
        </div>

        <div className="mt-10 max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Inspiring Moments, Flawlessly Executed Events
          </h1>
          <p className="text-lg leading-9 text-slate-300">
            At D Square Events, we transform your vision into reality with expert event management. From creative concept design to meticulous planning and flawless execution, we create extraordinary experiences tailored to your unique needs.
          </p>
          <p className="text-lg leading-9 text-slate-300">
            Our team works with you every step of the way to build immersive celebrations that leave a lasting impression. Whether it's a wedding, corporate gala, or private party, we ensure your event feels seamless, elevated, and perfectly aligned with your brand.
          </p>
          <p className="text-lg leading-9 text-slate-300">
            With over a decade of experience in event production, we manage every detail—from décor and entertainment to logistics and vendor coordination—so you can relax and enjoy the moment.
          </p>
          <p className="text-lg leading-9 text-slate-300">
            Our creative teams specialize in stunning visual experiences, custom atmospheres, and unforgettable storytelling through lighting, design, and entertainment.
          </p>
        </div>
      </div>
    </main>
  );
};

export default ReadMore;
