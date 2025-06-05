'use client';

import React, { useState } from 'react';
import {
  Bookmark,
  Clock,
  Star,
  TrendingUp,
  Users,
  PenTool,
  Database,
  Palette, // Using Palette for Design
  Lightbulb,
  Sparkles, // Using Sparkles for Astronomy
} from 'lucide-react';

// --- Component for Featured Course Card ---
const FeaturedCourseCard = ({
  imageUrl,
  authorName,
  authorAvatarUrl,
  title,
  duration,
  rating,
  price,
  isBookmarked: initialIsBookmarked = false,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-[280px] min-w-[270px] font-sans flex-shrink-0">
      {/* Image Section */}
      <div className="relative mb-3">
        <div className="bg-gray-300 h-36 w-full rounded-lg">
          {/* Placeholder for actual image. 
              Example: <img src={imageUrl} alt={title} className="h-36 w-full rounded-lg object-cover" /> 
          */}
        </div>
        <button
          aria-label="Bookmark course"
          onClick={() => setIsBookmarked(!isBookmarked)}
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white transition-colors"
        >
          <Bookmark
            size={18}
            className={`transition-colors ${isBookmarked ? 'text-blue-600' : 'text-gray-700'}`}
            fill={isBookmarked ? 'currentColor' : 'none'}
          />
        </button>
      </div>

      {/* Author Info - Overlapping */}
      <div className="relative flex items-center bg-white pl-2 pr-3 py-1.5 rounded-full shadow-md mt-[-28px] ml-2 w-fit z-10 max-w-[calc(100%-1rem)]">
        <div className="w-7 h-7 bg-gray-400 rounded-full mr-2.5 flex-shrink-0">
          {/* Placeholder for avatar. 
              Example: <img src={authorAvatarUrl} alt={authorName} className="w-7 h-7 rounded-full object-cover" /> 
          */}
        </div>
        <span className="text-sm font-medium text-gray-800 truncate" title={authorName}>
          {authorName}
        </span>
      </div>

      {/* Content Section */}
      <div className="mt-3 px-1">
        <h3 className="text-base font-bold text-gray-900 truncate" title={title}>
          {title}
        </h3>
        <div className="flex items-center justify-between mt-2.5">
          <div className="flex items-center space-x-3 text-xs text-gray-600">
            <div className="flex items-center">
              <Clock size={13} className="mr-1 text-gray-500" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center">
              <Star size={13} className="mr-0.5 text-yellow-500" fill="currentColor" />
              <span>{rating}</span>
            </div>
          </div>
          <div className="bg-gray-800 text-white text-sm font-semibold px-3 py-1 rounded-full">
            {price}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Component for Category Button ---
const CategoryButton = ({ icon: IconComponent, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center space-y-1.5 p-3 rounded-xl w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 transition-all duration-200 ease-in-out
                  ${isActive
                    ? 'bg-white shadow-lg scale-105'
                    : 'bg-gray-200 hover:bg-gray-300/70 text-gray-700'
                  }`}
    >
      <IconComponent
        size={28}
        className={`transition-colors ${isActive ? 'text-blue-600' : 'text-gray-600'}`}
      />
      <span
        className={`text-xs font-medium transition-colors ${isActive ? 'text-blue-600' : 'text-gray-700'
          }`}
      >
        {label}
      </span>
    </button>
  );
};

// --- Component for My Learning Card ---
const MyLearningCard = ({
  imageUrl,
  title,
  instructorName,
  progressPercent,
  isBookmarked: initialIsBookmarked = false,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex space-x-4 w-full max-w-lg font-sans">
      <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-300 rounded-lg flex-shrink-0">
        {/* Placeholder for actual image. 
            Example: <img src={imageUrl} alt={title} className="w-full h-full rounded-lg object-cover" /> 
        */}
      </div>
      <div className="flex-grow flex flex-col justify-between py-1 min-w-0"> {/* min-w-0 for truncation */}
        <div>
          <div className="flex justify-between items-start">
            <h3 className="text-base font-bold text-gray-900 truncate pr-2" title={title}>
              {title}
            </h3>
            <button
              aria-label="Bookmark course"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
            >
              <Bookmark
                size={18}
                fill={isBookmarked ? 'currentColor' : 'none'}
                className={isBookmarked ? 'text-blue-600' : 'text-gray-500'}
              />
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-0.5 truncate" title={instructorName}>
            {instructorName}
          </p>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gray-800 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1.5">
            {progressPercent}% complete
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function Sweet3Page() {
  const [activeCategoryId, setActiveCategoryId] = useState(1); // 'Sales' initially active

  const featuredCoursesData = [
    {
      id: 1,
      imageUrl: '/placeholder-course-1.jpg',
      authorName: 'John Eames',
      authorAvatarUrl: '/placeholder-avatar-1.jpg',
      title: 'Power BI Masterclass',
      duration: '1h 53m',
      rating: '4.9/5',
      price: '$24',
      isBookmarked: false,
    },
    {
      id: 2,
      imageUrl: '/placeholder-course-2.jpg',
      authorName: 'Curt Rits',
      authorAvatarUrl: '/placeholder-avatar-2.jpg',
      title: 'Agile Project Management',
      duration: '59m',
      rating: '4.3/5',
      price: '$18',
      isBookmarked: true,
    },
    {
      id: 3,
      imageUrl: '/placeholder-course-3.jpg',
      authorName: 'Jane Doe',
      authorAvatarUrl: '/placeholder-avatar-3.jpg',
      title: 'Pivot Tables for Analysts',
      duration: '1h 23m',
      rating: '4.6/5',
      price: '$24',
      isBookmarked: false,
    },
    {
      id: 4,
      imageUrl: '/placeholder-course-4.jpg',
      authorName: 'Ian Brown',
      authorAvatarUrl: '/placeholder-avatar-4.jpg',
      title: 'Advanced Power BI Techniques',
      duration: '1h 17m',
      rating: '4.1/5',
      price: '$24',
      isBookmarked: false,
    },
  ];

  const categoriesData = [
    { id: 1, label: 'Sales', icon: TrendingUp },
    { id: 2, label: 'HR', icon: Users },
    { id: 3, label: 'Drawing', icon: PenTool },
    { id: 4, label: 'Big Data', icon: Database },
    { id: 5, label: 'Design', icon: Palette },
    { id: 6, label: 'Marketing', icon: Lightbulb },
    { id: 7, label: 'Astronomy', icon: Sparkles },
  ];

  const myLearningData = [
    {
      id: 1,
      imageUrl: '/placeholder-learning-1.jpg',
      title: 'Becoming a Photographer',
      instructorName: 'Cara Manning',
      progressPercent: 69,
      isBookmarked: true,
    },
    {
      id: 2,
      imageUrl: '/placeholder-learning-2.jpg',
      title: 'Design Thinking 2.0: The Full Course',
      instructorName: 'Chris Kinley',
      progressPercent: 27,
      isBookmarked: false,
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 p-4 sm:p-6 font-sans">
      <div className="max-w-screen-xl mx-auto">
        {/* Featured Courses Section */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5">
            Featured Courses
          </h2>
          <div className="flex space-x-4 sm:space-x-5 overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 custom-scrollbar">
            {featuredCoursesData.map((course) => (
              <FeaturedCourseCard key={course.id} {...course} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5">
            Categories
          </h2>
          <div className="flex space-x-3 sm:space-x-4 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 custom-scrollbar">
            {categoriesData.map((category) => (
              <CategoryButton
                key={category.id}
                icon={category.icon}
                label={category.label}
                isActive={activeCategoryId === category.id}
                onClick={() => setActiveCategoryId(category.id)}
              />
            ))}
          </div>
        </section>

        {/* My Learning Section */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-5">
            My Learning
          </h2>
          <div className="space-y-4 sm:space-y-5">
            {myLearningData.map((course) => (
              <MyLearningCard key={course.id} {...course} />
            ))}
          </div>
        </section>
      </div>
      {/* Basic custom scrollbar styling (optional, for better aesthetics) */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; // cool-gray-300
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; // cool-gray-400
        }
        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }
      `}</style>
    </div>
  );
}
