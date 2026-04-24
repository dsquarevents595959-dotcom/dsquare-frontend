import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams, Link } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaCog,
  FaInfoCircle,
  FaIndustry,
  FaPhoneAlt,
  FaBookOpen,
  FaBriefcase,
  FaDatabase,
  FaRobot,
  FaCheckCircle,
  FaTools,
  FaServer,
  FaWarehouse,
  FaUserTie,
  FaGraduationCap,
  FaLightbulb,
  FaUsers,
  FaChalkboardTeacher,
  FaStar,
  FaChevronDown,
  FaShieldAlt,
  FaClock,
  FaUserGraduate,
  FaMicrophone,
  FaFire,
  FaBullhorn,
  FaFireAlt,
  FaPaperPlane,
  FaBolt,
  FaSnowflake,
  FaSmog,
  FaWind,
  FaBirthdayCake,
  FaMusic,
  FaShoppingCart
} from "react-icons/fa";
import { GiDiamondRing, GiFlowers, GiFireworkRocket } from "react-icons/gi";

import Logo from './Dsquare-logo.png';

const Navbar = () => {
  const [contactInfo, setContactInfo] = useState({
    phone: '+91 7032619629',
    email: 'dinesh@dsquarevents.com'
  });

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const apiUrl = `${process.env.NODE_ENV === 'production' ? 'https://dsquare-backend-dygo.onrender.com' : 'http://localhost:5000'}/api/contact/info`;
        console.log('Fetching contact info from:', apiUrl);
        
        const response = await fetch(apiUrl);
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          return;
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.success && data.data) {
          setContactInfo({
            phone: data.data.phone,
            email: data.data.email
          });
        }
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };

    // Initial fetch
    fetchContactInfo();

    // Listen for contact info updates from admin
    const handleContactInfoUpdate = (event) => {
      // console.log('Navbar received contactInfoUpdated event:', event);
      const updatedContactInfo = event.detail;
      if (updatedContactInfo) {
        // console.log('Updating Navbar contact info:', updatedContactInfo);
        setContactInfo({
          phone: updatedContactInfo.phone,
          email: updatedContactInfo.email
        });
      }
    };

    window.addEventListener('contactInfoUpdated', handleContactInfoUpdate);

    // Cleanup
    return () => {
      window.removeEventListener('contactInfoUpdated', handleContactInfoUpdate);
    };
  }, []);

  return (
    <header className="site-header fixed top-0 left-0 right-0 z-40 flex w-full flex-col bg-white shadow-md">
      {/* Top Info Bar */}
      <div className="flex flex-col sm:flex-row bg-purple-900 text-white text-xs sm:text-sm py-2 px-3 sm:px-6 justify-center items-center gap-2 sm:gap-4 lg:gap-8 flex-wrap">
        <a href={`tel:${contactInfo.phone}`} className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
          <FaPhoneAlt className="text-yellow-500" />
          <span>{contactInfo.phone}</span>
        </a>
        <div className="hidden md:flex items-center gap-2">
          <span>|</span>
        </div>
        <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
          <span>📧</span>
          <span>{contactInfo.email}</span>
        </a>
        <div className="hidden lg:flex items-center gap-2">
          <span>|</span>
        </div>
        <a 
          href="https://www.google.com/maps/search/D+Square+Events+Vijayawada/@16.5054,-80.6666,13z" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
        >
          <span>📍</span>
          <span>Andhra Pradesh, Vijayawada</span>
        </a>
      </div>
      {/* Divider Line */}
      <div className="h-px bg-white"></div>
      <NavbarContent />
    </header>
  );
};

const NavbarContent = () => {
  const [showServices, setShowServices] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth > 1024);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth > 1024;
      setIsDesktop(desktop);
      if (desktop) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Close all dropdowns when toggling menu
    if (menuOpen) {
      setShowAbout(false);
      setShowServices(false);
    }
  };

  const scrollToSection = (sectionId, closeMenu = true) => {
    const headerOffset = isDesktop ? 148 : 120;
    const performScroll = (attempt = 0) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementTop =
          element.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: elementTop > 0 ? elementTop : 0, behavior: "smooth" });
      } else if (attempt < 5) {
        setTimeout(() => performScroll(attempt + 1), 120);
      }
    };

    if (closeMenu) {
      setShowAbout(false);
      setShowServices(false);
      setMenuOpen(false);
    }

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => performScroll(), 360);
    } else {
      performScroll();
    }
  };

  
  
  const scrollToServiceCard = (serviceId) => {
    // Close the menu and dropdowns
    setMenuOpen(false);
    setShowServices(false);
    
    // If not on home page, navigate to home first
    if (location.pathname !== "/") {
      navigate("/", { 
        state: { scrollToService: serviceId },
        replace: true
      });
      return;
    }

    // If already on home page, scroll to the service
    const element = document.getElementById(`service-${serviceId}`);
    if (element) {
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Add highlight effect
      element.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
      
      // Remove highlight after some time
      setTimeout(() => {
        element.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
      }, 3000);
    } else {
      // If service card not found, just scroll to services section
      scrollToSection("services");
    }
  };

  useEffect(() => {
    if (location.state?.scrollToService) {
      const serviceId = location.state.scrollToService;
      const scrollToElement = () => {
        const element = document.getElementById(`service-${serviceId}`);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });

          // Add highlight effect
          element.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
          
          // Remove highlight after some time
          setTimeout(() => {
            element.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
          }, 3000);

          // Clear the state to prevent re-scrolling
          window.history.replaceState({}, document.title);
        } else if (document.readyState === 'complete') {
          // If document is already loaded but element not found, try one more time after a delay
          setTimeout(() => {
            const el = document.getElementById(`service-${serviceId}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              // Add highlight effect
              el.classList.add("ring-4", "ring-yellow-500", "ring-opacity-70", "transition-all", "duration-1000", "shadow-lg", "z-10", "relative");
              // Remove highlight after some time
              setTimeout(() => {
                el.classList.remove("ring-4", "ring-yellow-500", "ring-opacity-70", "shadow-lg", "z-10", "relative");
              }, 3000);
            }
          }, 100);
        }
      };

      // Try scrolling immediately
      scrollToElement();

      // Add event listener for when the component mounts
      window.addEventListener('load', scrollToElement);

      // Cleanup
      return () => {
        window.removeEventListener('load', scrollToElement);
      };
    }
  }, [location.state]);

  return (
    <nav className="relative w-full border-b border-gray-200 bg-purple-900 px-3 sm:px-6 lg:px-8 py-2 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 min-h-[3.25rem] sm:min-h-16 relative">
          {/* Logo */}
          <div className="flex h-16 sm:h-20 shrink-0 items-center max-w-[42vw] sm:max-w-none">
            <Link to="/" className="block leading-none">
              <img
                src={Logo}
                alt="Dsquare Events"
                className="h-16 sm:h-20 md:h-24 w-auto object-contain object-left hover:scale-105 transition-transform"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-end">
            {/* Navigation items will be here */}
          </div>
          
          {/* Mobile Menu Button - Positioned on the right */}
          <div className="lg:hidden shrink-0">
            <button
              type="button"
              onClick={toggleMenu}
              className="rounded-lg p-2 text-2xl leading-none text-white hover:bg-gray-100 hover:text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
              aria-expanded={menuOpen}
              aria-label="Toggle menu"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Menu */}
          <ul
            className={`text-sm font-small z-[1001] lg:flex lg:items-center lg:gap-6 xl:gap-8 lg:static lg:w-auto lg:max-h-none lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none
            ${
              menuOpen
                ? "flex flex-col absolute left-0 right-0 top-full w-full max-h-[min(72vh,calc(100dvh-var(--header-stack-h)))] overflow-y-auto border-t border-gray-100 bg-white p-4 shadow-lg gap-1 sm:gap-2 sm:p-6"
                : "hidden lg:flex"
            }`}
          >

          {/* Home */}
          <Link
            to="/"
            className={`flex items-center gap-2 cursor-pointer rounded-lg py-2.5 lg:py-1 ${location.pathname === "/" ? "text-green-600" : "hover:text-green-600"}`}
          >
            <FaHome /> Home
          </Link>

          {/* About Us */}
          <div
            onMouseEnter={() => isDesktop && setShowAbout(true)}
            onMouseLeave={() => isDesktop && setShowAbout(false)}
            className="relative"
          >
            <div className="flex items-center cursor-pointer">
              <div 
                onClick={() => scrollToSection("about-us")}
                className={`flex items-center gap-2 cursor-pointer py-2.5 lg:py-1 ${menuOpen ? 'text-black' : 'text-white'} lg:text-white hover:text-green-600`}
              >
                <FaInfoCircle /> About Us
              </div>
              <FaChevronDown 
                className={`transition p-2 cursor-pointer ${menuOpen ? 'text-black' : 'text-white'} lg:text-white hover:text-green-600 ${showAbout ? "rotate-180" : ""}`}
                onClick={() => !isDesktop && setShowAbout(!showAbout)}
              />
            </div>
          </div>
          {/* Services */}
          <div
            onMouseEnter={() => isDesktop && setShowServices(true)}
            onMouseLeave={() => isDesktop && setShowServices(false)}
            className="relative"
          >
            <div 
              className={`flex items-center gap-2 cursor-pointer py-2.5 lg:py-1 ${menuOpen ? 'text-black' : 'text-white'} lg:text-white hover:text-green-600`}
              onClick={(e) => {
                e.stopPropagation();
                scrollToSection('services');
              }}
            >
              <FaCog /> Services
              <FaChevronDown 
                className={`transition ${showServices ? "rotate-180" : ""}`} 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowServices(!showServices);
                }}
              />
            </div>

            <ul
              className={`top-full w-full rounded-lg border border-gray-100 bg-white p-2 shadow-xl transition-all z-50 lg:absolute lg:left-0 lg:w-64 lg:border-0
              ${showServices ? "opacity-100 visible translate-y-0" : "hidden lg:block lg:pointer-events-none lg:opacity-0 lg:invisible lg:-translate-y-3"}`}
              style={{ zIndex: 1002, maxHeight: "min(55vh, 24rem)", overflowY: "auto" }}
            >
              <li className="p-2 hover:bg-green-100 text-gray-900 flex items-center gap-2" onClick={() => scrollToServiceCard("cloud-effects")}>
                <GiDiamondRing className="text-yellow-500" /> Weddings
              </li>
              <li className="p-2 hover:bg-green-100 text-gray-900 flex items-center gap-2" onClick={() => scrollToServiceCard("luxury-wedding")}>
                <FaBirthdayCake className="text-pink-500" /> Birthdays
              </li>
              <li className="p-2 hover:bg-green-100 text-gray-900 flex items-center gap-2" onClick={() => scrollToServiceCard("grand-entry")}>
                <FaMicrophone className="text-amber-700" /> Grand Entry
              </li>
              <li className="p-2 hover:bg-green-100 text-gray-900 flex items-center gap-2" onClick={() => scrollToServiceCard("venue-decoration")}>
                <FaMusic className="text-purple-500" /> DJ & Lighting & Visual
              </li>
              <li className="p-2 hover:bg-green-100 text-gray-900 flex items-center gap-2" onClick={() => scrollToServiceCard("fireworks")}>
                <GiFireworkRocket className="text-red-500" /> Entertainment & Fireworks
              </li>
              <li className="p-2 hover:bg-green-100 text-gray-900 flex items-center gap-2" onClick={() => scrollToServiceCard("sound-light")}>
                <FaShoppingCart className="text-orange-500" /> Stalls
              </li>
            </ul>
          </div>

          </ul>
        </div>
      </nav>
  );
};

export default Navbar;
