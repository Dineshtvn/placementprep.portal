import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider, useAuth } from './AuthContext.jsx'
import { authApi } from '../api/mockApi.js'

// Mock the API
vi.mock('../api/mockApi.js', () => ({
  authApi: {
    getCurrentUser: vi.fn(),
    loginStudent: vi.fn(),
    loginAdmin: vi.fn(),
    logout: vi.fn(),
  },
}))

// Test component that uses auth
const TestComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth()

  const handleLogin = async () => {
    await login('testuser', 'password', 'student')
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div>
      <div data-testid="user">{user ? user.username : 'null'}</div>
      <div data-testid="authenticated">{isAuthenticated ? 'true' : 'false'}</div>
      <button data-testid="login-btn" onClick={handleLogin}>
        Login
      </button>
      <button data-testid="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('initializes with no user when no token exists', async () => {
    authApi.getCurrentUser.mockResolvedValue({ success: false, user: null })

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
      expect(screen.getByTestId('user')).toHaveTextContent('null')
    })
  })

  it('logs in student and stores token in localStorage', async () => {
    const mockUser = {
      id: 'student1',
      username: 'testuser',
      password: 'password',
      role: 'student',
      name: 'Test User',
    }

    authApi.getCurrentUser.mockResolvedValue({ success: false, user: null })
    authApi.loginStudent.mockResolvedValue({
      success: true,
      user: mockUser,
      token: 'mock_token_123',
    })

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    )

    // Initially not authenticated
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    })

    // Click login button
    const loginBtn = screen.getByTestId('login-btn')
    fireEvent.click(loginBtn)

    // Wait for login to complete
    await waitFor(() => {
      expect(authApi.loginStudent).toHaveBeenCalledWith('testuser', 'password')
    })

    await waitFor(() => {
      expect(localStorage.getItem('ppp_auth_token')).toBe('mock_token_123')
      expect(localStorage.getItem('ppp_current_user')).toBe(JSON.stringify(mockUser))
    })

    // Check that user is set
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('testuser')
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
    })
  })

  it('logs out and removes token from localStorage', async () => {
    const mockUser = {
      id: 'student1',
      username: 'testuser',
      role: 'student',
      name: 'Test User',
    }

    // Set initial auth state
    localStorage.setItem('ppp_auth_token', 'mock_token_123')
    localStorage.setItem('ppp_current_user', JSON.stringify(mockUser))

    authApi.getCurrentUser.mockResolvedValue({ success: true, user: mockUser })
    authApi.logout.mockResolvedValue({ success: true })

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    )

    // Wait for initial auth check
    await waitFor(() => {
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
      expect(screen.getByTestId('user')).toHaveTextContent('testuser')
    })

    // Click logout button
    const logoutBtn = screen.getByTestId('logout-btn')
    fireEvent.click(logoutBtn)

    // Wait for logout to complete
    await waitFor(() => {
      expect(authApi.logout).toHaveBeenCalled()
    })

    await waitFor(() => {
      expect(localStorage.getItem('ppp_auth_token')).toBeNull()
      expect(localStorage.getItem('ppp_current_user')).toBeNull()
    })

    // Check that user is cleared
    await waitFor(() => {
      expect(screen.getByTestId('user')).toHaveTextContent('null')
      expect(screen.getByTestId('authenticated')).toHaveTextContent('false')
    })
  })

  it('restores user from localStorage on mount', async () => {
    const mockUser = {
      id: 'student1',
      username: 'saveduser',
      role: 'student',
      name: 'Saved User',
    }

    localStorage.setItem('ppp_auth_token', 'saved_token')
    localStorage.setItem('ppp_current_user', JSON.stringify(mockUser))

    authApi.getCurrentUser.mockResolvedValue({ success: true, user: mockUser })

    render(
      <BrowserRouter>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </BrowserRouter>
    )

    // Should restore user from localStorage
    await waitFor(() => {
      expect(authApi.getCurrentUser).toHaveBeenCalled()
      expect(screen.getByTestId('user')).toHaveTextContent('saveduser')
      expect(screen.getByTestId('authenticated')).toHaveTextContent('true')
    })
  })
})
