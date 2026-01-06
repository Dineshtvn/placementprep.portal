import { useState } from 'react'

const CodingQuestion = ({ question }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('python')
  const [isUnlocked, setIsUnlocked] = useState(false)

  const languages = [
    { key: 'c', label: 'C' },
    { key: 'cpp', label: 'C++' },
    { key: 'java', label: 'Java' },
    { key: 'python', label: 'Python' },
  ]

  const handleUnlock = () => {
    setIsUnlocked(true)
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Question Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{question.title}</h2>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                {question.category}
              </span>
              <span
                className={`px-3 py-1 rounded-md text-sm font-medium ${
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
          </div>
        </div>
      </div>

      {/* Question Description */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Problem Description</h3>
        <p className="text-gray-700 mb-4 whitespace-pre-line">{question.description}</p>
        
        {question.example && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h4 className="font-semibold text-gray-800 mb-2">Example:</h4>
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {question.example}
            </pre>
          </div>
        )}
      </div>

      {/* Solution Code */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Solution</h3>
          <div className="flex gap-2">
            {languages.map((lang) => (
              <button
                key={lang.key}
                onClick={() => setSelectedLanguage(lang.key)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  selectedLanguage === lang.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative bg-gray-900 rounded-lg p-4 overflow-x-auto">
          {!isUnlocked ? (
            <>
              {/* Blurred overlay */}
              <div className="relative">
                <div className="blur-sm select-none">
                  <pre className="text-sm text-gray-100 font-mono opacity-30">
                    <code>{question.solutions[selectedLanguage] || 'Solution not available'}</code>
                  </pre>
                </div>
                {/* Lock icon overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={handleUnlock}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Unlock solution"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <span className="font-semibold">Click to View Solution</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <pre className="text-sm text-gray-100 font-mono">
              <code>{question.solutions[selectedLanguage] || 'Solution not available'}</code>
            </pre>
          )}
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Tip:</strong> Try to understand the logic first, then code. Practice these questions 
            regularly to improve your problem-solving skills.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CodingQuestion
