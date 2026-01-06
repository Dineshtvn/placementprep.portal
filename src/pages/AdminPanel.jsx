import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adminApi, interviewApi } from '../api/mockApi.js'
import AdminUser from './AdminUser.jsx'

const AdminPanel = () => {
  const navigate = useNavigate()
  const [students, setStudents] = useState([])
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('panel')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [studentsRes, submissionsRes] = await Promise.all([
        adminApi.getStudents(),
        interviewApi.getAllSubmissions(),
      ])
      
      if (studentsRes.success) {
        setStudents(studentsRes.data)
      }
      
      if (submissionsRes.success) {
        // Sort by timestamp, newest first
        const sorted = submissionsRes.data.sort((a, b) => 
          new Date(b.timestamp) - new Date(a.timestamp)
        )
        setSubmissions(sorted)
      }
    } catch (error) {
      console.error('Failed to load admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    return status === 'reviewed' 
      ? 'bg-green-100 text-green-800'
      : 'bg-yellow-100 text-yellow-800'
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  if (activeTab === 'user') {
    return <AdminUser />
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Panel</h1>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('panel')}
            className={`px-3 sm:px-4 py-2 rounded-md transition-colors text-sm sm:text-base ${
              activeTab === 'panel'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Admin Panel
          </button>
          <button
            onClick={() => setActiveTab('user')}
            className={`px-3 sm:px-4 py-2 rounded-md transition-colors text-sm sm:text-base ${
              activeTab === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Admin User
          </button>
        </div>
      </div>

      <div className="mb-6">
        <Link
          to="/admin/create-quiz"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm sm:text-base"
        >
          + Create New Quiz
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Students ({students.length})</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {students.map((student) => (
              <div
                key={student.id}
                className="p-3 bg-gray-50 rounded hover:bg-gray-100"
              >
                <p className="font-medium">{student.name}</p>
                <p className="text-sm text-gray-600">{student.username}</p>
                <Link
                  to={`/admin/student/${student.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  View Performance →
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Interview Submissions ({submissions.length})</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {submissions.map((submission) => (
              <Link
                key={submission.id}
                to={`/admin/review/${submission.id}`}
                className="block p-3 bg-gray-50 rounded hover:bg-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{submission.studentName}</p>
                    <p className="text-sm text-gray-600">{submission.module}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(submission.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(submission.status)}`}>
                    {submission.status}
                  </span>
                </div>
                {submission.score !== null && (
                  <p className="text-sm text-green-600 mt-1">Score: {submission.score}/100</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {submissions.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">No interview submissions yet.</p>
        </div>
      )}
    </div>
  )
}

export default AdminPanel

