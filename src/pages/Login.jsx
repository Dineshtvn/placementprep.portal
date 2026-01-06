import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const Login = () => {
  const [studentUsername, setStudentUsername] = useState('')
  const [studentPassword, setStudentPassword] = useState('')
  const [studentFullName, setStudentFullName] = useState('')
  const [studentPhone, setStudentPhone] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [studentAddress, setStudentAddress] = useState('')
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [adminFullName, setAdminFullName] = useState('')
  const [studentError, setStudentError] = useState('')
  const [adminError, setAdminError] = useState('')
  const [studentFieldErrors, setStudentFieldErrors] = useState({})
  const [adminFieldErrors, setAdminFieldErrors] = useState({})
  const [studentIsSignup, setStudentIsSignup] = useState(false)
  const [adminIsSignup, setAdminIsSignup] = useState(false)

  const { login, signup } = useAuth()
  const navigate = useNavigate()

  const validateStudentSignup = () => {
    const errors = {}
    if (!studentFullName.trim()) errors.fullName = 'Full name is required'
    if (!/^\d{10}$/.test(studentPhone)) errors.phone = 'Phone must be exactly 10 digits'
    if (!studentEmail.trim() || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(studentEmail.trim())) errors.email = 'Enter a valid email'
    if (studentPassword.length < 8) errors.password = 'Password must be at least 8 characters'
    if (!studentUsername.trim()) errors.username = 'Username is required'
    return errors
  }

  const handleStudentSubmit = async (e) => {
    e.preventDefault()
    setStudentError('')
    setStudentFieldErrors({})

    if (studentIsSignup) {
      const errors = validateStudentSignup()
      if (Object.keys(errors).length) {
        setStudentFieldErrors(errors)
        return
      }
    }

    const result = studentIsSignup
      ? await signup({
          fullName: studentFullName.trim(),
          phoneNumber: studentPhone.trim(),
          email: studentEmail.trim(),
          address: studentAddress.trim(),
          username: studentUsername.trim(),
          password: studentPassword,
          role: 'student',
        })
      : await login(studentUsername.trim(), studentPassword, 'student')

    if (result.success) {
      navigate('/dashboard')
    } else {
      setStudentError(result.error || 'Authentication failed')
    }
  }

  const validateAdminSignup = () => {
    const errors = {}
    if (!adminFullName.trim()) errors.fullName = 'Full name is required'
    if (!adminUsername.trim()) errors.username = 'Username is required'
    if (adminPassword.length < 8) errors.password = 'Password must be at least 8 characters'
    return errors
  }

  const validateAdminLogin = () => {
    const errors = {}
    if (!adminUsername.trim()) errors.username = 'Username is required'
    if (adminPassword.length < 8) errors.password = 'Password must be at least 8 characters'
    return errors
  }

  const handleAdminSubmit = async (e) => {
    e.preventDefault()
    setAdminError('')
    setAdminFieldErrors({})

    const errors = adminIsSignup ? validateAdminSignup() : validateAdminLogin()
    if (Object.keys(errors).length) {
      setAdminFieldErrors(errors)
      return
    }

    const result = adminIsSignup
      ? await signup({
          fullName: adminFullName.trim(),
          username: adminUsername.trim(),
          password: adminPassword,
          role: 'admin',
        })
      : await login(adminUsername.trim(), adminPassword, 'admin')

    if (result.success) {
      navigate('/admin')
    } else {
      setAdminError(result.error || 'Authentication failed')
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="mt-10 text-center">
  <style>
    {`
      @keyframes typing {
        from { width: 0 }
        to { width: 100% }
      }
      @keyframes blink {
        50% { border-color: transparent }
      }
      .typewriter {
        overflow: hidden;
        color:grey;
        margin-bottom:20px;
        white-space: nowrap;
        border-right: 3px solid #2563eb;
        animation: typing 2s steps(40, end), blink 0.5s step-end infinite;
      }
    `}
  </style>

  <h2 className="inline-block typewriter text-2xl md:text-3xl font-semibold text-gray-800">
    Welcome to Placement Prep Portal, please login
  </h2>
</div>


      <div className="grid md:grid-cols-2 gap-8 items-start">

        {/* ================= STUDENT CARD ================= */}
        <div className="group bg-white p-8 rounded-xl shadow-md border-2 border-blue-200
                        transition-all duration-300 hover:shadow-xl">

          {/* Card Header */}
          <div className="text-center cursor-pointer">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">
              I am a Student 🧑🏽‍🎓
            </h2>
            <p className="text-sm text-gray-500">
              Hover / Click to login
            </p>
          </div>

          {/* Hidden Form */}
         <div className="max-h-0 overflow-hidden opacity-0
                group-hover:max-h-[900px]
                group-hover:opacity-100
                transition-[max-height,opacity] duration-200 ease-in-out mt-6">


            {studentError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                {studentError}
              </div>
            )}

            <form onSubmit={handleStudentSubmit} className="space-y-4">
              {studentIsSignup && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name (as per Aadhaar)
                    </label>
                    <input
                      type="text"
                      value={studentFullName}
                      onChange={(e) => setStudentFullName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                    {studentFieldErrors.fullName && (
                      <p className="text-red-600 text-xs mt-1">{studentFieldErrors.fullName}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={studentPhone}
                        onChange={(e) => setStudentPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="10-digit phone"
                      />
                      {studentFieldErrors.phone && (
                        <p className="text-red-600 text-xs mt-1">{studentFieldErrors.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                        placeholder="you@example.com"
                      />
                      {studentFieldErrors.email && (
                        <p className="text-red-600 text-xs mt-1">{studentFieldErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <textarea
                      value={studentAddress}
                      onChange={(e) => setStudentAddress(e.target.value)}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      rows="2"
                      placeholder="Full address"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={studentUsername}
                  onChange={(e) => setStudentUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="enter username"
                />
                {studentFieldErrors.username && (
                  <p className="text-red-600 text-xs mt-1">{studentFieldErrors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="enter password"
                  value={studentPassword}
                  onChange={(e) => setStudentPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                {studentFieldErrors.password && (
                  <p className="text-red-600 text-xs mt-1">{studentFieldErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                {studentIsSignup ? 'Sign Up' : 'Login'}
              </button>
            </form>

            <div className="mt-4 text-sm text-center">
              <button
                type="button"
                onClick={() => {
                  setStudentIsSignup(!studentIsSignup)
                  setStudentError('')
                }}
                className="text-blue-600 hover:underline"
              >
                {studentIsSignup
                  ? 'Already have an account? Login'
                  : "Don't have an account? Sign Up"}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t text-xs text-gray-500 text-center">
              <strong>Guest:</strong> dinesh / studentpass
            </div>
          </div>
        </div>

        {/* ================= ADMIN CARD ================= */}
        <div className="group bg-white p-8 rounded-xl shadow-md border-2 border-green-200
                        transition-all duration-500 hover:shadow-xl">

          {/* Card Header */}
          <div className="text-center cursor-pointer">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              I am an Admin 👨🏽‍💼
            </h2>
            <p className="text-sm text-gray-500">
              Hover / Click to login
            </p>
          </div>

          {/* Hidden Form */}
          <div className="max-h-0 overflow-hidden opacity-0
                          group-hover:max-h-[900px]
                          group-hover:opacity-100
                          transition-all duration-500 ease-in-out mt-6">

            {adminError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                {adminError}
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              {adminIsSignup && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={adminFullName}
                    onChange={(e) => setAdminFullName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                    placeholder="Enter full name"
                  />
                  {adminFieldErrors.fullName && (
                    <p className="text-red-600 text-xs mt-1">{adminFieldErrors.fullName}</p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                  placeholder="enter admin-username"
                />
                {adminFieldErrors.username && (
                  <p className="text-red-600 text-xs mt-1">{adminFieldErrors.username}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder='enter password'
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                />
                {adminFieldErrors.password && (
                  <p className="text-red-600 text-xs mt-1">{adminFieldErrors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
              >
                {adminIsSignup ? 'Create Admin Account' : 'Login'}
              </button>
            </form>

            <div className="mt-4 text-sm text-center">
              <button
                type="button"
                onClick={() => {
                  setAdminIsSignup(!adminIsSignup)
                  setAdminError('')
                }}
                className="text-green-600 hover:underline"
              >
                {adminIsSignup
                  ? 'Already have an account? Login'
                  : 'Create new admin account'}
              </button>
            </div>

            <div className="mt-4 pt-4 border-t text-xs text-gray-500 text-center">
              <strong>Guest:</strong> admin@college / AdminPassLong12!
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
