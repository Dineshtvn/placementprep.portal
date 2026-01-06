import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { interviewApi } from '../api/mockApi.js'

const MockInterviews = () => {
  const { user } = useAuth()
  const [prompts, setPrompts] = useState([])
  const [interviews, setInterviews] = useState([])
  const [showSchedule, setShowSchedule] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState(null)
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [promptsRes, interviewsRes] = await Promise.all([
        interviewApi.getPrompts(),
        interviewApi.getInterviews(user.id),
      ])
      if (promptsRes.success) setPrompts(promptsRes.data)
      if (interviewsRes.success) setInterviews(interviewsRes.data)
    } catch (error) {
      console.error('Failed to load data:', error)
    }
  }

  const handleSchedule = async (prompt) => {
    setSelectedPrompt(prompt)
    setShowSchedule(true)
  }

  const handleStartInterview = async () => {
    setLoading(true)
    try {
      const interviewData = {
        userId: user.id,
        promptId: selectedPrompt.id,
        prompt: selectedPrompt.question,
        type: selectedPrompt.type,
        status: 'in-progress',
        answer: '',
        transcript: '',
      }
      const response = await interviewApi.scheduleInterview(interviewData)
      if (response.success) {
        setInterviews((prev) => [response.data, ...prev])
        setSelectedPrompt(null)
        setShowSchedule(false)
        setAnswer('')
      }
    } catch (error) {
      console.error('Failed to schedule interview:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveAnswer = async (interviewId) => {
    try {
      await interviewApi.saveTranscript(interviewId, answer)
      setInterviews((prev) =>
        prev.map((i) =>
          i.id === interviewId ? { ...i, transcript: answer, status: 'completed' } : i
        )
      )
      setAnswer('')
      setSelectedPrompt(null)
      setShowSchedule(false)
    } catch (error) {
      console.error('Failed to save answer:', error)
    }
  }

  const handleEditInterview = (interview) => {
    setSelectedPrompt({ id: interview.promptId, question: interview.prompt, type: interview.type })
    setAnswer(interview.transcript || '')
    setShowSchedule(true)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Mock Interviews</h1>
        <button
          onClick={() => {
            setSelectedPrompt(null)
            setAnswer('')
            setShowSchedule(!showSchedule)
          }}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
        >
          {showSchedule ? 'Cancel' : 'New Interview'}
        </button>
      </div>

      {showSchedule && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {selectedPrompt ? 'Continue Interview' : 'Select a Prompt'}
          </h2>

          {!selectedPrompt ? (
            <div className="space-y-3">
              {prompts.map((prompt) => (
                <div
                  key={prompt.id}
                  className="p-4 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleSchedule(prompt)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                        {prompt.type}
                      </span>
                      <p className="font-medium mt-2">{prompt.question}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="font-semibold text-blue-900 mb-2">Question:</p>
                <p className="text-blue-800">{selectedPrompt.question}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Answer:
                </label>
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your answer here..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleStartInterview}
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Interview'}
                </button>
                <button
                  onClick={() => {
                    setSelectedPrompt(null)
                    setAnswer('')
                  }}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400"
                >
                  Change Prompt
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Interviews</h2>
        {interviews.length > 0 ? (
          <div className="space-y-4">
            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="p-4 border border-gray-200 rounded-md hover:bg-gray-50"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {interview.type}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          interview.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {interview.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(interview.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="font-medium text-gray-800 mb-2">{interview.prompt}</p>
                    {interview.transcript && (
                      <div className="mt-3 p-3 bg-gray-50 rounded">
                        <p className="text-sm font-medium text-gray-700 mb-1">Your Answer:</p>
                        <p className="text-gray-600">{interview.transcript}</p>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleEditInterview(interview)}
                    className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm"
                  >
                    {interview.transcript ? 'Edit' : 'Continue'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No interviews yet. Schedule one to get started!</p>
        )}
      </div>
    </div>
  )
}

export default MockInterviews

