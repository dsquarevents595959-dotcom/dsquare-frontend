import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URLS, API_BASE } from '../../lib/api';

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
      setErrorMessage('Please fill in all required fields');
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Use the EMAIL endpoint which sends emails
      const emailEndpoint = process.env.NODE_ENV === 'production' 
        ? 'https://dsquare-backend-dygo.onrender.com/api/email/send-contact'
        : 'http://localhost:5000/api/email/send-contact';
      
      console.log('Submitting to:', emailEndpoint);
      console.log('Form data:', formData);

      const response = await axios.post(emailEndpoint, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response:', response.data);
      
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        setErrorMessage(response.data.message || 'Failed to submit form');
        setSubmitStatus('error');
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMsg = 'There was an error submitting the form. Please try again later.';
      
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.response?.data?.errors) {
        errorMsg = error.response.data.errors.join(', ');
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      setErrorMessage(errorMsg);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 sm:py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 px-1">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-500">Contact Us</p>
          <h2 className="mt-10 text-3xl sm:text-4xl font-bold text-slate-900">Get in Touch with Us</h2>
          <p className="mt-4 text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have questions, feedback, or partnership ideas—our team is here to help. Reach out and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[32px] overflow-hidden shadow-xl bg-white">
            <iframe
              title="D Square Events Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61206.55595404956!2d80.66662759825381!3d16.50539905196631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb49fd74c0bd%3A0x4d046f426f751bf9!2sD%20SQUARE%20EVENTS!5e0!3m2!1sen!2sin!4v1776234318145!5m2!1sen!2sin"
              className="w-full h-[420px]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="rounded-[32px] bg-white p-6 sm:p-8 shadow-xl">
            {submitStatus === 'success' ? (
              <div className="mb-6 rounded-lg bg-green-100 p-4 text-green-700" role="alert">
                <strong className="font-semibold">Thank you!</strong>
                <p className="mt-1">Your message has been sent successfully. Redirecting to home page...</p>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700" role="alert">
                <strong className="font-semibold">Error!</strong>
                <p className="mt-1">{errorMessage || 'There was an error sending your message. Please try again later.'}</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  placeholder="+91-9876543210"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                  placeholder="Write your message here"
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600"><span className="text-red-500">*</span> Required fields</p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`rounded-xl bg-yellow-500 px-8 py-3 font-semibold text-white transition hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
