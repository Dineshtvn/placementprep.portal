import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { quizApi } from '../api/mockApi.js'

const Practice = () => {
  const [quizzes, setQuizzes] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)
  const [selectedSubmodule, setSelectedSubmodule] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Module structure
  const modules = {
    Coding: {
      submodules: [
        'Arrays',
        'Strings',
        'Loops & Control Flow',
        'Recursion & Backtracking',
        'Searching & Sorting',
        'Data Structures',
        'Time & Space Complexity',
      ],
      color: 'blue',
    },
    Aptitude: {
      submodules: [
        'Arithmetic',
        'Algebra & Equations',
        'Geometry & Mensuration',
        'Permutation & Combination',
        'Logical Reasoning',
        'Data Interpretation',
      ],
      color: 'green',
    },
    Core: {
      submodules: [
        'DBMS',
        'Operating Systems',
        'Computer Networks',
        'OOPs & Design',
      ],
      color: 'purple',
    },
    HR: {
      submodules: [
        'Behavioral Questions',
        'Situational Judgment',
        'Communication Skills',
      ],
      color: 'orange',
    },
    Mock: {
      submodules: [
        'Full-Length Mock Tests',
        'Short Mock Tests',
      ],
      color: 'red',
    },
  }

  useEffect(() => {
    loadQuizzes()
  }, [])

  const loadQuizzes = async () => {
    try {
      const response = await quizApi.getQuizzes()
      if (response.success) {
        setQuizzes(response.data)
      }
    } catch (error) {
      console.error('Failed to load quizzes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartQuiz = (quiz) => {
    navigate(`/practice/quiz/${quiz.id}`, { state: { quiz } })
  }

  // Filter quizzes by module and submodule
  const getFilteredQuizzes = () => {
    if (!selectedModule) return []
    if (!selectedSubmodule) {
      return quizzes.filter(q => q.module === selectedModule)
    }
    return quizzes.filter(
      q => q.module === selectedModule && q.submodule === selectedSubmodule
    )
  }

  const getColorClasses = (color) => {
    const colorMap = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        button: 'bg-blue-600 hover:bg-blue-700',
        badge: 'bg-blue-100 text-blue-800',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-800',
        button: 'bg-green-600 hover:bg-green-700',
        badge: 'bg-green-100 text-green-800',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800',
        button: 'bg-purple-600 hover:bg-purple-700',
        badge: 'bg-purple-100 text-purple-800',
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        text: 'text-orange-800',
        button: 'bg-orange-600 hover:bg-orange-700',
        badge: 'bg-orange-100 text-orange-800',
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        text: 'text-red-800',
        button: 'bg-red-600 hover:bg-red-700',
        badge: 'bg-red-100 text-red-800',
      },
    }
    return colorMap[color] || colorMap.gray
  }

  if (loading) {
    return <div className="text-center py-12">Loading quizzes...</div>
  }

  // Show module selection
  if (!selectedModule) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Practice Quizzes</h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Select a module to view available quizzes</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {Object.entries(modules).map(([moduleName, moduleData]) => {
            const colors = getColorClasses(moduleData.color)
            const moduleQuizzes = quizzes.filter(q => q.module === moduleName)
            
            return (
              <button
                key={moduleName}
                onClick={() => setSelectedModule(moduleName)}
                className={`${colors.bg} ${colors.border} border-2 p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-all text-left w-full`}
              >
                <h2 className={`text-xl sm:text-2xl font-bold mb-2 ${colors.text}`}>{moduleName}</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-3">
                  {moduleData.submodules.length} submodules
                </p>
                <div className="flex items-center justify-between">
                  <span className={`${colors.badge} px-2 sm:px-3 py-1 rounded text-xs font-medium`}>
                    {moduleQuizzes.length} quizzes
                  </span>
                  <svg
                    className={`w-5 h-5 sm:w-6 sm:h-6 ${colors.text}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Show submodule selection
  if (!selectedSubmodule) {
    const moduleData = modules[selectedModule]
    const colors = getColorClasses(moduleData.color)
    const moduleQuizzes = quizzes.filter(q => q.module === selectedModule)

    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={() => setSelectedModule(null)}
            className="text-sm sm:text-base text-gray-600 hover:text-gray-800 flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Modules
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{selectedModule} Quizzes</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {moduleData.submodules.map((submodule) => {
            const submoduleQuizzes = moduleQuizzes.filter(q => q.submodule === submodule)
            
            return (
              <button
                key={submodule}
                onClick={() => setSelectedSubmodule(submodule)}
                className={`${colors.bg} ${colors.border} border-2 p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all text-left w-full`}
              >
                <h3 className={`text-base sm:text-lg font-semibold mb-2 ${colors.text}`}>{submodule}</h3>
                <span className={`${colors.badge} px-2 py-1 rounded text-xs font-medium`}>
                  {submoduleQuizzes.length} quizzes
                </span>
              </button>
            )
          })}
        </div>

        {/* Show all quizzes in module if any */}
        {moduleQuizzes.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">All {selectedModule} Quizzes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {moduleQuizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white p-3 sm:p-4 rounded-lg shadow-md border border-gray-200">
                  <h3 className="font-semibold text-sm sm:text-base mb-2">{quiz.title}</h3>
                  {quiz.submodule && (
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">Submodule: {quiz.submodule}</p>
                  )}
                  <p className="text-xs sm:text-sm text-gray-500 mb-3">{quiz.questions.length} questions</p>
                  <button
                    onClick={() => handleStartQuiz(quiz)}
                    className={`w-full ${colors.button} text-white py-2 text-sm sm:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2`}
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // Show quizzes for selected submodule
  const filteredQuizzes = getFilteredQuizzes()
  const moduleData = modules[selectedModule]
  const colors = getColorClasses(moduleData.color)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <button
          onClick={() => setSelectedSubmodule(null)}
          className="text-sm sm:text-base text-gray-600 hover:text-gray-800 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to {selectedModule}
        </button>
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
          {selectedModule} - {selectedSubmodule}
        </h1>
      </div>

      {filteredQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredQuizzes.map((quiz) => (
            <div key={quiz.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h2 className="text-lg sm:text-xl font-semibold mb-2">{quiz.title}</h2>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                {quiz.questions.length} questions
              </p>
              {quiz.difficulty && (
                <span
                  className={`inline-block mb-3 px-2 py-1 rounded text-xs ${
                    quiz.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-800'
                      : quiz.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {quiz.difficulty}
                </span>
              )}
              <button
                onClick={() => handleStartQuiz(quiz)}
                className={`w-full ${colors.button} text-white py-2 text-sm sm:text-base rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 mt-2`}
              >
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center">
          <p className="text-sm sm:text-base text-gray-600">No quizzes available for this submodule yet.</p>
          <button
            onClick={() => setSelectedSubmodule(null)}
            className="mt-4 text-sm sm:text-base text-blue-600 hover:text-blue-800"
          >
            ← Back to {selectedModule}
          </button>
        </div>
      )}
    </div>
  )
}

export default Practice
