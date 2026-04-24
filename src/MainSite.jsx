import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Reviews from "./components/reviews/Reviews";
import ContactForm from "./components/contact/ContactForm";
import ReadMore from "./components/about/ReadMore";
import Weddings from "./components/services/Weddings";
import Birthdays from "./components/services/Birthdays";
import GrandEntry from "./components/services/GrandEntry";
import Entertainment from "./components/services/Entertainment";
import Stalls from "./components/services/Stalls";
import FoodStalls from "./components/services/FoodStalls";
import DjLightingVisual from "./components/services/DjLightingVisual";
import ScrollToTop from "./components/common/ScrollToTop";

const MainSite = () => {
  const location = useLocation();
  
  // Check if current path is a readmore route
  const isReadMoreRoute = location.pathname.startsWith('/readmore');
  
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Services />
                <Reviews />
                <Contact />
              </>
            }
          />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/readmore" element={<ReadMore />} />
          <Route path="/readmore/:category" element={<ReadMore />} />
          <Route path="/services/Weddings" element={<Weddings />} />
          <Route path="/services/birthdays" element={<Birthdays />} />
          <Route path="/services/grand-entry" element={<GrandEntry />} />
          <Route path="/services/entertainment" element={<Entertainment />} />
          <Route path="/services/dj-lighting-visual" element={<DjLightingVisual />} />
          <Route path="/services/stalls" element={<Stalls />} />
          <Route path="/services/stalls/food-stalls" element={<FoodStalls />} />
        </Routes>
      </main>
      {!isReadMoreRoute && <Footer />}
      <ScrollToTop />
    </>
  );
};

export default MainSite;
