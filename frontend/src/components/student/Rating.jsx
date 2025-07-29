import React, { useState, useEffect } from 'react'

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const handleRating = (value) => {
    setRating(value)
    if (onRate) onRate(value)
  }

  useEffect(() => {
    setRating(initialRating)
  }, [initialRating])

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1
        const isActive = starValue <= rating
        const isHovered = starValue <= hoverRating && hoverRating > rating
        
        return (
          <button
            key={index}
            type="button"
            className={`text-3xl mx-1 transition-all duration-150
              ${isActive ? 'text-yellow-500' : 'text-gray-300'}
              ${isHovered ? 'text-yellow-400 scale-110' : ''}
              hover:text-yellow-400 focus:outline-none`}
            onClick={() => handleRating(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            aria-label={`Rate ${starValue} stars`}
          >
            {isActive ? (
              <span className="drop-shadow-[0_0_4px_rgba(234,179,8,0.5)]">★</span>
            ) : (
              <span>☆</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Rating