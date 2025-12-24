import { useEffect, useState } from "react";

const Villas = () => {
  const [villas, setVillas] = useState(null);

  useEffect(() => {
    const fetchVillas = async () => {
      const response = await fetch("http://localhost:5000/api/villas");
      const json = await response.json();

      if (response.ok) {
        setVillas(json);
      }
    };

    fetchVillas();
  }, []);

  return (
    <div className="p-8 bg-[#f8f7f3] min-h-screen">
      <h2 className="font-display text-4xl mb-8 text-[#252525]">Our Villas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {villas && villas.map((villa) => (
          <div key={villa._id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
            <img 
              src={villa.image} 
              alt={villa.name} 
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="font-display text-2xl mb-2">{villa.name}</h3>
              <p className="text-gray-600 mb-4 font-gideon">{villa.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">${villa.price} / night</span>
                <button className="bg-[#8b5e3c] text-white px-4 py-2 rounded-sm hover:bg-[#724c2e] transition-colors">
                  View Details
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