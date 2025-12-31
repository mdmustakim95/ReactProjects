import React from 'react'
import Video from './Video'

const HomeHeroText = () => {
    const mystyle = {
        borderRadius: '50px',
    };
    
    return (
        <div className='font-[font300] pt-5 text-center'>
            <div className='text-[4.5vw] justify-center flex items-center uppercase leading-[4.5vw] flex items-center'>The spark</div>
            <div className='text-[4.5vw] justify-center flex items-start uppercase leading-[4.5vw]'>
                Who
                <div className="w-[10vw]  h-[5vw] -mt-1 overflow-hidden rounded-full"> <Video /></div>
                generates
            </div>
            <div className='text-[4.5vw] justify-center flex items-center uppercase leading-[4.5vw] flex items-center'>There creativity</div>
        </div>
    )
}

export default HomeHeroText
