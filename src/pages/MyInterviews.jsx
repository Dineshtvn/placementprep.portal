import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { interviewApi } from '../api/mockApi.js'

const MyInterviews = () => {
  const { user } = useAuth()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSubmissions()
  }, [])

  const loadSubmissions = async () => {
    try {
      const response = await interviewApi.getStudentSubmissions(user.id)
      if (response.success) {
        // Sort by timestamp, newest first
        const sorted = response.data.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        )
        setSubmissions(sorted)
      }
    } catch (error) {
      console.error('Failed to load submissions:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Interview Submissions</h1>

      {submissions.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">No interview submissions yet.</p>
          <p className="text-sm text-gray-500 mt-2">Submit an interview to see your results here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">{submission.module} Interview</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Submitted: {new Date(submission.timestamp).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded text-sm font-medium ${
                    submission.status === 'reviewed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {submission.status === 'reviewed' ? 'Reviewed' : 'Pending Review'}
                </span>
              </div>

              {submission.status === 'reviewed' && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-4 mb-3">
                    <div>
                      <p className="text-sm text-gray-600">Score</p>
                      <p className="text-3xl font-bold text-green-600">
                        {submission.score !== null ? `${submission.score}/100` : 'N/A'}
                      </p>
                    </div>
                  </div>
                  {submission.comment && (
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">Admin Feedback:</p>
                      <p className="text-gray-700 whitespace-pre-wrap">{submission.comment}</p>
                    </div>
                  )}
                  {submission.reviewedAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Reviewed on: {new Date(submission.reviewedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              {submission.status === 'pending' && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-yellow-800">
                    Your submission is pending review. You will receive feedback once an admin reviews it.
                  </p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  <strong>Transcript:</strong> {submission.transcript || 'No transcript available'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyInterviews

