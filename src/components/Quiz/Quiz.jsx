import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { quizApi } from '../../api/mockApi.js'

const Quiz = () => {
  const { quizId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  
  const [quiz, setQuiz] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadQuiz()
  }, [quizId])

  useEffect(() => {
    if (!quiz) return

    const timer = setInterval(() => {
      setTimeElapsed((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [quiz])

  const loadQuiz = async () => {
    try {
      // Try to get quiz from location state first (passed from Practice page)
      if (location.state?.quiz) {
        setQuiz(location.state.quiz)
        setLoading(false)
        return
      }

      // Otherwise fetch by ID
      if (quizId) {
        const response = await quizApi.getQuizById(quizId)
        if (response.success) {
          setQuiz(response.data)
        }
      }
    } catch (error) {
      console.error('Failed to load quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    }
  }

  const calculateScore = () => {
    let correctCount = 0
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++
      }
    })
    return {
      correctCount,
      totalQuestions: quiz.questions.length,
      score: Math.round((correctCount / quiz.questions.length) * 100),
    }
  }

  const handleSubmit = async () => {
    if (window.confirm('Are you sure you want to submit the quiz?')) {
      const scoreData = calculateScore()
      const questionIds = quiz.questions.map((q) => q.id)
      const answerArray = questionIds.map((id) => answers[id] ?? -1)

      const quizResult = {
        userId: user.id,
        quizId: quiz.id,
        questions: questionIds,
        answers: answerArray,
        score: scoreData.score,
        correctAnswers: scoreData.correctCount,
        totalQuestions: scoreData.totalQuestions,
        timeSpent: timeElapsed,
      }

      try {
        const response = await quizApi.submitQuiz(quizResult)
        if (response.success) {
          setResult({
            ...quizResult,
            questionsWithAnswers: quiz.questions.map((q) => ({
              ...q,
              selectedAnswer: answers[q.id],
            })),
          })
          setIsCompleted(true)
        }
      } catch (error) {
        console.error('Failed to submit quiz:', error)
        alert('Failed to submit quiz. Please try again.')
      }
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (loading) {
    return <div className="text-center py-12">Loading quiz...</div>
  }

  if (!quiz) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">Quiz not found</p>
        <button
          onClick={() => navigate('/practice')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Practice
        </button>
      </div>
    )
  }

  if (isCompleted && result) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Quiz Results</h2>
          
          <div className="text-center mb-8">
            <div className={`text-6xl font-bold mb-2 ${
              result.score >= 75 ? 'text-green-600' : result.score >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {result.score}%
            </div>
            <p className="text-xl text-gray-600">
              {result.correctAnswers} out of {result.totalQuestions} correct
            </p>
            <p className="text-gray-500">Time: {formatTime(result.timeSpent)}</p>
          </div>

          <div className="space-y-6 mb-6">
            {result.questionsWithAnswers.map((q, index) => {
              const isCorrect = q.selectedAnswer === q.correctAnswer
              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border-2 ${
                    isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">
                      Question {index + 1}: {q.question}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded ${
                        isCorrect
                          ? 'bg-green-200 text-green-800'
                          : 'bg-red-200 text-red-800'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mt-4">
                    {q.options.map((option, optIndex) => {
                      let bgColor = 'bg-white'
                      if (optIndex === q.correctAnswer) {
                        bgColor = 'bg-green-200'
                      } else if (optIndex === q.selectedAnswer && !isCorrect) {
                        bgColor = 'bg-red-200'
                      }
                      
                      return (
                        <div
                          key={optIndex}
                          className={`p-3 rounded ${bgColor} border ${
                            optIndex === q.correctAnswer
                              ? 'border-green-500'
                              : optIndex === q.selectedAnswer
                              ? 'border-red-500'
                              : 'border-gray-200'
                          }`}
                        >
                          {option}
                          {optIndex === q.correctAnswer && (
                            <span className="ml-2 text-green-700 font-semibold">✓ Correct</span>
                          )}
                          {optIndex === q.selectedAnswer && !isCorrect && (
                            <span className="ml-2 text-red-700 font-semibold">✗ Your Answer</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded">
                    <p className="text-sm font-medium text-blue-900">Explanation:</p>
                    <p className="text-blue-800">{q.explanation}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/practice')}
              className="flex-1 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Practice
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="flex-1 bg-green-600 text-white py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const selectedAnswer = answers[currentQuestion.id]

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </h2>
          <div className="text-xl font-semibold text-blue-600">
            {formatTime(timeElapsed)}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-6 text-gray-800">
            {currentQuestion.question}
          </h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion.id, index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                aria-label={`Option ${index + 1}: ${option}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Previous question"
          >
            Previous
          </button>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next question"
            >
              Next
            </button>
          )}
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600 mb-2">Progress:</p>
          <div className="flex gap-1" role="progressbar" aria-valuenow={Object.keys(answers).length} aria-valuemax={quiz.questions.length}>
            {quiz.questions.map((q, index) => (
              <div
                key={q.id}
                className={`h-2 flex-1 rounded ${
                  answers[q.id] !== undefined
                    ? 'bg-green-500'
                    : index === currentQuestionIndex
                    ? 'bg-blue-500'
                    : 'bg-gray-200'
                }`}
                title={`Question ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz
