import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const CourseCard = ({ course }) => {
  const { currency,calculateRating } = useContext(AppContext)
  const discountedPrice = course.coursePrice - (course.discount * course.coursePrice / 100)

  return (
    <Link 
      to={`/course/${course._id}`} 
      onClick={() => window.scrollTo(0, 0)}
      className="block bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 hover:-translate-y-1 transform transition"
    >
      {/* Course Thumbnail */}
      <div className="relative pt-[56.25%] overflow-hidden">
        <img 
          src={course.courseThumbnail} 
          alt={course.courseTitle}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Title and Educator */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
          {course.courseTitle}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          {course.educator.className}
        </p>

        {/* Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-500 font-medium">{calculateRating(course)}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img 
                  key={i}
                  src={i<Math.floor(calculateRating(course))?assets.star:assets.star_blank}
                  alt="star"
                  className="w-4 h-4"
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm ml-1">{course.courseRatings.length}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center mt-4">
          <span className="text-lg font-bold text-gray-900">
            {currency} {discountedPrice.toFixed(2)}
          </span>
        
        </div>
      </div>
    </Link>
  )
}

export default CourseCard