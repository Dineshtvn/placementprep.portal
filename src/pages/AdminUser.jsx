import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { authApi } from '../api/mockApi.js'

const AdminUser = () => {
  const { user } = useAuth()
  const [adminUsers, setAdminUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAdminUsers()
  }, [])

  const loadAdminUsers = async () => {
    try {
      // Get all users and filter admins
      const users = JSON.parse(localStorage.getItem('ppp_users') || '[]')
      const admins = users.filter(u => u.role === 'admin')
      setAdminUsers(admins)
    } catch (error) {
      console.error('Failed to load admin users:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Users</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Current Admin Users ({adminUsers.length})</h2>
        <div className="space-y-3">
          {adminUsers.map((admin) => (
            <div
              key={admin.id}
              className="p-4 bg-gray-50 rounded border border-gray-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{admin.name}</p>
                  <p className="text-sm text-gray-600">{admin.username}</p>
                  <p className="text-xs text-gray-500 mt-1">ID: {admin.id}</p>
                </div>
                {admin.id === user?.id && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm font-medium">
                    You
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {adminUsers.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">No admin users found.</p>
        </div>
      )}
    </div>
  )
}

export default AdminUser

