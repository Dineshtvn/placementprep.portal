import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import AppRoutes from './routes.jsx'
import Navbar from './components/Navbar.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
