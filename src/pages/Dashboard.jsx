import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { quizApi, performanceApi } from '../api/mockApi.js'
import { modulePDFs } from '../data/sampleData.js'

const Dashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [recentResults, setRecentResults] = useState([])
  const [performanceData, setPerformanceData] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [resultsRes, performanceRes] = await Promise.all([
        quizApi.getQuizResults(user.id),
        performanceApi.getPerformanceData(user.id),
      ])
      
      if (resultsRes.success) {
        setRecentResults(resultsRes.data.slice(-5).reverse())
        
        // Calculate stats
        const totalQuizzes = resultsRes.data.length
        const avgScore = totalQuizzes > 0
          ? Math.round(resultsRes.data.reduce((sum, r) => sum + r.score, 0) / totalQuizzes)
          : 0
        const avgTime = totalQuizzes > 0
          ? Math.round(resultsRes.data.reduce((sum, r) => sum + r.timeSpent, 0) / totalQuizzes)
          : 0
        const improvement = resultsRes.data.length >= 2
          ? resultsRes.data[resultsRes.data.length - 1].score - resultsRes.data[0].score
          : 0
        
        setStats({
          totalQuizzes,
          averageScore: avgScore,
          averageTime: avgTime,
          improvement,
        })
      }
      
      if (performanceRes.success) {
        setPerformanceData(performanceRes.data)
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    }
  }

  const getFeedback = () => {
    if (!stats) return 'Loading...'
    if (stats.averageScore >= 90) return 'Excellent! Keep up the great work.'
    if (stats.averageScore >= 75) return 'Good progress! Focus on weaker areas.'
    if (stats.averageScore >= 50) return 'Keep practicing. Review fundamental concepts.'
    return 'Work on Data Structures and Algorithms fundamentals.'
  }

  // Simple SVG chart for performance trend
  const renderPerformanceChart = () => {
    if (performanceData.length < 2) return null
    
    const maxScore = Math.max(...performanceData.map(d => d.score), 100)
    const width = 400
    const height = 200
    const padding = 40
    
    const points = performanceData.map((d, i) => {
      const x = padding + (i / (performanceData.length - 1)) * (width - 2 * padding)
      const y = height - padding - (d.score / maxScore) * (height - 2 * padding)
      return `${x},${y}`
    }).join(' ')
    
    return (
      <svg width={width} height={height} className="w-full max-w-md">
        <polyline
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          points={points}
        />
        {performanceData.map((d, i) => {
          const x = padding + (i / (performanceData.length - 1)) * (width - 2 * padding)
          const y = height - padding - (d.score / maxScore) * (height - 2 * padding)
          return (
            <circle key={i} cx={x} cy={y} r="4" fill="#3b82f6" />
          )
        })}
      </svg>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Welcome, {user?.name}!
      </h1>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Quizzes</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalQuizzes}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Average Score</h3>
            <p className="text-3xl font-bold text-green-600">{stats.averageScore}%</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Avg Time/Quiz</h3>
            <p className="text-3xl font-bold text-purple-600">
              {Math.round(stats.averageTime / 60)}m
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Improvement</h3>
            <p className={`text-3xl font-bold ${stats.improvement >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {stats.improvement >= 0 ? '+' : ''}{stats.improvement}%
            </p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to="/practice"
              className="block bg-blue-600 text-white text-center py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Start Practice Quiz
            </Link>
            <Link
              to="/coding"
              className="block bg-purple-600 text-white text-center py-3 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Practice Coding
            </Link>
            <Link
              to="/mock-interview"
              className="block bg-green-600 text-white text-center py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Take Mock Interview
            </Link>
            <Link
              to="/my-interviews"
              className="block bg-orange-600 text-white text-center py-3 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              View My Interviews
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Feedback</h2>
          <p className="text-gray-700">{getFeedback()}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Study Modules</h2>
          <div className="space-y-2">
            {Object.entries(modulePDFs).map(([module, pdfPath]) => (
              <a
                key={module}
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {module} - View PDF
              </a>
            ))}
          </div>
        </div>

        {performanceData.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
            {renderPerformanceChart()}
          </div>
        )}
      </div>

      {recentResults.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Quiz Results</h2>
          <div className="space-y-3">
            {recentResults.map((result) => (
              <div
                key={result.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded"
              >
                <div>
                  <p className="font-medium">Quiz {result.quizId}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(result.completedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{result.score}%</p>
                  <p className="text-sm text-gray-600">
                    {Math.round(result.timeSpent / 60)}m {result.timeSpent % 60}s
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
