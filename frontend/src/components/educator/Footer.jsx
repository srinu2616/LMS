import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <img 
          src={assets.logo} 
          alt='logo'
          className="h-8 w-auto"
        />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 text-xs">
            Copyright © 2024 Kuruva Srinivasulu. All rights reserved.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href='#' className="p-2 rounded-full hover:bg-blue-600 transition-colors duration-200">
            <img 
              src={assets.facebook_icon} 
              alt='facebook' 
              className="h-5 w-5"
            />
          </a>
          <a href='#' className="p-2 rounded-full hover:bg-blue-400 transition-colors duration-200">
            <img 
              src={assets.twitter_icon} 
              alt='twitter' 
              className="h-5 w-5"
            />
          </a>
          <a href='#' className="p-2 rounded-full hover:bg-pink-600 transition-colors duration-200">
            <img 
              src={assets.instagram_icon} 
              alt='instagram' 
              className="h-5 w-5"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer