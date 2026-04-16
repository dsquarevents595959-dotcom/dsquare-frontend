import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
  FaArrowRight
} from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-12 bg-slate-50 text-slate-900">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-500">Contact Us</p>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">Get in Touch with Us</h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed">
            We'd love to hear from you. Whether you have questions, feedback, or partnership ideas—our team is here to help. Reach out and we'll get back to you as soon as possible.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center mt-8 rounded-full bg-yellow-500 px-8 py-3 text-sm font-semibold text-black shadow-lg transition hover:bg-yellow-600"
          >
            Ask a Question <FaArrowRight className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
            <p className="text-gray-600 mb-6">
              Have an event coming up? Reach out today and our team will help you make it unforgettable.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-yellow-500 text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold">Our Location</h4>
                  <p className="text-gray-600">2nd floor, Ganesh Rd poojitha residency, D. No- #61-22/1-1, beside janasena party office, near padavalarevu, ramalingeswaranagar, Vijayawada, Andhra Pradesh 520013</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaPhone className="text-yellow-500 text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-gray-600">+91 7032619629</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FaEnvelope className="text-yellow-500 text-2xl mt-1" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-gray-600">dsquarevents595959@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-700 p-8 text-white shadow-xl">
            <h3 className="text-2xl font-semibold mb-4">Need More Help?</h3>
            <p className="text-gray-300 mb-6">
              Our team is ready to answer your questions and help you plan the perfect event.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://www.facebook.com/share/1AzLuChNq1/" target="_blank" rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 hover:bg-yellow-500 hover:text-black transition-colors">
                <FaFacebook />
              </a>
              <a href="https://wa.me/917032619629" target="_blank" rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 hover:bg-yellow-500 hover:text-black transition-colors">
                <FaWhatsapp />
              </a>
              <a href="https://www.instagram.com/dsquare_events_?utm_source=qr&igsh=dWM2YWd2Y2dsaXQ1" target="_blank" rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 hover:bg-yellow-500 hover:text-black transition-colors">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@DSQUARE.EVENTS.DANCE.5959" target="_blank" rel="noopener noreferrer"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 hover:bg-yellow-500 hover:text-black transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
