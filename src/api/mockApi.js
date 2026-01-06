import { adminAccount, studentAccount, sampleQuizzes, sampleQuizResult, sampleInterviewSubmission } from '../data/sampleData.js'

// Simulate network delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// Storage keys
const STORAGE_KEYS = {
  USERS: 'ppp_users',
  QUIZZES: 'ppp_quizzes',
  QUIZ_RESULTS: 'ppp_quiz_results',
  INTERVIEW_SUBMISSIONS: 'ppp_interview_submissions',
  VIDEO_BLOBS: 'ppp_video_blobs',
  AUTH_TOKEN: 'ppp_auth_token',
  CURRENT_USER: 'ppp_current_user',
}

// Initialize sample data in localStorage
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([adminAccount, studentAccount]))
  }
  if (!localStorage.getItem(STORAGE_KEYS.QUIZZES)) {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(sampleQuizzes))
  }
  if (!localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS)) {
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify([sampleQuizResult]))
  }
  if (!localStorage.getItem(STORAGE_KEYS.INTERVIEW_SUBMISSIONS)) {
    localStorage.setItem(STORAGE_KEYS.INTERVIEW_SUBMISSIONS, JSON.stringify([sampleInterviewSubmission]))
  }
}

initStorage()

// Auth API
export const authApi = {
  // Student login
  loginStudent: async (credentials) => {
    await delay()
    const { username, password } = typeof credentials === 'object' ? credentials : { username: credentials, password: arguments[1] }
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]')
    const user = users.find(u => u.username === username && u.role === 'student')
    
    if (user && user.password === password) {
      const token = `token_${Date.now()}_${user.id}`
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
      return { success: true, user, token }
    }
    return { success: false, error: 'Invalid credentials' }
  },

  // Admin login (username + password only)
  loginAdmin: async (credentials) => {
    await delay()
    const { username, password } = typeof credentials === 'object'
      ? credentials
      : { username: credentials, password: arguments[1] }
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]')
    const user = users.find(u => u.username === username && u.role === 'admin')
    
    if (user && user.password === password) {
      const token = `token_${Date.now()}_${user.id}`
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
      return { success: true, user, token }
    }
    return { success: false, error: 'Invalid credentials' }
  },

  // Create student account
  createStudent: async (payload) => {
    await delay()
    const { username, password, fullName, phoneNumber, email, address } = typeof payload === 'object'
      ? payload
      : { username: payload, password: arguments[1] }
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]')
    
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Username already exists' }
    }
    
    const newUser = {
      id: `student_${Date.now()}`,
      username,
      password,
      role: 'student',
      name: fullName || username,
      fullName: fullName || username,
      phoneNumber: phoneNumber || '',
      email: email || '',
      address: address || '',
    }
    
    users.push(newUser)
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
    
    const token = `token_${Date.now()}_${newUser.id}`
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser))
    
    return { success: true, user: newUser, token }
  },

  // Create admin account (name, username, password only; password >= 8 chars)
  createAdmin: async (payload) => {
    await delay()
    const { username, password, fullName, name } = typeof payload === 'object'
      ? payload
      : { username: payload, password: arguments[1] }
    
    if (!password || password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters long' }
    }
    
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]')
    
    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Username already exists' }
    }
    
    const displayName = fullName || name || username
    const newUser = {
      id: `admin_${Date.now()}`,
      username,
      password,
      role: 'admin',
      name: displayName,
      fullName: displayName,
    }
    
    users.push(newUser)
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
    
    const token = `token_${Date.now()}_${newUser.id}`
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser))
    
    return { success: true, user: newUser, token }
  },

  // Get current user
  getCurrentUser: async () => {
    await delay(100)
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    
    if (token && userStr) {
      return { success: true, user: JSON.parse(userStr) }
    }
    return { success: false, user: null }
  },

  // Logout
  logout: async () => {
    await delay(100)
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
    return { success: true }
  },
}

// Quiz API
export const quizApi = {
  // Get all quizzes
  getQuizzes: async () => {
    await delay()
    const quizzes = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]')
    return { success: true, data: quizzes }
  },

  // Get quiz by ID
  getQuizById: async (quizId) => {
    await delay()
    const quizzes = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]')
    const quiz = quizzes.find(q => q.id === quizId)
    
    if (!quiz) {
      return { success: false, error: 'Quiz not found' }
    }
    return { success: true, data: quiz }
  },

  // Submit quiz results
  submitQuiz: async (result) => {
    await delay()
    const results = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS) || '[]')
    
    const newResult = {
      ...result,
      id: `result_${Date.now()}`,
      completedAt: new Date().toISOString(),
    }
    
    results.push(newResult)
    localStorage.setItem(STORAGE_KEYS.QUIZ_RESULTS, JSON.stringify(results))
    return { success: true, data: newResult }
  },

  // Get quiz results for a user
  getQuizResults: async (userId) => {
    await delay()
    const results = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS) || '[]')
    const userResults = results.filter(r => r.userId === userId)
    return { success: true, data: userResults }
  },
}

// Mock Interview API
export const interviewApi = {
  // Submit mock interview (video + metadata)
  submitInterview: async (submission) => {
    await delay()
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.INTERVIEW_SUBMISSIONS) || '[]')
    
    // Store video blob separately (in real app, this would be uploaded to server)
    if (submission.videoBlob) {
      const blobKey = `video_${Date.now()}`
      localStorage.setItem(`${STORAGE_KEYS.VIDEO_BLOBS}_${blobKey}`, submission.videoBlob)
      submission.videoBlobKey = blobKey
      delete submission.videoBlob // Remove blob from submission object
    }
    
    const newSubmission = {
      ...submission,
      id: `submission_${Date.now()}`,
      timestamp: new Date().toISOString(),
      status: 'pending',
    }
    
    submissions.push(newSubmission)
    localStorage.setItem(STORAGE_KEYS.INTERVIEW_SUBMISSIONS, JSON.stringify(submissions))
    return { success: true, data: newSubmission }
  },

  // Get interview submissions for a student
  getStudentSubmissions: async (studentId) => {
    await delay()
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.INTERVIEW_SUBMISSIONS) || '[]')
    const studentSubmissions = submissions.filter(s => s.studentId === studentId)
    return { success: true, data: studentSubmissions }
  },

  // Get all submissions (admin)
  getAllSubmissions: async () => {
    await delay()
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.INTERVIEW_SUBMISSIONS) || '[]')
    return { success: true, data: submissions }
  },

  // Get submission by ID
  getSubmissionById: async (submissionId) => {
    await delay()
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.INTERVIEW_SUBMISSIONS) || '[]')
    const submission = submissions.find(s => s.id === submissionId)
    
    if (!submission) {
      return { success: false, error: 'Submission not found' }
    }
    
    // Load video blob if exists
    if (submission.videoBlobKey) {
      const videoData = localStorage.getItem(`${STORAGE_KEYS.VIDEO_BLOBS}_${submission.videoBlobKey}`)
      if (videoData) {
        submission.videoBlobUrl = videoData // In real app, this would be a blob URL
      }
    }
    
    return { success: true, data: submission }
  },

  // Score submission (admin)
  scoreSubmission: async (submissionId, score, comment) => {
    await delay()
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.INTERVIEW_SUBMISSIONS) || '[]')
    const submission = submissions.find(s => s.id === submissionId)
    
    if (!submission) {
      return { success: false, error: 'Submission not found' }
    }
    
    submission.status = 'reviewed'
    submission.score = score
    submission.comment = comment
    submission.reviewedAt = new Date().toISOString()
    
    localStorage.setItem(STORAGE_KEYS.INTERVIEW_SUBMISSIONS, JSON.stringify(submissions))
    return { success: true, data: submission }
  },
}

// Performance API
export const performanceApi = {
  // Get performance data for charts
  getPerformanceData: async (userId) => {
    await delay()
    const results = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS) || '[]')
    const userResults = results.filter(r => r.userId === userId)
    
    // Return data points for chart (date, score, timeSpent)
    return {
      success: true,
      data: userResults.map((r, index) => ({
        date: new Date(r.completedAt).toISOString().split('T')[0],
        score: r.score,
        timeSpent: r.timeSpent,
      })),
    }
  },
}

// Admin API
export const adminApi = {
  // Create new quiz
  createQuiz: async (quiz) => {
    await delay()
    const quizzes = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZZES) || '[]')
    
    // Check if quiz with same ID exists
    if (quizzes.find(q => q.id === quiz.id)) {
      return { success: false, error: 'Quiz with this ID already exists' }
    }
    
    quizzes.push(quiz)
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes))
    return { success: true, data: quiz }
  },

  // Get all students
  getStudents: async () => {
    await delay()
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]')
    const students = users.filter(u => u.role === 'student')
    return { success: true, data: students }
  },

  // Get student performance
  getStudentPerformance: async (studentId) => {
    await delay()
    const results = JSON.parse(localStorage.getItem(STORAGE_KEYS.QUIZ_RESULTS) || '[]')
    const submissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.INTERVIEW_SUBMISSIONS) || '[]')
    
    const studentResults = results.filter(r => r.userId === studentId)
    const studentSubmissions = submissions.filter(s => s.studentId === studentId)
    
    // Calculate performance metrics
    const totalQuizzes = studentResults.length
    const avgScore = totalQuizzes > 0
      ? Math.round(studentResults.reduce((sum, r) => sum + r.score, 0) / totalQuizzes)
      : 0
    const avgTime = totalQuizzes > 0
      ? Math.round(studentResults.reduce((sum, r) => sum + r.timeSpent, 0) / totalQuizzes)
      : 0
    
    return {
      success: true,
      data: {
        studentId,
        totalQuizzes,
        averageScore: avgScore,
        averageTime: avgTime,
        quizResults: studentResults,
        interviewSubmissions: studentSubmissions,
      },
    }
  },
}
