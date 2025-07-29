import React from 'react'
import { Link } from 'react-router-dom'
import { assets, dummyEducatorData } from '../../assets/assets'
import { UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {
  const educatorData = dummyEducatorData
  const { user } = useUser()
  
  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link to='/' className="flex items-center space-x-2">
        <img 
          src={assets.logo} 
          alt="logo" 
          className="h-10 w-auto"
        />
      
      </Link>
      
      <div className="flex items-center space-x-4">
        <p className="text-gray-600 font-medium">
          Hi {user ? user.fullName : 'Developers'} 👋
        </p>
        
        {user ? (
          <UserButton 
            appearance={{
              elements: {
                userButtonAvatarBox: "h-10 w-10",
              }
            }}
          />
        ) : (
          <img 
            src={assets.profile_img} 
            alt="Profile" 
            className="h-10 w-10 rounded-full object-cover border-2 border-indigo-100"
          />
        )}
      </div>
    </div>
  )
}

export default Navbar