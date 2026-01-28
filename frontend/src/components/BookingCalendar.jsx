import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import multiMonthPlugin from '@fullcalendar/multimonth';

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
    <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          <button onClick={() => handleNav('prev')} className="border rounded px-4 py-1 hover:bg-gray-50">&lt;</button>
          <button onClick={() => handleNav('today')} className="border rounded px-4 py-1 hover:bg-gray-50 text-[10px] font-bold uppercase">Today</button>
          <button onClick={() => handleNav('next')} className="border rounded px-4 py-1 hover:bg-gray-50">&gt;</button>
        </div>
        <div className="font-serif-display text-lg tracking-widest uppercase text-casa-charcoal">
          {getCalendarTitle(calendarDate)}
        </div>
        <div className="w-24"></div>
      </div>

      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
        initialView="multiMonthCustom"
        views={{ multiMonthCustom: { type: 'multiMonth', duration: { months: 2 }, multiMonthMaxColumns: 2 } }}
        events={events}
        headerToolbar={false}
        height="auto"
        dayMaxEvents={false} // Stack events vertically
        displayEventTime={false}
        eventContent={(info) => (
          <div className="px-2 py-1 mb-0.5 text-[10px] bg-casa-gold/10 border-l-2 border-casa-gold text-casa-charcoal font-medium truncate">
            <span className="font-bold uppercase opacity-60 mr-1">{info.event.extendedProps.villa?.name}:</span>
            {info.event.title}
          </div>
        )}
      />
    </div>
  );
};

export default BookingCalendarView;