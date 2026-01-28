import React from "react";
import axios from "axios";
import { User, Calendar } from "lucide-react";

const BookingListView = ({ bookings, setBookings }) => {
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:5000/api/bookings/${id}`, 
        { status: newStatus },
        { withCredentials: true }
      );
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status: data.status } : b)));
    } catch (error) {
      alert("Failed to update booking status");
    }
  };

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div key={booking._id} className="bg-white border border-gray-100 p-8 rounded-sm hover:shadow-md transition-all">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-3">
                <span className={`px-2 py-0.5 text-[9px] font-bold uppercase border ${booking.status === 'confirmed' ? 'border-emerald-200 text-emerald-600 bg-emerald-50' : 'border-amber-200 text-amber-600 bg-amber-50'}`}>
                  {booking.status}
                </span>
                <h3 className="font-serif-display text-2xl text-casa-charcoal">{booking.guestName}</h3>
              </div>
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] text-gray-400 uppercase tracking-widest">
                <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-casa-gold" /> {new Date(booking.checkIn).toLocaleDateString()} — {new Date(booking.checkOut).toLocaleDateString()}</div>
                <div className="flex items-center gap-2"><User className="w-3.5 h-3.5 text-casa-gold" /> {booking.guests} Guests</div>
                <div className="font-bold text-casa-charcoal">{booking.villa?.name || "Premium Villa"}</div>
              </div>
            </div>

            {booking.status === 'pending' && (
              <div className="flex gap-3">
                <button onClick={() => handleUpdateStatus(booking._id, 'confirmed')} className="px-8 py-3 bg-casa-charcoal text-white text-[10px] font-bold uppercase hover:bg-black">Confirm</button>
                <button onClick={() => handleUpdateStatus(booking._id, 'cancelled')} className="px-8 py-3 border border-gray-200 text-gray-400 text-[10px] font-bold uppercase hover:bg-gray-50">Decline</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingListView;