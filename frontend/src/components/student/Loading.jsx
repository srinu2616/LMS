import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Loading = () => {

  const { path } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (path) {
      const timer = setTimeout(() => {
        navigate(`/${path}`);
      }, 5000);
      
      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, []); 

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
}

export default Loading