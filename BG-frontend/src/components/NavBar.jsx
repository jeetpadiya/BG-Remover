import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {

  const navigate = useNavigate()

  return (
    <div className='flex justify-between items-center p-4 text-white '>
      <img onClick={() => navigate('/')} src={logo} alt="Logo" className='lg-w-52 w-36  cursor-pointer' />
      <div className="flex items-center">
        <button className='border-white px-3 py-1 text-xl rounded-md bg-gray-900 font semibold  hover:bg-gray-700' onClick={() => navigate('/login')}
        >
          Login
        </button>
      </div>
    </div>
  )
}

export default NavBar
