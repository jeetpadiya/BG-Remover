import logo from '../assets/logo.jpg'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const NavBar = () => {
  const { token, user, handleLogout } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className='flex justify-between items-center p-4 text-white '>
      <img onClick={() => navigate('/')} src={logo} alt="Logo" className='lg-w-52 w-36  cursor-pointer' />
      <div className="flex items-center gap-3">
        {token ? (
          <>
            <span className='hidden sm:block text-sm text-gray-200'>
              {user?.username ? `Hi, ${user.username}` : 'Logged in'}
            </span>
            <button
              className='border-white px-3 py-1 text-xl rounded-md bg-gray-900 font semibold hover:bg-gray-700'
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <button className='border-white px-3 py-1 text-xl rounded-md bg-gray-900 font semibold  hover:bg-gray-700' onClick={() => navigate('/login')}
          >
            Login
          </button>
        )}
      </div>
    </div>
  )
}

export default NavBar
