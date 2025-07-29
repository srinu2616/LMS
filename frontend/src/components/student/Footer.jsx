import React from 'react'
import { FaRegCopyright } from "react-icons/fa";
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main content container - full width with inner max-width */}
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-16 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Logo and Description */}
            <div className="space-y-6">
              <img 
                src={assets.logo_dark} 
                alt='logo'
                className="h-10 w-auto"
              />
              <p className="text-gray-300 text-sm leading-relaxed">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis quae perspiciatis quo illum voluptas totam?
              </p>
            </div>

            {/* Company Links */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold uppercase tracking-wider">Company</h2>
              <ul className="space-y-3">
                <li><a href='#' className="text-gray-300 hover:text-white transition-colors duration-200">Home</a></li>
                <li><a href='#' className="text-gray-300 hover:text-white transition-colors duration-200">About us</a></li>
                <li><a href='#' className="text-gray-300 hover:text-white transition-colors duration-200">Contact us</a></li>
                <li><a href='#' className="text-gray-300 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-lg font-semibold uppercase tracking-wider">Subscribe to our newsletter</h2>
              <p className="text-gray-300 text-sm">
                The latest news, articles and resources, sent to your inbox weekly.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type='email' 
                  placeholder='Enter your email'
                  className="flex-grow px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-width copyright bar */}
      <div className="w-full bg-black bg-opacity-20 py-6 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-center text-gray-400 text-sm">
            <p className="flex items-center">
              Copyright 2025 <FaRegCopyright className="mx-1" /> Kuruva Srinivasulu. All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;