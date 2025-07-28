import React from 'react'
import logo from '../assets/christmas-tree.png'
import linkedin from '../assets/linkedin.png'


const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 px-4 mb-4'>
        <img src={logo} alt="christmaslog" className='w-40' />
        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-white max-sm:hidden'>All Rights Reserved &copy; {new Date().getFullYear()} | jeetpadia</p>
        <div className='flex gap-1 '>
          <img width={40} src={linkedin} alt="linkedin"  className='select-none'/>
        </div>
    </div>
  )
}

export default Footer
