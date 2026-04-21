import React, { useState } from 'react';
import { FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Open Instagram in a new tab
    window.open('https://www.instagram.com/dsquare_events_?utm_source=qr&igsh=dWM2YWd2Y2dsaXQ1', '_blank');
    // Update subscription status to show 'Subscribed'
    setIsSubscribed(true);
    
    // Revert back to 'Subscribe Now' after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000);
  };
  return (
    <footer className="bg-gray-900 text-gray-400 py-10 sm:py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-10">
          <div>
            <h3 className="text-white text-lg font-bold mb-4" style={{ fontFamily: "'Helvatica', 'Arial Black', sans-serif" }}>DSquareEvents</h3>
            <p className="text-sm leading-relaxed" style={{ fontFamily: "'Helvatica', sans-serif" }}>
              Dsquarevents is a professional event management service specializing in creating memorable celebrations and experiences.
We handle everything from planning to execution, including decorations, entertainment, and logistics.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4" style={{ fontFamily: "'Helvatica', 'Arial Black', sans-serif" }}>Quick Links</h4>
            <ul className="space-y-2" style={{ fontFamily: "'Helvatica', sans-serif" }}>
              {['Home', 'About Us', 'Services', 'Events', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="hover:text-yellow-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4" style={{ fontFamily: "'Helvatica', 'Arial Black', sans-serif" }}>Our Services</h4>
            <ul className="space-y-2" style={{ fontFamily: "'Helvatica', sans-serif" }}>
              {['Weddings', 'Birthdays', 'Corporate Events', 'Grand Entry', 'DJ, Lighting & Visual','Entertainment','Stalls'].map((service) => (
                <li key={service}>
                  <a href="#services" className="hover:text-yellow-500 transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4" style={{ fontFamily: "'Helvatica', 'Arial Black', sans-serif" }}>Newsletter</h4>
            <p className="text-sm mb-4" style={{ fontFamily: "'Helvatica', Arial Black" }}>Subscribe to our newsletter for the latest updates and offers.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <div className="flex items-center" style={{ fontFamily: "'Helvatica', Arial Black" }}>
                <FaInstagram className="mr-2 text-pink-500 text-xl" />
                <span>Follow us on Instagram</span>
              </div>
              <button 
                type="submit" 
                className={`flex items-center justify-center space-x-2 font-bold px-4 py-2 rounded-md transition-all duration-300 ${
                  isSubscribed 
                    ? 'bg-green-500 text-white transform scale-105' 
                    : 'bg-yellow-500 hover:bg-yellow-600 text-black hover:shadow-md'
                }`}
                style={{ fontFamily: "'Montserrat', 'Arial Black', sans-serif" }}
              >
                {isSubscribed ? 'Subscribed!' : 'Subscribe Now'}
              </button>
            </form>
          </div>
        </div>
        <div className="mt-6 text-sm text-center">
          <div className="border-t-2 border-white pt-4">
            <p className="mb-2" style={{ fontFamily: "'Montserrat', 'Arial Black', sans-serif" }}>&copy; {new Date().getFullYear()} DSquareEvents. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
