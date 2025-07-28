import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import '../css/Login.css'
import image from '../assets/logo.jpg'

const Login = () => {

  const navigate = useNavigate()
  const { handleLogin } = useContext(AppContext)

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handelonchange = (e) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("handleSubmit fired", userData);

    try {
      await handleLogin({
        email: userData.email,
        password: userData.password
      })
      navigate('/')
    }
    catch (error) {
      console.log(error)
      toast.error(error.message || "Someting went wrong")
    }
  }


  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen text-white p-6">
      <div className="md:flex md:w-1/2 items-center justify-center">  
        <img src={image} alt="Logo" className="max-w-2xl mt-6 rotate-3 border rounded-lg border-gray-700 transition-transfrom duration-500 ease-in-out transform hover:translate-x-2 shadow-xl shadow-black hover:translate-y-2 hidden lg:block" />
      </div>

      <div className="flex-1 max-w-md mx-4 sm:mx-4-auto border border-gray-500 rounded-xl">
        <div className="rounded-lg p-6 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text"
              value={userData.email}
              name="email"
              onChange={handelonchange}
              placeholder="Phone number,username or  email"
              className="w-full p-3  rounded-lg bg-white text-gray-900  foucs:outline-none focus:ring focus:ring-blue-500"
            />
            <input type="password"
              value={userData.password}
              onChange={handelonchange}
              name="password"
              placeholder="Password"
              className="w-full p-3  rounded-lg bg-white text-gray-900  foucs:outline-none focus:ring focus:ring-blue-500"
            />
            <button type="submit" className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold">
              Log In
            </button>
          </form>
          <div className="flex items-center my-4">
            <hr className="flex-1 border-gray-700" />
            <span className="px-2 text-gray-500">OR</span>
            <hr className="flex-1 border-gray-700" />
          </div>
        </div>
        <div className="mt-4 bg-[#251469e8] text-gray-400 rounded-lg p-4 text-center">
          Don&apos;t have an account?{" "}
          <span onClick={() => navigate("/register")} className="text-blue-600 hover-:underline cursor-pointer">
            Sign Up
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
