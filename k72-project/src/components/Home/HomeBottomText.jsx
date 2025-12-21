import React from 'react'
import { Link } from 'react-router-dom'

const HomeBottomText = () => {
  return (
    <div className="font-[font300] flex items-center justify-center gap-2">
      <Link to="/projects" className='text-[3.5vw] leading-[4vw] pt-2 border-2 border-white rounded-full px-5 uppercase'> Projects</Link>
      <Link to="/agence" className='text-[3.5vw] leading-[4vw] pt-2 border-2 border-white rounded-full px-5 uppercase'> Agence</Link>
    </div>
  )
}

export default HomeBottomText
