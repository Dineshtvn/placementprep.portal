import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { interviewApi } from '../api/mockApi.js'

const AdminReview = () => {
  const { submissionId } = useParams()
  const navigate = useNavigate()
  const [submission, setSubmission] = useState(null)
  const [score, setScore] = useState('')
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSubmission()
  }, [submissionId])

  const loadSubmission = async () => {
    try {
      const response = await interviewApi.getSubmissionById(submissionId)
      if (response.success) {
        setSubmission(response.data)
        if (response.data.score !== null) {
          setScore(response.data.score.toString())
        }
        if (response.data.comment) {
          setComment(response.data.comment)
        }
      }
    } catch (error) {
      console.error('Failed to load submission:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!score || score < 0 || score > 100) {
      alert('Please enter a valid score between 0 and 100')
      return
    }

    setSubmitting(true)
    try {
      const response = await interviewApi.scoreSubmission(
        submissionId,
        parseInt(score),
        comment
      )
      
      if (response.success) {
        alert('Score submitted successfully!')
        navigate('/admin')
      }
    } catch (error) {
      console.error('Failed to submit score:', error)
      alert('Failed to submit score. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading submission...</div>
  }

  if (!submission) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Submission not found</p>
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
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/admin')}
        className="mb-4 text-blue-600 hover:text-blue-800"
      >
        ← Back to Admin Panel
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Review Interview Submission</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Submission Details</h2>
        <div className="space-y-2">
          <p><strong>Student:</strong> {submission.studentName}</p>
          <p><strong>Module:</strong> {submission.module}</p>
          <p><strong>Submitted:</strong> {new Date(submission.timestamp).toLocaleString()}</p>
          <p><strong>Status:</strong> 
            <span className={`ml-2 px-2 py-1 rounded text-sm ${
              submission.status === 'reviewed' 
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {submission.status}
            </span>
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Video Recording</h2>
        {submission.videoBlobUrl ? (
          <video
            src={submission.videoBlobUrl}
            controls
            className="w-full max-w-2xl mx-auto bg-black rounded"
            aria-label="Interview video recording"
          />
        ) : (
          <p className="text-gray-600">Video not available (mock implementation)</p>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Transcript</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-gray-700 whitespace-pre-wrap">
            {submission.transcript || 'No transcript available'}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Score & Feedback</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="score" className="block text-sm font-medium text-gray-700 mb-1">
              Score (0-100)
            </label>
            <input
              id="score"
              type="number"
              min="0"
              max="100"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter score"
            />
          </div>

          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter feedback comments..."
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Score'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminReview

