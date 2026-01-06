import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { adminApi } from '../api/mockApi.js'

const StudentPerformance = () => {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [performance, setPerformance] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPerformance()
  }, [studentId])

  const loadPerformance = async () => {
    try {
      const response = await adminApi.getStudentPerformance(studentId)
      if (response.success) {
        setPerformance(response.data)
      }
    } catch (error) {
      console.error('Failed to load student performance:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (!performance) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Performance data not found</p>
        <button
          onClick={() => navigate('/admin')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Admin Panel
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate('/admin')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Admin Panel
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Student Performance</h1>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium">Total Quizzes</h3>
          <p className="text-3xl font-bold text-blue-600">{performance.totalQuizzes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium">Average Score</h3>
          <p className="text-3xl font-bold text-green-600">{performance.averageScore}%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium">Average Time</h3>
          <p className="text-3xl font-bold text-purple-600">
            {Math.round(performance.averageTime / 60)}m
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 text-sm font-medium">Interviews</h3>
          <p className="text-3xl font-bold text-orange-600">
            {performance.interviewSubmissions.length}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Quiz Results</h2>
          {performance.quizResults.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {performance.quizResults.map((result) => (
                <div
                  key={result.id}
                  className="p-3 bg-gray-50 rounded"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Quiz {result.quizId}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">{result.score}%</p>
                      <p className="text-sm text-gray-600">
                        {Math.round(result.timeSpent / 60)}m
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No quiz results yet.</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Interview Submissions</h2>
          {performance.interviewSubmissions.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {performance.interviewSubmissions.map((submission) => (
                <div
                  key={submission.id}
                  className="p-3 bg-gray-50 rounded"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{submission.module}</p>
                      <p className="text-sm text-gray-600">
                        {new Date(submission.timestamp).toLocaleDateString()}
                      </p>
                      <span
                        className={`inline-block mt-1 px-2 py-1 rounded text-xs ${
                          submission.status === 'reviewed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {submission.status}
                      </span>
                    </div>
                    {submission.score !== null && (
                      <p className="font-bold text-lg text-green-600">
                        {submission.score}/100
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No interview submissions yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentPerformance

