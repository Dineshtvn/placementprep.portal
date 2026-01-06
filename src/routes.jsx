import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Practice from './pages/Practice.jsx'
import Coding from './pages/Coding.jsx'
import Quiz from './components/Quiz/Quiz.jsx'
import MockInterview from './pages/MockInterview.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import AdminReview from './pages/AdminReview.jsx'
import AdminCreateQuiz from './pages/AdminCreateQuiz.jsx'
import StudentPerformance from './pages/StudentPerformance.jsx'
import MyInterviews from './pages/MyInterviews.jsx'

// Private route wrapper - requires authentication
const PrivateRoute = ({ children, requireRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth()
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  // Role-based access control
  if (requireRole && user?.role !== requireRole) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />
  }
  
  return children
}

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth()
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <Login />} />
      
      {/* Student routes */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute requireRole="student">
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/practice"
        element={
          <PrivateRoute requireRole="student">
            <Practice />
          </PrivateRoute>
        }
      />
      <Route
        path="/practice/quiz/:quizId"
        element={
          <PrivateRoute requireRole="student">
            <Quiz />
          </PrivateRoute>
        }
      />
      <Route
        path="/coding"
        element={
          <PrivateRoute requireRole="student">
            <Coding />
          </PrivateRoute>
        }
      />
      <Route
        path="/mock-interview"
        element={
          <PrivateRoute requireRole="student">
            <MockInterview />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-interviews"
        element={
          <PrivateRoute requireRole="student">
            <MyInterviews />
          </PrivateRoute>
        }
      />
      
      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <PrivateRoute requireRole="admin">
            <AdminPanel />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/review/:submissionId"
        element={
          <PrivateRoute requireRole="admin">
            <AdminReview />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/student/:studentId"
        element={
          <PrivateRoute requireRole="admin">
            <StudentPerformance />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/create-quiz"
        element={
          <PrivateRoute requireRole="admin">
            <AdminCreateQuiz />
          </PrivateRoute>
        }
      />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default AppRoutes

