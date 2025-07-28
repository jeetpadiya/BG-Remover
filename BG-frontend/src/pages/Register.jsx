import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import image from '../assets/logo.jpg'
// import play and microsoft icons if you haven’t already:
// import play from '../assets/play.png'
// import microsoft from '../assets/microsoft.png'

const Register = () => {
  const navigate = useNavigate()
  const { handleRegister } = useContext(AppContext)

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match')
    }

    try {
      await handleRegister({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      navigate('/')
    } catch (error) {
      console.error('Registration error:', error)
      toast.error(error.message || 'Something went wrong')
    }
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen text-white p-6">
      {/* Logo side */}
      <div className="md:flex md:w-1/2 items-center justify-center mb-8 lg:mb-0">
        <img
          src={image}
          alt="Logo"
          className="max-w-2xl mt-6 rotate-3 border rounded-lg border-gray-700 transition-transform duration-500 ease-in-out transform hover:translate-x-2 shadow-xl shadow-black hover:translate-y-2 hidden lg:block"
        />
      </div>

      {/* Form side */}
      <div className="flex-1 max-w-md mx-4 sm:mx-auto border border-gray-500 rounded-xl">
        <div className="rounded-lg p-6 shadow-lg bg-gray-800">
          <img src={image} alt="logo" className="w-full h-27 mb-6" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleOnChange}
              placeholder="Username"
              className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              placeholder="email"
              className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              placeholder="create password.."
              className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              placeholder="re-type the password"
              className="w-full p-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-bold"
            >
              Sign Up
            </button>
          </form>

          {/* OR divider and login link… */}
        </div>

        {/* App download section (ensure play & microsoft assets are imported) */}
      </div>
    </div>
  )
}

export default Register