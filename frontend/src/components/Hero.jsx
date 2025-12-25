import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { HeroBookingWidget } from './HeroBookingWidget';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef();
  const bgRef = useRef();

  useGSAP(() => {
    // This creates the "Parallax" effect where the image moves 
    // at a different speed than the scroll
    gsap.to(bgRef.current, {
      yPercent: 20, // Moves the image down slightly as you scroll
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top", 
        end: "bottom top",
        scrub: true // Ties the movement directly to the scrollbar
      }
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          ref={bgRef}
          src="/561601915_122106831063028391_138386498224499306_n.jpg"
          alt="Luxury beach villa with ocean view"
          className="w-full h-[120%] object-cover blur-[2px] scale-110" // h-[120%] gives space for the image to move
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

          <HeroBookingWidget/>
        </div>
      </div>
    </section>
  );
}