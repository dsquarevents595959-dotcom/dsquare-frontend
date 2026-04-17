import React from 'react';
import DsquareLogoImage from '../../Navbar/Dsquare-logo.png';

const DsquareLogo = () => {
  return (
    <div className="inline-flex flex-row items-center gap-2 md:gap-3 lg:gap-4 pt-6 sm:pt-8 md:pt-10 lg:pt-12 mt-14 sm:mt-12 md:mt-16 lg:mt-20">
      {/* Logo Circle with Dsquare Logo Image */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-40 lg:h-40 overflow-hidden flex-shrink-0">
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
      <span className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold leading-tight whitespace-nowrap">
        <span className="text-yellow-400">D<sup className="text-sm sm:text-lg md:text-2xl lg:text-5xl">2</sup></span>EVENTS
      </span>
    </div>
  );
};

export default DsquareLogo;
