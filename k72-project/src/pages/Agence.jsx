import { useState } from 'react'

function Agence() {
  

  return (
    <div>
      <div className='section1'>
        <div className='h-[20vw] overflow-hidden rounded-4xl w-[15vw] absolute top-30 left-98 bg-red-500'>
          <img src="https://k72.ca/images/teamMembers/Carl_480x640.jpg?w=480&h=640&fit=crop&s=f0a84706bc91a6f505e8ad35f520f0b7" alt="" className="h-full w-full object-cover" />
        </div>

        <div className='font-[font500]'>
          <div className='mt-[55vh]'>
            <h1 className='text-[20vw] text-center uppercase leading-[18vw]'>Sixty-seventh <br/> Twelve</h1>
          </div>
          <div className='pl-[41%] mt-5'>
            <p className="text-5xl">&emsp;&emsp;&emsp;&emsp;&emsp; Our curiosity fuels our creativity. We remain humble and say no to big egos, even yours. A brand is alive. It Whas values, a personality, a history. If we forget that, we might achieve good short-term results, but we'll kill it in the long run. That's why we're committed to providing perspective, to building influential brands.</p>
          </div>
        </div>
      </div>

      <div className="section2 h-screen"></div>
    </div>
  )
}

export default Agence
