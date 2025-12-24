

import React, { useState, useEffect } from "react";
import { DatePicker } from "./DatePicker";
import { Button } from "./ui/button"; // Assuming you have these shadcn components
import { Calendar, Users } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

const API_BASE_URL = "http://localhost:5000/api";

export function HeroBookingWidget() {
  const [villas, setVillas] = useState([]);
  const [selectedVilla, setSelectedVilla] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVillas() {
      try {
        const res = await fetch(`${API_BASE_URL}/villas`);
        const data = await res.json();
        const villasData = Array.isArray(data) ? data : [];
        setVillas(villasData);
        if (villasData.length > 0) {
          setSelectedVilla(villasData[0]);
        }
      } catch (error) {
        console.error("Error fetching villas:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVillas();
  }, []);

  const handleSearch = () => {
    if (!selectedVilla || !checkIn || !checkOut) {
      alert("Please select a villa and dates");
      return;
    }

    const numberOfNights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
    );

    // MERN typically uses window.location for navigation if not using a router link
    window.location.href = `/villas?villa=${selectedVilla._id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}&nights=${numberOfNights}`;
  };

  const numberOfNights = checkIn && checkOut
    ? Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  if (loading) {
    return <div className="text-white text-center py-3">Loading options...</div>;
  }

  return (
    <>
      <div className="w-full bg-white/80 backdrop-blur shadow-xl p-2 md:p-3 rounded-md">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-end">
          
          {/* Villa Selection */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Accommodation</label>
            <select
              value={selectedVilla?._id || ""}
              onChange={(e) => {
                const villa = villas.find(v => v._id === e.target.value);
                setSelectedVilla(villa || null);
                setCheckIn(""); // Reset dates when villa changes to refresh availability
                setCheckOut("");
              }}
              className="w-full px-3 py-2 border-b-2 border-gray-300 text-sm focus:outline-none focus:border-yellow-800 bg-white transition-colors"
            >
              {villas.map((villa) => (
                <option key={villa._id} value={villa._id}>
                  {villa.name}
                </option>
              ))}
            </select>
          </div>

          {/* Check-in Trigger */}
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              <Calendar className="w-3 h-3 inline mr-1" /> Check-in
            </label>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="w-full px-3 py-2 border-b-2 border-gray-300 text-sm bg-white text-left hover:bg-gray-50 transition-colors"
            >
              {checkIn ? new Date(checkIn).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Select date"}
            </button>
          </div>

          {/* Duration Indicator */}
          {checkIn && checkOut && (
            <div className="flex-1 min-w-[100px]">
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Stay</label>
              <div className="px-3 py-2 text-sm text-yellow-800 font-bold">
                {numberOfNights} night{numberOfNights !== 1 ? "s" : ""}
              </div>
            </div>
          )}

          {/* Check-out Display */}
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Check-out</label>
            <div className="px-3 py-2 border-b-2 border-gray-300 text-sm text-gray-700">
              {checkOut ? new Date(checkOut).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "---"}
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 min-w-[120px]">
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
              <Users className="w-3 h-3 inline mr-1" /> Guests
            </label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 border-b-2 border-gray-300 text-sm focus:outline-none focus:border-yellow-800"
            />
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="bg-yellow-800 hover:bg-yellow-900 text-white font-bold px-8 py-2 rounded-sm text-sm uppercase tracking-widest h-10 transition-all"
          >
            Check Availability
          </Button>
        </div>
      </div>

      {/* Calendar Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif text-yellow-900">Select Travel Dates</DialogTitle>
            <DialogDescription>
              Choose check-in and check-out dates. Prices are per night.
            </DialogDescription>
          </DialogHeader>
          {selectedVilla && (
            <DatePicker
              villaId={selectedVilla._id}
              onDateSelect={(startDate, endDate) => {
                setCheckIn(startDate);
                setCheckOut(endDate);
                if (startDate && endDate) setIsDialogOpen(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}