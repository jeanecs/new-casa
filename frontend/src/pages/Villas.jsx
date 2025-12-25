import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Villas = () => {
  const [villas, setVillas] = useState(null);
  const heroRef = useRef();

  // 1. FORCE SCROLL TO TOP ON MOUNT
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchVillas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/villas");
        const json = await response.json();
        if (response.ok) setVillas(json);
      } catch (err) {
        console.error("Failed to fetch villas:", err);
      }
    };
    fetchVillas();
  }, []);

  useGSAP(() => {
  // 1. Guard clause: Do nothing until villas data is actually here
  if (!villas || villas.length === 0) return;


  // 2. Kill any old triggers to prevent "ghost" triggers on re-renders
  ScrollTrigger.getAll().forEach(t => t.kill());

  // 3. Hero Text Parallax
  gsap.to(".hero-content", {
    yPercent: -30,
    ease: "none",
    scrollTrigger: {
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // 4. Robust Villa Reveal
  const rows = gsap.utils.toArray(".villa-row");
  rows.forEach((row) => {
    gsap.fromTo(row, 
      { opacity: 0, y: 40 }, // Start state
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: row,
          start: "top 90%", // Trigger when the top of the row is 90% down the screen
          toggleActions: "play none none none",
          once: true, // IMPORTANT: Prevents it from disappearing if you scroll back up
        },
      }
    );
  });

  // 5. Critical: Re-calculate everything after a tiny delay to account for image rendering
  const timer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 500);

  return () => clearTimeout(timer);
}, [villas]); // Run only when villas data changes

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      
      {/* 1. Page Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/villashero.jpg" 
            className="w-full h-full object-cover brightness-75 scale-110"
            alt="The Estate"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#FAF9F6]" />
        </div>
        
        <div className="hero-content relative z-10 text-center px-6">
          <span className="text-white uppercase tracking-[0.5em] text-sm mb-4 block">Private Sanctuaries</span>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
            The Villa Collection
          </h1>
        </div>
      </section>

      {/* 2. Intro Text */}
      <div className="max-w-3xl mx-auto text-center py-24 px-6">
        <p className="text-gray-600 text-lg md:text-xl font-light leading-relaxed font-gideon">
          Each sanctuary at Casa Filomena is meticulously designed to harmonize with the 
          surrounding tropical landscape, offering an unparalleled blend of modern 
          sophistication and coastal serenity.
        </p>
        <div className="w-16 h-[1px] bg-yellow-800 mx-auto mt-12" />
      </div>

      {/* 3. Villa Showcase */}
      <div className="max-w-[1400px] mx-auto px-6 pb-32 space-y-32">
        {villas && villas.map((villa, index) => (
          <div 
            key={villa._id} 
            className={`villa-row flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24`}
          >
            {/* Image Side */}
            <div className="w-full lg:w-3/5 overflow-hidden shadow-2xl group bg-gray-200">
              <img 
                src={villa.image} 
                alt={villa.name} 
                className="w-full aspect-[4/3] object-cover transition-transform duration-[2s] group-hover:scale-105"
                onLoad={() => ScrollTrigger.refresh()} // Refresh once individual image loads
              />
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-2/5 space-y-6">
              <div className="space-y-2">
                <span className="text-yellow-800 uppercase tracking-widest text-xs font-bold">Exclusive Stay</span>
                <h3 className="font-serif text-4xl md:text-5xl text-gray-900">{villa.name}</h3>
              </div>
              
              <p className="text-gray-600 font-light text-lg leading-relaxed">
                {villa.description}
              </p>

              <div className="pt-4 flex flex-col gap-6">
                <div className="flex items-baseline gap-2 text-gray-900">
                  <span className="text-3xl font-serif font-bold">${villa.price}</span>
                  <span className="text-gray-400 text-sm uppercase tracking-tighter">per night</span>
                </div>
                
                <button className="w-fit px-10 py-4 bg-gray-900 text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-yellow-800 transition-all duration-500">
                  Discover Villa Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Villas;