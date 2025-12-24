import React from 'react';
import { Link } from 'react-router-dom';
// If you don't have these components yet, I've added a fallback below
// import { HeroBookingWidget } from './HeroBookingWidget'; 

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0">
        <img
          src="/561601915_122106831063028391_138386498224499306_n.jpg"
          alt="Luxury beach villa with ocean view"
          className="w-full h-full object-cover blur-[2px]"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914'; }}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full px-[28px]">
        <div className="max-w-full space-y-10">
          <div className="text-center text-white">
            <img
              src="/Casa Filomena Logo-White.png"
              alt="Casa Filomena Logo"
              className="w-auto h-48 md:h-96 mx-auto drop-shadow-2xl"
            />
            <p className="text-xl md:text-2xl mb-8 font-light font-gideon">
              Two exclusive luxury villas where the ocean meets paradise
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-center">
            <Link
              to="/villas"
              className="bg-[#8b5e3c] opacity-90 text-white text-md px-6 py-2 rounded-[2px] hover:opacity-100 transition-all font-medium shadow-xl"
            >
              Explore All Villas
            </Link>
            <Link
              to="/location"
              className="bg-[#8b5e3c] opacity-90 text-white text-md px-6 py-2 rounded-[2px] hover:opacity-100 transition-all font-medium shadow-xl"
            >
              Where We Are
            </Link>
          </div>

          {/* Booking Widget Placeholder */}
          <div className="w-full max-w-4xl mx-auto mt-12 bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
             <p className="text-white text-center italic">Check Availability Widget coming soon...</p>
             {/* Once you create HeroBookingWidget.jsx, uncomment the import and use <HeroBookingWidget /> here */}
          </div>
        </div>
      </div>
    </section>
  );
}