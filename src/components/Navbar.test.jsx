import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext.jsx'
import Navbar from './Navbar.jsx'

const renderWithRouter = (component, authValue) => {
  return render(
    <BrowserRouter>
      <AuthContext.Provider value={authValue}>
        {component}
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

describe('Navbar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login link when user is not authenticated', () => {
    const authValue = {
      isAuthenticated: false,
      user: null,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    }

    renderWithRouter(<Navbar />, authValue)
    
    expect(screen.getByText('Placement Prep Portal')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument()
  })

  it('renders navigation links when user is authenticated', () => {
    const authValue = {
      isAuthenticated: true,
      user: { id: 1, name: 'John Doe', role: 'student' },
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    }

    renderWithRouter(<Navbar />, authValue)
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Practice')).toBeInTheDocument()
    expect(screen.getByText('Mock Interviews')).toBeInTheDocument()
    expect(screen.getByText('Performance')).toBeInTheDocument()
    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('renders admin link for admin users', () => {
    const authValue = {
      isAuthenticated: true,
      user: { id: 1, name: 'Admin User', role: 'admin' },
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    }

    renderWithRouter(<Navbar />, authValue)
    
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })
})

