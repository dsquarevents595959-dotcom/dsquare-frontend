import { Routes, Route, useLocation } from "react-router-dom";
// import Detail from "./components/common/Detail";
import Navbar from "./Navbar/Navbar";
import Hero from "./components/hero/Hero";
// import Products from "./components/products/Products";
import About from "./components/about/About";
import Services from "./components/services/Services";
// import Gallery from "./components/Gallery/Gallery";
// import EventsPage from "./components/events/EventsPage";
import Contact from "./components/contact/Contact";
import Footer from "./components/footer/Footer";
import Reviews from "./components/reviews/Reviews";
// import ExecutiveTeam from "./components/Executive Team/ExecutiveTeam";
// import FAQSection from "./components/FAQ SECTION/Faq";
import ContactForm from "./components/contact/ContactForm";
import ReadMore from "./components/about/ReadMore";
import Weddings from "./components/services/Weddings";
import Birthdays from "./components/services/Birthdays";
import GrandEntry from "./components/services/GrandEntry";
import Entertainment from "./components/services/Entertainment";
import Stalls from "./components/services/Stalls";
import FoodStalls from "./components/services/FoodStalls";
import DjLightingVisual from "./components/services/DjLightingVisual";
// import AdminLogin from "./components/admin/AdminLogin";
// import AdminDashboard from "./components/admin/AdminDashboard";
// import CloudEffects from "./components/services/details/CloudEffects";
// import LuxuryWedding from "./components/services/details/LuxuryWedding";
// import GrandEntry from "./components/services/details/GrandEntry";
// import VenueDecoration from "./components/services/details/VenueDecoration";
// import Fireworks from "./components/services/details/Fireworks";
// import SoundLightVisual from "./components/services/details/SoundLightVisual";
// import ItemSelection from "./components/booking/ItemSelection";
// import ThankYou from "./components/booking/ThankYou";
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
                {/* <ExecutiveTeam /> */}
                {/* <Products /> */}
                <Services />
                {/* <Gallery /> */}
                <Reviews />
                {/* <FAQSection /> */}
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
          {/* <Route path="/admin/login" element={<AdminLogin />} /> */}
          {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
          {/* <Route path="/events" element={<EventsPage />} /> */}
          {/* <Route
            path="/select-items"
            element={
              <div className="min-h-[calc(100vh-4rem)]">
                <ItemSelection />
              </div>
            }
          /> */}
          {/* <Route path="/services/cloud-effects" element={<CloudEffects />} />
          <Route path="/services/luxury-wedding" element={<LuxuryWedding />} />
          <Route path="/services/grand-entry" element={<GrandEntry />} />
          <Route path="/services/venue-decoration" element={<VenueDecoration />} />
          <Route path="/services/fireworks" element={<Fireworks />} />
          <Route path="/services/sound-light-visual" element={<SoundLightVisual />} /> */}
          {/* <Route
            path="/events/:eventId"
            element={
              <div className="bg-white">
                <EventsPage />
              </div>
            }
          /> */}
          {/* <Route
            path="/thank-you"
            element={
              <div className="min-h-[calc(100vh-4rem)] bg-yellow-50">
                <ThankYou />
              </div>
            }
        /> */}
        </Routes>
      </main>
      {!isReadMoreRoute && <Footer />}
      {/* <Detail /> */}
      <ScrollToTop />
    </>
  );
};

export default MainSite;
