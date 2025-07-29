import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  const { isEducator } = useContext(AppContext)

  const menuItems = [
    { name: 'Dashboard', path: '/educator', icon: assets.home_icon },
    { name: 'Add Course', path: '/educator/add-course', icon: assets.add_icon },
    { name: 'My Courses', path: '/educator/my-courses', icon: assets.my_course_icon },
    { name: 'Student Enrolled', path: '/educator/student-enrolled', icon: assets.person_tick_icon },
  ]

  return isEducator && (
    <div className="w-64 bg-gray-50 p-4 h-screen border-r border-gray-200">
      <h1 className="text-xl font-bold mb-6 text-gray-800">Sidebar</h1>
      {menuItems.map((item) => (
        <NavLink 
          
          key={item.name}
          to={item.path}
          end={item.path==='/educator'}
          className="flex items-center p-3 mb-2 text-gray-700 hover:bg-gray-200 rounded-lg"
        >
          <img src={item.icon} alt="" className="w-5 h-5 mr-3" />
          <p>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar