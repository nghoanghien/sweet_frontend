'use client';

import React from 'react';
import {
  Brain,
  Flame,
  Plus,
  Palette,
  Briefcase,
  MonitorSmartphone,
  MoreVertical, // Using this for the card dots for simplicity
  CalendarDays,
  Clock,
  Users,
} from 'lucide-react';

// Helper for card top-right icon (simplified)
const CardMenuIcon = ({ className = "text-white/70 hover:text-white" }) => (
  <button className={`absolute top-3 right-3 p-1 rounded-full ${className}`}>
    <MoreVertical size={18} />
  </button>
);

// --- Top Cards Components ---

const CurriculumCard = () => (
  <div className="bg-indigo-600 text-white rounded-xl p-5 sm:p-6 flex flex-col justify-between relative aspect-[4/3.5] sm:aspect-square lg:aspect-[4/3.5]">
    <div>
      <CardMenuIcon className="text-indigo-200 hover:text-white" />
      <span className="text-xs text-indigo-300">Read More</span>
      <h3 className="text-2xl sm:text-3xl font-bold mt-1 leading-tight">
        Curriculum is going to be very hot.
      </h3>
    </div>
    <div className="relative self-center mt-4">
      <Brain size={80} className="text-orange-400 drop-shadow-lg" />
      <Flame size={60} className="text-yellow-400 absolute -top-2 -right-3 transform rotate-[15deg] drop-shadow-lg" />
    </div>
  </div>
);

const MiniBarChart = () => {
  const bars = [20, 30, 45, 60, 75, 90]; // Percentage heights
  return (
    <div className="flex items-end h-12 space-x-1 mt-2">
      {bars.map((height, i) => (
        <div
          key={i}
          className="bg-neutral-700/70 w-[5px] sm:w-1.5 rounded-sm"
          style={{ height: `${height}%` }}
        ></div>
      ))}
    </div>
  );
};

const StatisticsCard = () => (
  <div className="bg-sky-100 text-neutral-800 rounded-xl p-4 relative h-full flex flex-col justify-between">
    <div>
      <CardMenuIcon className="text-sky-600/70 hover:text-sky-800" />
      <span className="text-xs text-sky-700">Statistics</span>
      <p className="text-4xl font-bold mt-1">32h</p>
    </div>
    <MiniBarChart />
  </div>
);

const HomeworkCard = () => (
  <div className="bg-yellow-300 text-neutral-800 rounded-xl p-4 relative h-full flex flex-col justify-center">
    <CardMenuIcon className="text-yellow-700/70 hover:text-yellow-900" />
    <span className="text-xs text-yellow-800">Homework</span>
    <p className="text-4xl font-bold mt-1">+80%</p>
  </div>
);

const AddCard = ({ className }) => (
  <div className={`bg-white border border-gray-200 rounded-xl flex items-center justify-center h-full ${className}`}>
    <button className="p-2 text-gray-400 hover:text-indigo-600">
      <Plus size={32} />
    </button>
  </div>
);

const AvatarGroup = () => (
  <div className="flex -space-x-2 mb-2">
    {[ 'bg-pink-400', 'bg-yellow-400', 'bg-sky-400'].map((color, i) => (
        <div key={i} className={`w-7 h-7 ${color} rounded-full border-2 border-neutral-800 flex items-center justify-center text-xs text-white`}>
            {/* Placeholder for initials or small icons if needed */}
        </div>
    ))}
  </div>
);

const DiscountCard = () => (
  <div className="bg-neutral-800 text-white rounded-xl p-5 sm:p-6 flex flex-col justify-between relative aspect-[4/3.5] sm:aspect-square lg:aspect-[4/3.5]">
    <CardMenuIcon />
    <div>
      <p className="text-sm sm:text-base leading-relaxed">
        Until <span className="font-semibold">August 6</span> choose a discount curriculum. The best <span className="font-semibold">12</span> tutors will always help you.
      </p>
    </div>
    <div className="mt-4">
      <AvatarGroup />
      <div className="flex justify-between items-center text-xs text-neutral-400">
        <span>Course start</span>
        <span>06/08/2023</span>
      </div>
    </div>
  </div>
);

// --- Upcoming Courses Components ---

const CourseTag = ({ text, colorClass }) => (
  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm uppercase ${colorClass}`}>
    {text}
  </span>
);

const UpcomingCoursesHeader = () => (
  <div className="flex justify-between items-end text-xs text-gray-500 uppercase font-medium pb-3 pt-4 px-1">
    <span className="text-sm normal-case text-gray-800 font-semibold">
      Upcoming courses. <a href="#" className="text-indigo-600 hover:underline">Find Your Own!</a>
    </span>
    <div className="hidden sm:flex items-center space-x-12 md:space-x-16 lg:space-x-20">
      <span>Start</span>
      <span>Time</span>
      <span className="w-[90px] text-transparent">Button</span> {/* Alignment spacer */}
    </div>
  </div>
);

const CourseListItem = ({ icon: Icon, title, tag, tagColorClass, startDate, time }) => (
  <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 grid grid-cols-[auto_1fr_auto] sm:grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-center gap-3 sm:gap-4">
    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-full">
      <Icon size={20} />
    </div>
    <div className="min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
        <h4 className="font-semibold text-gray-800 truncate text-sm sm:text-base" title={title}>{title}</h4>
        <CourseTag text={tag} colorClass={tagColorClass} />
      </div>
      <div className="sm:hidden text-xs text-gray-500 mt-1">
        {startDate} &bull; {time}
      </div>
    </div>
    <span className="hidden sm:block text-sm text-gray-700 text-right sm:text-left">{startDate}</span>
    <span className="hidden sm:block text-sm text-gray-700 text-right sm:text-left">{time}</span>
    <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1.5 px-3 rounded-full whitespace-nowrap col-start-3 sm:col-auto">
      View details
    </button>
  </div>
);

// --- Main Page Component ---
export default function Sweet6Page() {
  const coursesData = [
    { id: 1, icon: Palette, title: 'Graphic Design', tag: 'Design', tagColorClass: 'bg-orange-100 text-orange-600', startDate: '12.05.2023', time: '142h' },
    { id: 2, icon: Briefcase, title: 'Product Management', tag: 'Career', tagColorClass: 'bg-yellow-100 text-yellow-700', startDate: '22.06.2023', time: '262h' },
    { id: 3, icon: MonitorSmartphone, title: 'UI/UX Design', tag: 'Creative', tagColorClass: 'bg-sky-100 text-sky-700', startDate: '17.07.2023', time: '184h' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Top Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,_2fr)_minmax(0,_1.6fr)_minmax(0,_2fr)] gap-4 items-stretch">
          <CurriculumCard />

          <div className="flex flex-col sm:flex-row gap-4 h-full">
            <div className="flex flex-col gap-4 flex-grow h-full">
              <StatisticsCard />
              <HomeworkCard />
            </div>
            <AddCard className="w-full sm:w-20 md:w-24 h-32 sm:h-auto" />
          </div>

          <DiscountCard />
        </div>

        {/* Upcoming Courses Section */}
        <div className="bg-white/50 p-0 sm:p-4 rounded-xl">
          <UpcomingCoursesHeader />
          <div className="space-y-3">
            {coursesData.map(course => <CourseListItem key={course.id} {...course} />)}
          </div>
        </div>
      </div>
    </div>
  );
}