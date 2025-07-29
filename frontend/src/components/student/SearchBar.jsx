import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SearchBar = ({data}) => {
  const navigate=useNavigate()
  const [input,setinput]=useState(data?data:"")

  const onSearchHandler=(e)=>{
    e.preventDefault()
    navigate('/course-list/'+input)
  }

  return (
    <form  onSubmit={onSearchHandler} className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50'>
      <img 
        src={assets.search_icon} 
        alt="search_icon" 
        className='md:w-auto w-10 px-3 opacity-60'
      />
      <input 
        onChange={e=>setinput(e.target.value)} 
        value={input}
        type='text' 
        placeholder='Search for courses' 
        className='w-full h-full outline-none text-gray-600 placeholder-gray-400'
      />
      <button 
        type='submit' 
        className='bg-blue-600 hover:bg-blue-700 rounded-md text-white md:px-10 px-7 md:py-3 py-2 mx-1 transition-colors duration-200'
      >
        Search
      </button>
    </form>
  )
}

export default SearchBar