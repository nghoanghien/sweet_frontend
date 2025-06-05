import React from 'react';

const ScheduleCalendar = () => {
  // Dữ liệu cho 21 ngày (3 tuần)
  const daysInView = Array.from({ length: 21 }, (_, i) => i + 1);

  // Dữ liệu sự kiện từ hình ảnh
  const eventsData = [
    { 
      id: 1, 
      date: 4, 
      title: "English 101", 
      details: "Class 302", 
      time: "11 AM", 
      color: "bg-purple-100", 
      textColor: "text-purple-800", 
      borderColor: "border-t-4 border-purple-400", 
      tag: null,
      circleDay: true
    },
    { 
      id: 2, 
      date: 10, 
      title: "Human Biology", 
      details: "Class 756", 
      time: "2 PM", 
      color: "bg-teal-100", 
      textColor: "text-teal-800", 
      borderColor: "border-t-4 border-teal-400", 
      tag: "Homework",
      tagColor: "bg-teal-500 text-white"
    },
    { 
      id: 3, 
      date: 15, 
      title: "World Economy", 
      details: "Individual Oral Exam", 
      time: "11 AM, Online", 
      color: "bg-blue-100", 
      textColor: "text-blue-800", 
      borderColor: "border-t-4 border-blue-400", 
      tag: "Exam",
      tagColor: "bg-blue-500 text-white"
    },
    { 
      id: 4, 
      date: 19, 
      title: "Paper Review", 
      details: "Individual meeting", 
      time: "9 AM, Online", 
      color: "bg-lime-100", 
      textColor: "text-lime-800", 
      borderColor: "border-t-4 border-lime-400", 
      tag: null
    },
  ];

  // Helper function để lấy sự kiện cho một ngày cụ thể
  const getEventForDay = (day) => {
    return eventsData.find(event => event.date === day);
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Your Schedule</h1>
        <div className="flex items-center text-sm text-gray-600">
          <span>May 01 - May 21, 2023</span>
          <div className="ml-2 flex flex-col text-xs">
            <button className="cursor-pointer">▲</button>
            <button className="cursor-pointer">▼</button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {daysInView.map((day) => {
          const event = getEventForDay(day);
          
          return (
            <div 
              key={day} 
              className={`min-h-[120px] ${event ? event.color : 'bg-white'}`}
            >
              {!event && (
                <div className="p-2">
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              )}
              
              {event && (
                <div className={`h-full p-2 ${event.color} ${event.borderColor} flex flex-col justify-between`}>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      {event.circleDay ? (
                        <span className="w-5 h-5 flex items-center justify-center rounded-full border-2 border-purple-500 text-xs font-medium text-purple-800">
                          {day}
                        </span>
                      ) : (
                        <span className={`text-xs font-medium ${event.textColor}`}>{day}</span>
                      )}
                      
                      {event.tag && (
                        <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-medium ${event.tagColor}`}>
                          {event.tag}
                        </span>
                      )}
                    </div>
                    <h3 className={`font-bold text-sm ${event.textColor}`}>{event.title}</h3>
                  </div>
                  
                  <div>
                    <p className={`text-xs ${event.textColor}`}>{event.details}</p>
                    <p className={`text-xs ${event.textColor}`}>{event.time}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleCalendar;
