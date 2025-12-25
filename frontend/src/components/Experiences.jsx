import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Data can be moved to a separate JSON or fetched from your MongoDB later
const experienceData = [
  {
    title: "Function & Event Hosting",
    description: "Whether it is an intimate garden wedding or a high-level corporate retreat, our spaces are designed to inspire connection and celebration.",
    image: "/functions.jpg", 
    link: "/services/functions"
  },
  {
    title: "Filomena Garden Café",
    description: "Dine amidst lush greenery. Our café offers a farm-to-table experience that celebrates local flavours in a tranquil, open-air setting.",
    image: "/3.jpg", 
    link: "/services/cafe"
  }
];

export default function Experiences() {
  const containerRef = useRef();

  useGSAP(() => {
    // Elegant reveal animation for the cards
    gsap.from(".experience-card", {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", // Triggers when the top of the section is 75% down the screen
      }
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="py-32 bg-[#FAF9F6] px-6 md:px-20"
      id="experiences"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Mimicking the Banyan Tree minimal luxury style */}
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 tracking-tight">
            Curated Experiences
          </h2>
          <div className="w-20 h-[1px] bg-yellow-800" />
        </div>

        {/* The Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {experienceData.map((item, idx) => (
            <div key={idx} className="experience-card group">
              
              {/* Image with luxury hover effect */}
              <div className="relative overflow-hidden mb-8 aspect-[16/10] shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Textual Content */}
              <div className="max-w-md">
                <h3 className="text-2xl font-serif text-gray-800 mb-4 group-hover:text-yellow-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed mb-6">
                  {item.description}
                </p>
                <a 
                  href={item.link}
                  className="inline-block text-xs uppercase tracking-[0.25em] font-bold text-gray-900 border-b border-gray-300 pb-2 group-hover:border-yellow-800 transition-all"
                >
                  Explore Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}