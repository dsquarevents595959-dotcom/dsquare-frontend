import React from 'react';
import DsquareLogoImage from '../../Navbar/Dsquare-logo.png';

const DsquareLogo = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-10 pt-6 sm:pt-10 md:pt-14 mt-6 sm:mt-12 md:mt-20 text-center sm:text-left">

      {/* Logo */}
      <div className="relative w-[clamp(60px,12vw,180px)] h-[clamp(60px,12vw,180px)] flex-shrink-0 group">

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-yellow-500/10 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

        {/* Circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-yellow-700 to-black rounded-full shadow-xl shadow-yellow-500/30"></div>

        {/* Image */}
        <div className="absolute inset-0 flex items-center justify-center p-3 transition-transform duration-500 group-hover:scale-110">
          <img 
            src={DsquareLogoImage} 
            alt="DSquare Logo" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Ring */}
        <div className="absolute inset-0 border border-yellow-300 rounded-full scale-110 opacity-70 animate-pulse"></div>
      </div>

      {/* Text */}
      <div className="flex flex-col items-center sm:items-start">

        {/* Heading */}
        <h1
          className="font-black leading-tight"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(24px, 6vw, 72px)",
            letterSpacing: "0.05em"
          }}
        >
          <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent">
            D
            <sup
              style={{
                fontSize: "clamp(10px, 2vw, 28px)",
                position: "relative",
                top: "-0.4em"
              }}
              className="text-yellow-400"
            >
              2
            </sup>
          </span>
          <span className="text-white mr-5">EVENTS</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-yellow-300 font-semibold mt-4"
          style={{
            fontSize: "clamp(10px, 2.5vw, 18px)",
            letterSpacing: "0.15em",
            fontFamily: "'Playfair Display', serif"
          }}
        >
          Premium Event Solutions 🎉
        </p>

      </div>
    </div>
  );
};

export default DsquareLogo;