import React, { useState, useEffect } from "react";
import { Check, X, Calendar, User, Clock } from "lucide-react";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch bookings from your Express API
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        // Using axios withCredentials if you have a session-based protected route
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

  // 2. Handle Confirm/Decline actions
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/bookings/${id}`, 
        { status: newStatus },
        { withCredentials: true }
      );
      
      // Update local state to reflect the change immediately
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: data.status } : b))
      );
    } catch (error) {
      alert("Failed to update booking status");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-casa-gold uppercase tracking-[0.3em] text-xs">
          Loading Reservations...
        </div>
      </div>
    );
  }

  // Empty State
  if (bookings.length === 0) {
    return (
      <div className="bg-white border border-gray-100 shadow-sm rounded-sm p-20 text-center">
        <div className="inline-block p-4 rounded-full bg-casa-cream mb-4">
          <Clock className="w-8 h-8 text-casa-gold" />
        </div>
        <p className="text-casa-charcoal font-serif-display text-xl">No active bookings</p>
        <p className="text-gray-400 text-sm mt-2 font-light">When guests book a villa, they will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {bookings.map((booking) => (
        <div 
          key={booking._id} 
          className="bg-white border border-gray-100 p-8 rounded-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            
            {/* Guest & Villa Details */}
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

            {/* Admin Action Buttons */}
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

            {/* Cancelled/Confirmed Timestamp */}
            {booking.status !== 'pending' && (
              <div className="text-[10px] text-gray-300 uppercase tracking-widest italic">
                Processed on {new Date(booking.updatedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookings;