import React from 'react'
import upload from '../assets/upload.png'
import remove from '../assets/delete.png'
import download from '../assets/downloads.png'

const Steps = () => {
  return (
    <div className='mx-4  lg:mx-44 py-20'>
      <h1 className='text-center text-2xl md:text-3xl pb-1 lg:text-4xl mt-4 font semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent'>
        Steps to Remove BackGround <br/> images in seconds
      </h1>
      <div className='flex flex-col lg:flex-row gap-6 md:space-x-5 xl:mt-24 justify-center'>
      <div className='flex items-start gap-4 bg-white border p-7 pb-10 rounded-lg hover:scale-105 transition-all duration-500'>
        <img src={upload} alt="upload image" className='max-w-9'/>
        <div>
          <p className='text-xl font-medium'>Upload Image</p>
          <p className='text-sm text-black mt-1'>Select the image you want to edit Our tool supports various formats, including jpg,png,and more ensuring a seamless experience</p>
        </div>
      </div>
      <div className='flex items-start gap-4 bg-white border p-7 pb-10 rounded-lg hover:scale-105 transition-all duration-500'>
        <img src={remove} alt="remove image" className='max-w-9'/>
        <div>
          <p className='text-xl font-medium'>Remove BackGround</p>
          <p className='text-sm text-black mt-1'>With Single Click our inteligent algorithm will remove the BackGround leaving you with a clen and professional image ready for use</p>
        </div>
      </div>
      <div className='flex items-start gap-4 bg-white border p-7 pb-10 rounded-lg hover:scale-105 transition-all duration-500'>
        <img src={download} alt="download image" className='max-w-9'/>
        <div>
          <p className='text-xl font-medium'>Download Image</p>
          <p className='text-sm text-black mt-1'>Once you&apos;re satisfied with the result, simply download your image in high reslution It's ready to be used for any purpose-be it presentations,design,or social media .</p>

        </div>
      </div>
      <div className='mt-16 text-center'>
        <p className='text-lg text-white'>Experience the fastest and most accurate background removal tool-simplifying your workflow and saving  you time!</p>
      </div>
      </div>
    </div>
  )
}

export default Steps
