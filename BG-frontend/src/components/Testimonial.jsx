import React from 'react'
import  testimonialsData from '../assets/quotes.png'

const Testimonial = () => {
  return (
    <div>
      <h1 className='text-center text-2xl md:text-3xl lg:text-5xl mt-4 font-semibold bg-gradient-to-r from-blue-900 to red-400 bg-clip-text text-transparent'>
        Cutomer Testimoinal
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto px-4 py-8'>
        {testimonialsData.map((item,index)=> (
            <div key={index} className='bg-white rounded-xl p-6 drop-shadow-lg max-w-lg m-auto hover:scale-105 transition-all duration-700'>
                <p className='text-4xl text-black'>"</p>
                <p className='text-sm text-black'>{item.text}</p>
                <div className='flex items-center gap-3 mt-52'>
                  <img src={item.image} alt="image" />
                  <div>
                    <p>{item.author}</p>
                    <p className='text-sm text-gray-600'>{item.jobTitle}</p>
                  </div>
                </div>
            </div>
        ))}

      </div>
    </div>
  )
}

export default Testimonial
