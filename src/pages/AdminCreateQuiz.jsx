import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminApi } from '../api/mockApi.js'

const AdminCreateQuiz = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
    module: 'Coding',
    submodule: '',
    difficulty: 'Easy',
  })
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
    },
  ])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const modules = {
    Coding: ['Arrays', 'Strings', 'Loops & Control Flow', 'Recursion & Backtracking', 'Searching & Sorting', 'Data Structures', 'Time & Space Complexity'],
    Aptitude: ['Arithmetic', 'Algebra & Equations', 'Geometry & Mensuration', 'Permutation & Combination', 'Logical Reasoning', 'Data Interpretation'],
    Core: ['DBMS', 'Operating Systems', 'Computer Networks', 'OOPs & Design'],
    HR: ['Behavioral Questions', 'Situational Judgment', 'Communication Skills'],
    Mock: ['Full-Length Mock Tests', 'Short Mock Tests'],
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions]
    updated[index][field] = value
    setQuestions(updated)
  }

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions]
    updated[qIndex].options[oIndex] = value
    setQuestions(updated)
  }

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
      },
    ])
  }

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index))
    }
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Quiz title is required')
      return false
    }
    if (!formData.submodule.trim()) {
      setError('Submodule is required')
      return false
    }
    if (questions.length === 0) {
      setError('At least one question is required')
      return false
    }
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i]
      if (!q.question.trim()) {
        setError(`Question ${i + 1}: Question text is required`)
        return false
      }
      if (q.options.some(opt => !opt.trim())) {
        setError(`Question ${i + 1}: All options must be filled`)
        return false
      }
      if (!q.explanation.trim()) {
        setError(`Question ${i + 1}: Explanation is required`)
        return false
      }
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setSubmitting(true)
    try {
      const quiz = {
        id: `quiz_${Date.now()}`,
        title: formData.title,
        module: formData.module,
        submodule: formData.submodule,
        difficulty: formData.difficulty,
        questions: questions.map((q, idx) => ({
          id: idx + 1,
          question: q.question,
          options: q.options,
          correctAnswer: parseInt(q.correctAnswer),
          explanation: q.explanation,
        })),
      }

      const response = await adminApi.createQuiz(quiz)
      if (response.success) {
        alert('Quiz created successfully!')
        navigate('/admin')
      } else {
        setError(response.error || 'Failed to create quiz')
      }
    } catch (error) {
      console.error('Failed to create quiz:', error)
      setError('Failed to create quiz. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6">
      <button
        onClick={() => navigate('/admin')}
        className="mb-4 text-blue-600 hover:text-blue-800 text-sm sm:text-base"
      >
        ← Back to Admin Panel
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Create New Quiz</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Quiz Information</h2>
          
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Quiz Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Arrays - Two Pointers"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="module" className="block text-sm font-medium text-gray-700 mb-1">
                Module *
              </label>
              <select
                id="module"
                name="module"
                value={formData.module}
                onChange={(e) => {
                  handleInputChange(e)
                  setFormData(prev => ({ ...prev, submodule: '' }))
                }}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.keys(modules).map(module => (
                  <option key={module} value={module}>{module}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="submodule" className="block text-sm font-medium text-gray-700 mb-1">
                Submodule *
              </label>
              <select
                id="submodule"
                name="submodule"
                value={formData.submodule}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select submodule</option>
                {modules[formData.module]?.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty *
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Questions</h2>
            <button
              type="button"
              onClick={addQuestion}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 text-sm sm:text-base"
            >
              + Add Question
            </button>
          </div>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">Question {qIndex + 1}</h3>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIndex)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Text *
                </label>
                <textarea
                  value={q.question}
                  onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                  required
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter question text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options * (Select correct answer)
                </label>
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctAnswer === oIndex}
                      onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                      className="w-4 h-4"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      required
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Option ${oIndex + 1}`}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Explanation *
                </label>
                <textarea
                  value={q.explanation}
                  onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)}
                  required
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Explain why this answer is correct"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-sm sm:text-base"
          >
            {submitting ? 'Creating...' : 'Create Quiz'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AdminCreateQuiz

