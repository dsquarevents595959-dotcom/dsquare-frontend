# Dsquare Events Frontend

A modern React application for the Dsquare Events website, showcasing services and customer reviews.

## Overview
This frontend has been refactored to remove all admin functionality and now serves as a clean, public-facing website that consumes data from a minimal backend API.

## Features
- **Services Showcase**: Display services by category (weddings, birthdays, grand entry, entertainment, stalls, DJ & lighting)
- **Customer Reviews**: Show customer testimonials and ratings
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Smooth animations with Framer Motion
- **Environment-based Configuration**: Separate configs for development and production

## Technology Stack
- React 19.2.0
- Vite 7.2.4
- Tailwind CSS 3.4.1
- React Router DOM 7.11.0
- Axios 1.13.2
- React Icons 5.5.0
- Framer Motion 12.38.0

## Environment Variables

### Development (.env.development)
```env
VITE_API_URL=http://localhost:5000
```

### Production (.env.production)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## Project Structure
```
src/
├── components/
│   ├── about/          # About section components
│   ├── contact/        # Contact form and info
│   ├── footer/         # Footer component
│   ├── hero/           # Hero section
│   ├── Navbar/         # Navigation bar
│   ├── reviews/        # Customer reviews
│   └── services/       # Service categories
├── assets/             # Static assets
├── styles/             # Custom styles
└── main.jsx            # App entry point
```

## Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## API Integration
The frontend consumes data from these backend endpoints:
- `GET /api/services/:category` - Fetch services by category
- `GET /api/reviews` - Fetch all active reviews

## Deployment
Configured for deployment on Vercel with automatic builds from GitHub.

### Vercel Configuration
- `vercel.json` handles routing for SPA
- Environment variables set in Vercel dashboard
- Automatic deployments on push to main branch

## Features Removed
- Admin dashboard and routes
- Authentication system
- File upload functionality
- Admin-only components
- Contact form submission (now uses frontend-only display)

## Development Setup
```bash
npm install
npm run dev
```

## Production Build
```bash
npm run build
npm run preview
```

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance
- Lazy loading for images
- Code splitting by route
- Optimized bundle with Vite
- Minimal dependencies
