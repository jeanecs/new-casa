import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api/villas";

export function DatePicker({ onDateSelect, villaId, minNights = 1 }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [blockedDates, setBlockedDates] = useState([]);
  const [datePrices, setDatePrices] = useState({});
  const [basePrice, setBasePrice] = useState(150);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAvailability() {
      setLoading(true);
      try {
        const [unavailRes, pricesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/availability/${villaId}`),
          fetch(`${API_BASE_URL}`) // Adjust this if your API uses a different route for all prices
        ]);
        
        const unavail = await unavailRes.json();
        setBlockedDates(unavail.blockedDates || []);

        const allDates = await pricesRes.json();
        const priceMap = {};
        let detectedBasePrice = 150;
        
        if (Array.isArray(allDates)) {
          allDates.forEach(d => {
            if (d.villaId === villaId && d.date) {
              const dateStr = new Date(d.date).toISOString().split("T")[0];
              priceMap[dateStr] = d.price;
              if (detectedBasePrice === 150) detectedBasePrice = d.price;
            }
          });
        }
        setDatePrices(priceMap);
        setBasePrice(detectedBasePrice);
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchAvailability();
  }, [villaId]);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handleDateClick = (day) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateStr = `${year}-${month}-${dayStr}`;

    if (blockedDates.includes(dateStr)) return;

    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(dateStr);
      setCheckOut("");
    } else if (new Date(dateStr) <= new Date(checkIn)) {
      setCheckIn(dateStr);
      setCheckOut("");
    } else {
      setCheckOut(dateStr);
      onDateSelect(checkIn, dateStr);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    
    // Use local date string for 'today' to match the calendar view
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-14 bg-gray-50/50"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const year = currentMonth.getFullYear();
      const month = String(currentMonth.getMonth() + 1).padStart(2, "0");
      const dayStr = String(day).padStart(2, "0");
      const dateStr = `${year}-${month}-${dayStr}`;
      
      // 1. Check if the date is in your blockedDates array
      const isUnavailable = blockedDates.includes(dateStr);
      
      // 2. Check if the date is in the past (Strict string comparison)
      const isPast = dateStr < todayStr;
      
      const isCheckIn = dateStr === checkIn;
      const isCheckOut = dateStr === checkOut;
      
      // 3. Logic for "In Range" highlighting
      const isInRange = checkIn && checkOut && dateStr > checkIn && dateStr < checkOut;
      
      const price = datePrices[dateStr] ?? basePrice;

      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(day)}
          disabled={isUnavailable || isPast}
          className={`h-14 text-xs flex flex-col items-center justify-center rounded border border-transparent transition-all ${
            isCheckIn || isCheckOut
              ? "bg-yellow-800 text-white font-bold"
              : isInRange
                ? "bg-yellow-100 text-yellow-900"
                : isUnavailable || isPast
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" // This matches your screenshot's legend
                  : "hover:border-yellow-800 text-gray-900"
          }`}
        >
          <span className="text-[11px] mb-1">{day}</span>
          {!isUnavailable && !isPast && <span className="text-[10px] opacity-80">${price}</span>}
        </button>
      );
    }
    
    return days;
  };

  if (loading) return <div className="text-center py-10">Loading Calendar...</div>;

  return (
    <div className="bg-white">
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="p-2 hover:bg-gray-100 rounded">
          <ChevronLeft size={20} />
        </button>
        <h3 className="text-lg font-bold text-yellow-900">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </h3>
        <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="p-2 hover:bg-gray-100 rounded">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
          <div key={d} className="text-center text-xs font-bold text-gray-400 uppercase">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {renderCalendar()}
      </div>

      <div className="mt-6 flex flex-wrap gap-4 text-[10px] uppercase font-bold text-gray-500">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-800 rounded-full"></div> Selected</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-100 rounded-full"></div> In Range</div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-200 rounded-full"></div> Unavailable</div>
      </div>
    </div>
  );
}