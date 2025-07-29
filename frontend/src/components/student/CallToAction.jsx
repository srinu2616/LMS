import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className="bg-white py-16 px-8 md:px-24 lg:px-32 rounded-xl shadow-sm border border-gray-100">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 leading-tight">
          Learn anything, anytime, anywhere
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo doea.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
            Get started
          </button>
          <button className="flex items-center justify-center gap-2 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 group">
            Learn more 
            <img 
              src={assets.arrow_icon} 
              alt="arrow icon" 
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallToAction