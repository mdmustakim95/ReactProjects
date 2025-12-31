import React from 'react'
import { Link } from 'react-router-dom'

const HomeBottomText = () => {
  return (
    <div className="font-[font300] flex items-center justify-center gap-2">
      <Link to="/projects" className='text-[3.5vw] leading-[4vw] pt-2 border-2 border-white rounded-full px-5 uppercase hover:border-[#d3fd50] hover:text-[#d3fd50]'> Projects</Link>
      <Link to="/agence" className='text-[3.5vw] leading-[4vw] pt-2 border-2 border-white rounded-full px-5 uppercase hover:border-[#d3fd50] hover:text-[#d3fd50]'> Agence</Link>
    </div>
  )
}

export default HomeBottomText
