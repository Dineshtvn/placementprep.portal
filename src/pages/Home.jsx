import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50">
      
      {/* Animated background */}
      <div className="absolute inset-0 bg-pattern animate-bg opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center pt-20">
        
        {/* Header (kept still) */}
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Placement Preparation Portal
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Practice quizzes, take mock interviews, and track your performance
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          
          <div className="bg-white p-6 rounded-xl shadow-md
                          transition-all duration-300 ease-in-out
                          hover:shadow-2xl hover:-translate-y-2">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              Mock Interviews
            </h2>
            <p className="text-gray-600">
              Prepare for real interviews with practice sessions and feedback.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md
                          transition-all duration-300 ease-in-out
                          hover:shadow-2xl hover:-translate-y-2">
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">
              Practice Quizzes
            </h2>
            <p className="text-gray-600">
              Test your knowledge with timed quizzes on DSA and core subjects.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md
                          transition-all duration-300 ease-in-out
                          hover:shadow-2xl hover:-translate-y-2">
            <h2 className="text-2xl font-semibold mb-4 text-red-600">
              Performance Tracking
            </h2>
            <p className="text-gray-600">
              Monitor progress and identify improvement areas.
            </p>
          </div>
        </div>

        {/* Buttons */}
        {!isAuthenticated && (
          <div className="mt-10">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-10 py-3 rounded-full text-lg font-semibold
                         inline-block transition-all duration-300
                         hover:bg-yellow-500 hover:scale-110 hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className="mt-10">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white px-10 py-3 rounded-full text-lg font-semibold
                         inline-block transition-all duration-300
                         hover:bg-blue-700 hover:scale-105 hover:shadow-xl"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
