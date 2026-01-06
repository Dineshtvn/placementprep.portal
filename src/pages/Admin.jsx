import { useState, useEffect } from 'react'
import { adminApi } from '../api/mockApi.js'

const Admin = () => {
  const [questions, setQuestions] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    category: '',
    difficulty: 'medium',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [questionsRes, metricsRes] = await Promise.all([
        adminApi.getAllQuestions(),
        adminApi.getMetrics(),
      ])
      if (questionsRes.success) setQuestions(questionsRes.data)
      if (metricsRes.success) setMetrics(metricsRes.data)
    } catch (error) {
      console.error('Failed to load admin data:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options]
    newOptions[index] = value
    setFormData({ ...formData, options: newOptions })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.options.some(opt => !opt.trim())) {
      alert('All options must be filled')
      return
    }
    try {
      const response = await adminApi.addQuestion(formData)
      if (response.success) {
        setQuestions([...questions, response.data])
        setFormData({
          category: '',
          difficulty: 'medium',
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          explanation: '',
        })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Failed to add question:', error)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Panel</h1>

      {metrics && (
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">{metrics.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium">Total Quizzes</h3>
            <p className="text-3xl font-bold text-green-600">{metrics.totalQuizzes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium">Total Interviews</h3>
            <p className="text-3xl font-bold text-purple-600">{metrics.totalInterviews}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-600 text-sm font-medium">Avg Score</h3>
            <p className="text-3xl font-bold text-orange-600">{metrics.averageScore}%</p>
          </div>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Questions Management</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            {showAddForm ? 'Cancel' : 'Add Question'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
              <textarea
                name="question"
                value={formData.question}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
              {formData.options.map((option, index) => (
                <div key={index} className="mb-2 flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={index}
                    checked={formData.correctAnswer === index}
                    onChange={(e) => setFormData({ ...formData, correctAnswer: parseInt(e.target.value) })}
                    className="cursor-pointer"
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Explanation</label>
              <textarea
                name="explanation"
                value={formData.explanation}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Add Question
            </button>
          </form>
        )}

        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q.id} className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {q.category}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                      {q.difficulty}
                    </span>
                  </div>
                  <p className="font-medium">{q.question}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin

