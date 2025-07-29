import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import CourseCard from './CourseCard';

const CourseSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className='py-16 md:px-40 px-8 text-center'>
      <h2 className='text-3xl font-medium text-gray-800'>Learn from the best</h2>
      <p className='text-sm md:text-base text-gray-500 mt-3 mx-auto max-w-2xl'>
        Discover our top-rated courses across various categories.
      </p>

      {/* Courses Grid - Added proper key */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12'>
        {allCourses.slice(0, 4).map((course) => (
          <CourseCard 
            key={course._id} // Use course.id instead of index
            course={course}
          />
        ))}
      </div>

      <div className='mt-12 flex justify-center'>
        <Link 
          to='/course-list' 
          className='inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md transition-colors duration-200'
        >
          Show all courses
        </Link>
      </div>
    </div>
  );
};

export default CourseSection;