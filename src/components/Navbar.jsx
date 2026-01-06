import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-blue-600 text-white shadow-lg" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white rounded">
            Placement Prep Portal
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {user?.role === 'student' && (
                  <>
                    <Link to="/dashboard" className="hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2">
                      Dashboard
                    </Link>
                    <Link to="/practice" className="hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2">
                      Practice
                    </Link>
                    <Link to="/coding" className="hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2">
                      Coding
                    </Link>
                    <Link to="/mock-interview" className="hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2">
                      Mock Interview
                    </Link>
                    <Link to="/my-interviews" className="hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2">
                      My Interviews
                    </Link>
                  </>
                )}
                {user?.role === 'admin' && (
                  <Link to="/admin" className="hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-white rounded px-2">
                    Admin Panel
                  </Link>
                )}
                <span className="text-blue-200" aria-label={`Logged in as ${user?.name}`}>
                  {user?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
