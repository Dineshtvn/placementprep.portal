import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { performanceApi } from '../api/mockApi.js'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const Performance = () => {
  const { user } = useAuth()
  const [performanceData, setPerformanceData] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [dataRes, statsRes] = await Promise.all([
        performanceApi.getPerformanceData(user.id),
        performanceApi.getStats(user.id),
      ])
      if (dataRes.success) setPerformanceData(dataRes.data)
      if (statsRes.success) setStats(statsRes.data)
    } catch (error) {
      console.error('Failed to load performance data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getFeedback = () => {
    if (!stats) return []
    const feedback = []
    
    if (stats.averageScore >= 90) {
      feedback.push('Excellent performance! Maintain consistency.')
    } else if (stats.averageScore >= 75) {
      feedback.push('Good progress. Focus on accuracy.')
    } else {
      feedback.push('Keep practicing. Review fundamentals.')
    }

    if (stats.improvement > 10) {
      feedback.push('Great improvement trend!')
    } else if (stats.improvement < 0) {
      feedback.push('Consider revisiting previous topics.')
    }

    if (performanceData.length > 0) {
      const avgTime = performanceData.reduce((sum, d) => sum + d.timeSpent, 0) / performanceData.length
      if (avgTime > 180) {
        feedback.push('Work on improving speed while maintaining accuracy.')
      }
    }

    return feedback
  }

  if (loading) {
    return <div className="text-center text-gray-600">Loading performance data...</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Performance Tracking</h1>

      {stats && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium">Total Quizzes</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.totalQuizzes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium">Average Score</h3>
            <p className="text-3xl font-bold text-green-600">{stats.averageScore}%</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium">Total Time</h3>
            <p className="text-3xl font-bold text-purple-600">
              {Math.round(stats.totalTimeSpent / 60)}m
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium">Improvement</h3>
            <p className="text-3xl font-bold text-orange-600">+{stats.improvement}%</p>
          </div>
        </div>
      )}

      {performanceData.length > 0 && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Score Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Time Spent</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="timeSpent" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Performance Data</h2>
        {performanceData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time Spent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {performanceData.map((data, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                      {data.score}%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {Math.round(data.timeSpent / 60)}m {data.timeSpent % 60}s
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No performance data yet. Complete quizzes to see your progress!</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Feedback & Tips</h2>
        <div className="space-y-3">
          {getFeedback().map((tip, index) => (
            <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-900">{tip}</p>
            </div>
          ))}
          {getFeedback().length === 0 && (
            <p className="text-gray-600">Complete more quizzes to receive personalized feedback.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Performance

