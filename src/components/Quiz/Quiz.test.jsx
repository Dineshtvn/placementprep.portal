import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import Quiz from './Quiz.jsx'
import { quizApi } from '../../api/mockApi.js'
import { useAuth } from '../../context/AuthContext.jsx'

// Mock dependencies
vi.mock('../../api/mockApi.js')
vi.mock('../../context/AuthContext.jsx', () => ({
  useAuth: vi.fn(),
}))

const mockUser = { id: 'student1', name: 'Test Student', role: 'student' }

const mockQuiz = {
  id: 'quiz1',
  title: 'Test Quiz',
  module: 'Coding',
  questions: [
    {
      id: 1,
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      explanation: '2 + 2 equals 4',
    },
    {
      id: 2,
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 2,
      explanation: 'Paris is the capital of France',
    },
  ],
}

describe('Quiz Component - Scoring Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useAuth.mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      loading: false,
    })
    
    // Mock quizApi
    quizApi.getQuizById.mockResolvedValue({ success: true, data: mockQuiz })
    quizApi.submitQuiz.mockResolvedValue({ success: true, data: { id: 'result1' } })
    
    // Mock window.confirm
    window.confirm = vi.fn(() => true)
  })

  it('calculates score correctly when all answers are correct', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/practice/quiz/quiz1', state: { quiz: mockQuiz } }]}>
        <Quiz />
      </MemoryRouter>
    )

    // Wait for quiz to load
    await waitFor(() => {
      expect(screen.getByText(/Question 1 of 2/i)).toBeInTheDocument()
    })

    // Answer first question correctly (option index 1 = "4")
    const firstOption = screen.getByText('4')
    fireEvent.click(firstOption)

    // Go to next question
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    // Answer second question correctly (option index 2 = "Paris")
    await waitFor(() => {
      expect(screen.getByText(/Question 2 of 2/i)).toBeInTheDocument()
    })
    const secondOption = screen.getByText('Paris')
    fireEvent.click(secondOption)

    // Submit quiz
    const submitButton = screen.getByText('Submit Quiz')
    fireEvent.click(submitButton)

    // Wait for results
    await waitFor(() => {
      expect(quizApi.submitQuiz).toHaveBeenCalled()
    })

    // Check that submitQuiz was called with correct score (100%)
    const submitCall = quizApi.submitQuiz.mock.calls[0][0]
    expect(submitCall.score).toBe(100)
    expect(submitCall.correctAnswers).toBe(2)
  })

  it('calculates score correctly when some answers are wrong', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/practice/quiz/quiz1', state: { quiz: mockQuiz } }]}>
        <Quiz />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Question 1 of 2/i)).toBeInTheDocument()
    })

    // Answer first question incorrectly (option index 0 = "3" instead of 1 = "4")
    const wrongOption = screen.getByText('3')
    fireEvent.click(wrongOption)

    // Go to next question
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    // Answer second question correctly
    await waitFor(() => {
      expect(screen.getByText(/Question 2 of 2/i)).toBeInTheDocument()
    })
    const correctOption = screen.getByText('Paris')
    fireEvent.click(correctOption)

    // Submit quiz
    const submitButton = screen.getByText('Submit Quiz')
    fireEvent.click(submitButton)

    // Check score calculation
    await waitFor(() => {
      expect(quizApi.submitQuiz).toHaveBeenCalled()
    })

    const submitCall = quizApi.submitQuiz.mock.calls[0][0]
    expect(submitCall.score).toBe(50) // 1 out of 2 correct = 50%
    expect(submitCall.correctAnswers).toBe(1)
  })

  it('calculates score correctly when no answers are provided', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/practice/quiz/quiz1', state: { quiz: mockQuiz } }]}>
        <Quiz />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(screen.getByText(/Question 1 of 2/i)).toBeInTheDocument()
    })

    // Don't answer any questions, just navigate and submit
    const nextButton = screen.getByText('Next')
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(screen.getByText(/Question 2 of 2/i)).toBeInTheDocument()
    })

    const submitButton = screen.getByText('Submit Quiz')
    fireEvent.click(submitButton)

    // Check that score is 0%
    await waitFor(() => {
      expect(quizApi.submitQuiz).toHaveBeenCalled()
    })

    const submitCall = quizApi.submitQuiz.mock.calls[0][0]
    expect(submitCall.score).toBe(0)
    expect(submitCall.correctAnswers).toBe(0)
  })
})
