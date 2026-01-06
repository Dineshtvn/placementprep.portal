import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { interviewApi } from '../api/mockApi.js'

const MockInterview = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  
  const [isRecording, setIsRecording] = useState(false)
  const [recordedBlob, setRecordedBlob] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [module, setModule] = useState('Coding')
  const [submitting, setSubmitting] = useState(false)
  const [stream, setStream] = useState(null)

  useEffect(() => {
    return () => {
      // Cleanup: stop camera on unmount
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl)
      }
    }
  }, [stream, videoUrl])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Could not access camera. Please check permissions.')
    }
  }

  const startRecording = () => {
    if (!stream) {
      alert('Please start camera first')
      return
    }

    chunksRef.current = []
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      setRecordedBlob(blob)
      const url = URL.createObjectURL(blob)
      setVideoUrl(url)
    }

    mediaRecorder.start()
    setIsRecording(true)
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      
      // Stop camera stream
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        setStream(null)
        if (videoRef.current) {
          videoRef.current.srcObject = null
        }
      }
    }
  }

  const handleSubmit = async () => {
    if (!recordedBlob) {
      alert('Please record a video first')
      return
    }

    setSubmitting(true)
    try {
      // Convert blob to base64 for localStorage storage (in production, upload to server)
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64data = reader.result
        
        const submission = {
          studentId: user.id,
          studentName: user.name,
          module,
          videoBlob: base64data, // Store as base64 in mock implementation
          transcript: 'Placeholder transcript. In production, use speech-to-text API.',
        }

        const response = await interviewApi.submitInterview(submission)
        if (response.success) {
          alert('Interview submitted successfully!')
          navigate('/dashboard')
        }
      }
      reader.readAsDataURL(recordedBlob)
    } catch (error) {
      console.error('Failed to submit interview:', error)
      alert('Failed to submit interview. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const resetRecording = () => {
    setRecordedBlob(null)
    setVideoUrl(null)
    chunksRef.current = []
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mock Interview</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <label htmlFor="module" className="block text-sm font-medium text-gray-700 mb-2">
          Select Module
        </label>
        <select
          id="module"
          value={module}
          onChange={(e) => setModule(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isRecording}
        >
          <option value="Coding">Coding</option>
          <option value="Aptitude">Aptitude</option>
          <option value="HR">HR</option>
          <option value="Core/DBMS">Core/DBMS</option>
        </select>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Camera</h2>
        
        <div className="mb-4">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full max-w-md mx-auto bg-black rounded"
            style={{ display: stream || videoUrl ? 'block' : 'none' }}
            aria-label="Camera preview"
          />
          {videoUrl && (
            <video
              src={videoUrl}
              controls
              className="w-full max-w-md mx-auto bg-black rounded mt-4"
              aria-label="Recorded video preview"
            />
          )}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {!stream && !videoUrl && (
            <button
              onClick={startCamera}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Start Camera
            </button>
          )}

          {stream && !isRecording && !videoUrl && (
            <>
              <button
                onClick={startRecording}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Start Recording
              </button>
              <button
                onClick={() => {
                  stream.getTracks().forEach(track => track.stop())
                  setStream(null)
                  if (videoRef.current) {
                    videoRef.current.srcObject = null
                  }
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
              >
                Stop Camera
              </button>
            </>
          )}

          {isRecording && (
            <button
              onClick={stopRecording}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 animate-pulse"
            >
              Stop Recording
            </button>
          )}

          {videoUrl && (
            <>
              <button
                onClick={resetRecording}
                className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
              >
                Record Again
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Interview'}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Instructions:</strong> Start your camera, then begin recording. 
          Answer interview questions clearly. After recording, preview your video 
          and submit when ready.
        </p>
      </div>
    </div>
  )
}

export default MockInterview

