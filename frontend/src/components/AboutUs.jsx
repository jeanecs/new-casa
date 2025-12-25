import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// 1. Sub-component for the luxurious auto-flashing images
function LuxuriousCarousel() {
  const containerRef = useRef();
  const images = ["/2.jpg", "/1.jpg", "/3.jpg"]; // Ensure these paths are correct

  useGSAP(() => {
    const slides = containerRef.current.children;
    
    // Set initial state: all images hidden except the first
    gsap.set(slides, { autoAlpha: 0, scale: 1, zIndex: 1 });
    gsap.set(slides[0], { autoAlpha: 1, scale: 1.1, zIndex: 2 });

    const tl = gsap.timeline({ repeat: -1 });

    // Faster speed and smoother crossfade
    const visibleDuration = 3.5; // seconds image is fully visible
    const fadeDuration = 1.2; // seconds for fade in/out
    images.forEach((_, i) => {
      const nextI = (i + 1) % images.length;
      // Only zoom out the current image, next image appears at scale 1.1 and zooms out to 1
      tl.to(slides[i], {
        scale: 1,
        duration: visibleDuration + fadeDuration,
        ease: "power1.out"
      }, i * (visibleDuration + fadeDuration))
      // Fade out current and fade in next at the same time for smooth crossfade
      .to(slides[i], { autoAlpha: 0, duration: fadeDuration, ease: "power2.inOut" }, (i + 1) * (visibleDuration + fadeDuration) - fadeDuration)
      .set(slides[nextI], { scale: 1.1 }, (i + 1) * (visibleDuration + fadeDuration) - fadeDuration)
      .to(slides[nextI], { autoAlpha: 1, duration: fadeDuration, ease: "power2.inOut" }, (i + 1) * (visibleDuration + fadeDuration) - fadeDuration);
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square overflow-hidden"
      style={{ maxWidth: '100%' }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform"
          style={{
            backgroundImage: `url(${src})`,
            zIndex: i === 0 ? 2 : 1
          }}
        />
      ))}
      {/* Subtle luxury overlay */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none" />
    </div>
  );
}

// 2. Main AboutUs Component
export default function AboutUs() {
  const sectionRef = useRef();
  const carouselWrapperRef = useRef();
  const textRef = useRef();

  useGSAP(() => {
    // Scroll Animation for the Carousel Wrapper (Parallax & Scale)
    gsap.from(carouselWrapperRef.current, {
      scale: 0.9,
      y: 50,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
      }
    });

    // Staggered Text Reveal
    gsap.from(textRef.current.children, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
      }
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-white px-6 md:px-20 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        
        {/* Animated Carousel Container */}
        <div
          ref={carouselWrapperRef}
          className="relative overflow-hidden rounded-sm shadow-2xl w-full"
        >
          <LuxuriousCarousel />
        </div>

        {/* Animated Text Content */}
        <div ref={textRef} className="space-y-8">
          <div className="space-y-2">
            <span className="text-yellow-800 uppercase tracking-[0.3em] text-sm font-bold block">
              Our Heritage
            </span>
            <div className="h-[1px] w-12 bg-yellow-800" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif text-gray-900 leading-[1.1]">
            A verdant cocoon <br /> of bliss.
          </h2>
          
          <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed max-w-md">
            Experience luxury coupled with tranquility at our premier villas. 
            Designed for those who seek the extraordinary, we offer an 
            unparalleled escape from the mundane.
          </p>
          
          <button className="group relative text-yellow-800 font-bold tracking-widest text-sm uppercase transition-all">
            <span className="relative z-10">Read Our Story</span>
            <div className="absolute bottom-[-8px] left-0 w-full h-[1px] bg-yellow-800/30 group-hover:bg-yellow-800 transition-all" />
          </button>
        </div>

      </div>
    </section>
  );
}