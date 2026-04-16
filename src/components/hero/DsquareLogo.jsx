import React from 'react';
import DsquareLogoImage from '../../Navbar/Dsquare-logo.png';

const DsquareLogo = () => {
  return (
    <div className="inline-flex items-center gap-3">
      {/* Logo Circle with Dsquare Logo Image */}
      <div className="relative w-20 h-24 md:w-23 md:h-23">
        {/* Circle Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg shadow-yellow-500/30"></div>
        
        {/* Dsquare Logo Image */}
        <div className="absolute inset-0 flex items-center justify-center p-3">
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
      <span className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
        <span className="text-yellow-400">DSquare</span> Events
      </span>
    </div>
  );
};

export default DsquareLogo;
