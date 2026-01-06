import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../api/mockApi.js'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check auth on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await authApi.getCurrentUser()
      if (response.success && response.user) {
        setUser(response.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username, password, role = 'student') => {
    try {
      // Support extended credential payloads without breaking existing calls
      const credential = typeof username === 'object' && username !== null
        ? username
        : { username, password }

      const response = await (role === 'admin'
        ? authApi.loginAdmin(credential)
        : authApi.loginStudent(credential))
      
      if (response.success) {
        setUser(response.user)
        return { success: true }
      }
      return { success: false, error: response.error || 'Login failed' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const signup = async (username, password, role = 'student') => {
    try {
      // Accept both legacy (username, password) and new object payloads
      const payload = typeof username === 'object' && username !== null
        ? username
        : { username, password, role }

      const response = role === 'admin'
        ? await authApi.createAdmin(payload)
        : await authApi.createStudent(payload)
      
      if (response.success) {
        setUser(response.user)
        return { success: true }
      }
      return { success: false, error: response.error || 'Signup failed' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = async () => {
    try {
      await authApi.logout()
      setUser(null)
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
