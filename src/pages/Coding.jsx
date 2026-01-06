import { useState, useEffect } from 'react'
import { codingQuestions, codingCategories } from '../data/sampleData.js'
import CodingQuestion from '../components/CodingQuestion.jsx'

const Coding = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter questions by category and search
  const filteredQuestions = codingQuestions.filter((q) => {
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Reset selected question when category/search changes
  useEffect(() => {
    setSelectedQuestion(null)
  }, [selectedCategory, searchQuery])

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Top 100 Coding Questions</h1>
        <p className="text-gray-600">
          Practice coding questions similar to PrepInsta. Master these to ace your placement interviews.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Question List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search coding questions"
            />

            {/* Category Filter */}
            <div className="mb-4">
              <h3 className="font-semibold text-gray-700 mb-2">Categories</h3>
              <div className="space-y-1">
                {codingCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Question List */}
            <div className="max-h-[600px] overflow-y-auto">
              <h3 className="font-semibold text-gray-700 mb-2">
                Questions ({filteredQuestions.length})
              </h3>
              <div className="space-y-1">
                {filteredQuestions.map((question) => (
                  <button
                    key={question.id}
                    onClick={() => setSelectedQuestion(question)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      selectedQuestion?.id === question.id
                        ? 'bg-blue-100 text-blue-800 border-2 border-blue-500'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-medium">{question.title}</span>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded text-xs ${
                          question.difficulty === 'Easy'
                            ? 'bg-green-100 text-green-800'
                            : question.difficulty === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {question.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{question.category}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Question Details */}
        <div className="lg:col-span-2">
          {selectedQuestion ? (
            <CodingQuestion question={selectedQuestion} />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 text-lg">
                Select a question from the list to view details and solutions
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} available
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Coding

