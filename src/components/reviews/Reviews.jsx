import React, { useEffect, useState } from 'react';
import { FaStar, FaThumbsUp, FaComment, FaShareAlt, FaChevronLeft, FaChevronRight, FaEllipsisV } from 'react-icons/fa';

const reviews = [
  {
    name: 'Shivaprasad',
    date: '02 Feb',
    rating: 5,
    quote: 'Very good maintainance',
    response: 'Thanks for the feedback on upkeep.',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'RAJU',
    date: '04 Feb',
    rating: 5,
    quote: 'Good response.',
    response: 'Thank you so much for positive review',
    avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Krishna',
    date: '04 Feb',
    rating: 5,
    quote: 'Good for all events.',
    response: 'Good to hear, thank you so much for positive response',
    avatar: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Revanth Reddy',
    date: '08 Apr',
    rating: 5,
    quote: 'Excellent Services.',
    response: 'Thank you so much sir',
    avatar: 'https://images.unsplash.com/photo-1519264196197-38c14b5f2f62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Sneha Medipalli',
    date: '02 Feb',
    rating: 5,
    quote: 'Simply amazing we had a wonderful experience',
    response: 'Thank you so much for positive feedback.',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Naji',
    date: '04 Feb',
    rating: 5,
    quote: "Good attitude and good manners and excellent event`s",
    response: 'Thank you so much for your positive comments',
    avatar: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
  },
];

const Reviews = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const goPrevious = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const review = reviews[current];

  return (
    <section id="reviews" className="py-16 bg-slate-100 text-slate-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-yellow-500">Excellent</p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-1 text-yellow-500">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-700">Based on 56 reviews</span>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-slate-900">Google</span>
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl rounded-[32px] bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
          <div className="absolute left-0 inset-y-0 flex items-center">
            <div className="h-24 w-px bg-slate-200" />
            <button
              onClick={goPrevious}
              className="relative -left-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg shadow-slate-200 transition hover:bg-slate-50"
              aria-label="Previous review"
            >
              <FaChevronLeft />
            </button>
          </div>

          <div className="absolute right-0 inset-y-0 flex items-center justify-end">
            <div className="h-24 w-px bg-slate-200" />
            <button
              onClick={goNext}
              className="relative -right-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg shadow-slate-200 transition hover:bg-slate-50"
              aria-label="Next review"
            >
              <FaChevronRight />
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-start">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={review.avatar} alt={review.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{review.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <p>{review.date}</p>
                  <FaEllipsisV />
                </div>
              </div>

              <div className="flex items-center gap-1 text-orange-500">
                {[...Array(review.rating)].map((_, index) => (
                  <FaStar key={index} />
                ))}
              </div>

              <p className="text-2xl font-semibold tracking-tight text-slate-900">“{review.quote}”</p>

              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-slate-900 text-white grid place-items-center text-sm font-semibold">
                    DSE
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">D Square Events</p>
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
                      Owner Response
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{review.response}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6 rounded-[32px] border border-slate-200 bg-slate-50 p-6">
              <div className="text-sm uppercase tracking-[0.35em] text-slate-500">Review #{current + 1}</div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Helpful</p>
                  <p className="mt-2 text-sm text-slate-600">Let others know this review helped you.</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Comment (1)</p>
                  <p className="mt-2 text-sm text-slate-600">Share your thoughts on this review.</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">Share</p>
                  <p className="mt-2 text-sm text-slate-600">Spread this review on social channels.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 w-2.5 rounded-full ${current === index ? 'bg-slate-900' : 'bg-slate-300'}`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700">
            Verified by Trustindex
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
