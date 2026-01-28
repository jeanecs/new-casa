import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from '@fullcalendar/multimonth';
import { ChevronLeft, ChevronRight } from "lucide-react";

const BookingCalendarView = ({ bookings }) => {
  const calendarRef = useRef(null);
  const [calendarDate, setCalendarDate] = useState(new Date());

  const getCalendarTitle = (date) => {
    const month1 = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const month2 = nextMonth.toLocaleString('default', { month: 'long', year: 'numeric' });
    return `${month1} – ${month2}`;
  };

  const handleNav = (action) => {
    const api = calendarRef.current.getApi();
    api[action]();
    setCalendarDate(api.getDate());
  };

  const events = bookings.map(b => ({
    id: b._id,
    title: b.guestName,
    start: b.checkIn,
    end: b.checkOut,
    backgroundColor: b.status === 'confirmed' ? '#C5A059' : '#FBBF24',
    borderColor: 'transparent',
    extendedProps: { ...b }
  }));

  return (
    <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm admin-calendar-container">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-1">
          <button onClick={() => handleNav('prev')} className="p-2 border border-gray-100 rounded-sm hover:bg-gray-50 transition-colors text-gray-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => handleNav('today')} className="px-4 py-2 border border-gray-100 rounded-sm hover:bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Today
          </button>
          <button onClick={() => handleNav('next')} className="p-2 border border-gray-100 rounded-sm hover:bg-gray-50 transition-colors text-gray-400">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="font-display text-lg tracking-[0.2em] uppercase text-casa-charcoal text-center">
          {getCalendarTitle(calendarDate)}
        </div>
        <div className="w-[120px] hidden lg:block"></div>
      </div>

      <div className="admin-calendar-custom">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
          initialView="multiMonthCustom"
            views={{ 
                multiMonthCustom: { 
                type: 'multiMonth', 
                duration: { months: 2 }, 
                multiMonthMaxColumns: 2 
                } 
            }}
            events={events}
            height="auto"           // Allows the calendar to grow vertically
            dayMaxEvents={false}    // Crucial: Disables the "+more" popup
            displayEventTime={false}
            eventContent={(info) => (
                <div className="flex flex-col px-1">
                <span className="text-[6px] font-bold uppercase tracking-tighter opacity-70">
                    {info.event.extendedProps.villa?.name || "Villa"}
                </span>
                <span className="truncate text-[9px] font-bold uppercase">
                    {info.event.title}
                </span>
                </div>
            )}
            />
      </div>
    </div>
  );
};

export default BookingCalendarView;