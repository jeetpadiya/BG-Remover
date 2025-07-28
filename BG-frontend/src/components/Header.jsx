import { useContext } from 'react'
import video from '../assets/Removebg.mp4'
import {AppContext} from '../context/AppContext'
const Header = () => {
  
  const{removeBg} = useContext(AppContext)

  return (
    <div className="flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mb-14 mt-10 lg px-44 sm:mt-20 ">
        {/* Leftside */}
        <div>
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight ">Remove the
            <br className="max-md:hidden"/>
            <span className="bg-gradient-to-r font-rubik from-blue-600 to-fuchsia-300 bg-clip-text text-transparent"> background</span> from <br  className="max-md:hidden"/> images for free
          </h1>
          <p className="my-6 text-[15px] text-white w-[90%]">
            Transform your photos effortlessly With   Bg-Removel software  you can easily eliminate background from images encahancing your creativity and making your visuals pop. 
            <br className="max-sm:hidden"/>Whether for social media , markating  or personal projects our tools is designed  for everyone , ensuring  high-quality result in just  a few clicks 
          </p>
          <div>
              <input onChange={e=>removeBg(e.target.files[0])} type="file" id="upload1" accept="image/" hidden   />
              <label className="inline-flex  gap-3 px-8 py-3.5 md:px-6 md:py-2.5 rounded-full cursor-pointer bg-gradient-to-r from-blue-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700 text-white" htmlFor="upload1">
                <span>Upload Image</span>
              </label>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-full max-w-lg">
            <video className="rounded-3xl bg-transprent" autoPlay muted loop>
              <source  src={video} type='video/mp4'/>
              Your Browser does not support the video tag.
              </video>
        </div>
    </div>
  )
}

export default Header
