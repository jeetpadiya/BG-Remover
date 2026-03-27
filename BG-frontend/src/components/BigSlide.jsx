import React, { useState } from 'react'
import womenwithbg from '../assets/womenwithbg.jpg'
import womenwithoutbg from '../assets/womenwithoutbg.png'

const BigSlide = () => {
  const [sliderPosition, setSliderPosition] = useState(50)

  return (
    <div className='pb-10 md:py-20 mx-2'>
      
      <h1 className='mb-12 sm:mb-20 text-center text-2xl md:text-3xl lg:text-4xl font-semibold
                     bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
        Remove Background with High  
        <br />
        Quality and Accuracy
      </h1>

      <div className='comparison-grid relative w-full max-w-3xl overflow-hidden m-auto rounded-xl h-96 border border-white/10 shadow-2xl'>

        <div
          className='absolute top-0 left-0 h-full w-full overflow-hidden'
        >
          <img
            src={womenwithoutbg}
            alt="Without Background"
            className='absolute top-0 left-0 w-full h-full object-cover select-none'
          />
        </div>

        <div
          className='absolute top-0 left-0 h-full w-full overflow-hidden'
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src={womenwithbg}
            alt="With Background"
            className='absolute top-0 left-0 w-full h-full object-cover select-none'
          />
        </div>

        <div
          className='absolute top-0 bottom-0 z-10 w-1 bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.8)]'
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className='absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-white shadow-lg'>
            <>
              <span className='text-xs'>↔</span>
            </>
          </div>
        </div>

        <div className='absolute left-4 top-4 z-10 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white'>
          Original
        </div>
        <div className='absolute right-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-slate-900'>
          Background Removed
        </div>

        <input
          type="range"
          min={0}
          max={100}
          value={sliderPosition}
          onChange={e => setSliderPosition(+e.target.value)}
          className='absolute inset-0 z-20 h-full w-full cursor-ew-resize slider'
          aria-label='Compare original and background removed image'
        />
      </div>
    </div>
  )
}

export default BigSlide
