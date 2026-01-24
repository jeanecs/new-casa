import React, { useState, useEffect } from "react";
import { Check, X, Calendar as CalendarIcon, User, Clock, LayoutList, Calendar } from "lucide-react";
import axios from "axios";
// FullCalendar Imports
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("calendar"); // State to toggle views

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/bookings", { 
          withCredentials: true 
        });
        const actualBookings = Array.isArray(data) ? data : data.bookings;
        setBookings(actualBookings || []);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/bookings/${id}`, 
        { status: newStatus },
        { withCredentials: true }
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: data.status } : b))
      );
    } catch (error) {
      alert("Failed to update booking status");
    }
  };

  // Format events for FullCalendar
  const calendarEvents = bookings.map(b => ({
    id: b._id,
    title: `${b.guestName}`,
    start: b.checkIn,
    end: b.checkOut,
    backgroundColor: b.status === 'confirmed' ? '#C5A059' : '#FBBF24', // Casa Gold or Amber
    borderColor: 'transparent',
    extendedProps: { ...b }
  }));

  if (loading) {
    return <div className="text-center p-20 text-casa-gold">Loading Reservations...</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      {/* VIEW TOGGLE CONTROLS */}
      <div className="flex justify-between items-center bg-white p-4 border border-gray-100 rounded-sm shadow-sm">
        <div>
          <h2 className="font-serif-display text-xl text-casa-charcoal uppercase tracking-widest">Manage Bookings</h2>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-sm">
          <button 
            onClick={() => setViewMode("calendar")}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'calendar' ? 'bg-white shadow-sm text-casa-gold' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <CalendarIcon className="w-3.5 h-3.5" /> Calendar
          </button>
          <button 
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-casa-gold' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <LayoutList className="w-3.5 h-3.5" /> List View
          </button>
        </div>
      </div>

      {/* CONDITIONAL CONTENT */}
      {viewMode === "calendar" ? (
        /* --- CALENDAR VIEW --- */
        <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm admin-calendar-custom">
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
            height="auto" 
            contentHeight={600} // Limits the internal height
            aspectRatio={1.8}   // Makes cells wider and shorter (more modern look)
            fixedWeekCount={false} // Removes empty weeks at the bottom
            dayMaxEvents={true}  // Prevents cells from growing too tall if multiple bookings exist
            // -
            eventClick={(info) => {
              // We can make this open a modal later!
              alert(`Booking for: ${info.event.title}`);
            }}
          />
        </div>
      ) : (
        /* --- ORIGINAL LIST VIEW (Your original code goes here) --- */
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="bg-white border border-gray-100 p-8 rounded-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.2em] border ${
                      booking.status === 'confirmed' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' : 
                      booking.status === 'cancelled' ? 'border-rose-200 text-rose-500 bg-rose-50' : 
                      'border-amber-200 text-amber-600 bg-amber-50'
                    }`}>
                      {booking.status}
                    </span>
                    <h3 className="font-serif-display text-2xl text-casa-charcoal tracking-tight">
                      {booking.guestName}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] text-gray-500 uppercase tracking-widest font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-casa-gold" />
                      <span>{new Date(booking.checkIn).toLocaleDateString()} — {new Date(booking.checkOut).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-casa-gold" />
                      <span>{booking.guests} Guests</span>
                    </div>
                    <div className="text-casa-charcoal font-bold">
                      {booking.villa?.name || "Premium Villa"}
                    </div>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="flex gap-3 w-full lg:w-auto">
                    <button 
                      onClick={() => handleUpdateStatus(booking._id, 'confirmed')}
                      className="flex-1 lg:flex-none px-8 py-3 bg-casa-charcoal text-white text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-colors"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(booking._id, 'cancelled')}
                      className="flex-1 lg:flex-none px-8 py-3 border border-gray-200 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
                    >
                      Decline
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;