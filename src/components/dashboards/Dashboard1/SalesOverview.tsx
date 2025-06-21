import { useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from 'react-icons/io';

type BookingData = {
  [key: string]: number; // "YYYY-MM-DD": count
};

const sampleBookings: BookingData = {
  '2025-06-10': 2,
  '2025-06-12': 4,
  '2025-06-15': 1,
  '2025-06-21': 7,
  '2025-06-22': 10,
};

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const formatDate = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

const getIntensityClass = (count: number) => {
  if (count === 0) return '';
  if (count <= 2) return 'bg-blue-100';
  if (count <= 5) return 'bg-blue-300';
  if (count <= 8) return 'bg-blue-500 text-white';
  return 'bg-blue-700 text-white';
};

const BookingCalendar = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  const changeMonth = (direction: 'prev' | 'next') => {
    let newMonth = direction === 'prev' ? currentMonth - 1 : currentMonth + 1;
    let newYear = currentYear;

    if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <CardBox className="pb-3">
      {/* Month Header */}
      <div className="flex justify-between items-center mb-4 py-1 px-5 bg-blue-600 rounded-md ">
        <button onClick={() => changeMonth('prev')} className="text-white">
          <IoIosArrowDropleftCircle size={24} />
        </button>
        <h2 className="text-lg font-bold text-gray-100">
          {new Date(currentYear, currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>
        <button onClick={() => changeMonth('next')} className="text-white">
          <IoIosArrowDroprightCircle size={24} />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-blue-600">
        {dayNames.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mt-2">
        {[...Array(firstDayIndex).fill(null), ...Array(daysInMonth).keys()].map((day, idx) => {
          const actualDay = typeof day === 'number' ? day + 1 : null;
          const dateStr =
            actualDay !== null ? formatDate(currentYear, currentMonth, actualDay) : '';
          const count = sampleBookings[dateStr] || 0;

          const isToday =
            actualDay === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();

          const isSelected =
            selectedDate &&
            actualDay === selectedDate.getDate() &&
            currentMonth === selectedDate.getMonth() &&
            currentYear === selectedDate.getFullYear();

          const intensityClass = getIntensityClass(count);

          return (
            <div key={idx}>
              {actualDay ? (
                <button
                  onClick={() => setSelectedDate(new Date(currentYear, currentMonth, actualDay))}
                  className={`relative w-full px-4 py-3 rounded-lg text-sm transition-all duration-150 
                    ${intensityClass} 
                    ${isSelected ? 'ring-2 ring-blue-600' : ''} 
                    ${isToday ? 'border border-blue-500' : ''}`}
                >
                  <div className="z-10 relative">{actualDay}</div>
                  {count > 0 && (
                    <div className="absolute bottom-0 shadow-xl shadow-gray-700 right-0 h-6 w-6 rounded-full text-[10px] bg-white text-blue-700 font-bold rounded-full px-1 shadow-sm">
                      {count}
                    </div>
                  )}
                </button>
              ) : (
                <div />
              )}
            </div>
          );
        })}
      </div>
    </CardBox>
  );
};

export default BookingCalendar;
