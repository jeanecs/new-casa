import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar as CalendarIcon, LayoutList } from "lucide-react";
import BookingCalendarView from "../components/BookingCalendar";
import BookingListView from "../components/BookingListView";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("calendar");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/bookings", { 
          withCredentials: true 
        });
        setBookings(Array.isArray(data) ? data : data.bookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="text-center p-20 text-casa-gold uppercase tracking-widest font-bold">Loading...</div>;

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER CONTROLS */}
      <div className="flex justify-between items-center bg-white p-4 border border-gray-100 rounded-sm shadow-sm">
        <h2 className="font-serif-display text-xl text-casa-charcoal uppercase tracking-widest">Manage Bookings</h2>
        <div className="flex bg-gray-100 p-1 rounded-sm">
          <button 
            onClick={() => setViewMode("calendar")}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'calendar' ? 'bg-white shadow-sm text-casa-gold' : 'text-gray-400'}`}
          >
            <CalendarIcon className="w-3.5 h-3.5" /> Calendar
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-casa-gold' : 'text-gray-400'}`}
          >
            <LayoutList className="w-3.5 h-3.5" /> List View
          </button>
        </div>
      </div>

      {/* CONDITIONAL COMPONENTS */}
      {viewMode === "calendar" ? (
        <BookingCalendarView bookings={bookings} />
      ) : (
        <BookingListView bookings={bookings} setBookings={setBookings} />
      )}
    </div>
  );
};

export default Bookings;