import React from 'react';
import DsquareLogoImage from '../../Navbar/Dsquare-logo.png';

const DsquareLogo = () => {
  return (
    <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 pt-3 sm:pt-4 md:pt-5 lg:pt-6">
      {/* Logo Circle with Dsquare Logo Image */}
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 overflow-hidden flex-shrink-0">
        {/* Circle Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-black rounded-full shadow-lg shadow-gray-900/50"></div>
        
        {/* Dsquare Logo Image */}
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <img 
            src={DsquareLogoImage} 
            alt="DSquare Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Decorative Ring */}
        <div className="absolute inset-0 border-2 border-yellow-300 rounded-full scale-110 opacity-50"></div>
      </div>
      
      {/* DSquare Events Text */}
      <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight whitespace-nowrap">
        <span className="text-yellow-400">D<sup className="text-lg sm:text-2xl md:text-4xl lg:text-5xl">2</sup></span>EVENTS
      </span>
    </div>
  );
};

export default DsquareLogo;
