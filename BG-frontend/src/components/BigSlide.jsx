import React, { useState } from 'react'
import womenwithbg from '../assets/womenwithbg.jpg'
import womenwithoutbg from '../assets/womenwithoutbg.png'

const BigSlide = () => {
  const [sliderPosition, setSliderPosition] = useState(50)

  const handleSliderChange = (e)=>{
    setSliderPosition(e.target.value)
  }

  return (
    <div className='pb-10 md:py-20 mx-2'>
      
      <h1 className='mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl font-semibold
                     bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
        Remove Background with High  
        <br />
        Quality and Accuracy
      </h1>

      <div className='relative w-full max-w-3xl overflow-hidden m-auto rounded-xl h-96'>
        {/* Background image */}
        <img
          src={womenwithbg}
          alt="With Background"
          className='absolute top-0 left-0 w-full h-full select-none'
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        />

        {/* Foreground image */}
        <img
          src={womenwithoutbg}
          alt="Without Background"
          className='absolute top-0 left-0 w-full h-full select-none'
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        />

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={e => setSliderPosition(+e.target.value)}
          className='absolute inset-0 w-full h-full z-20 slider cursor-ew-resize'
        />
      </div>
    </div>
)
}

export default BigSlide