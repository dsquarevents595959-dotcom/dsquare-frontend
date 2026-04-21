module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx,html}'
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.8s ease-out',
        'fade-in-right': 'fadeInRight 0.8s ease-out',
        'gradient-x': 'gradientX 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(24px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeInLeft: {
          'from': {
            opacity: '0',
            transform: 'translateX(-40px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        fadeInRight: {
          'from': {
            opacity: '0',
            transform: 'translateX(40px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: 'left center' },
          '50%': { backgroundPosition: 'right center' },
        },
      },
    },
  },
  plugins: [],
};
