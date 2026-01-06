# Placement Preparation Portal

A production-ready React.js SPA (Vite) for students to practice placement quizzes, take mock interviews with video recording, track performance, and for admins to review and score student submissions.

## Features

### Student Features
- **Signup/Login**: Create student account or login
- **Study Modules**: View PDFs for Coding, Aptitude, HR, and Core/DBMS modules
- **Practice Quizzes**: Take timed quizzes with immediate scoring and explanations
- **Mock Interviews**: Record video interviews using laptop camera, preview, and submit
- **Performance Tracking**: View performance metrics, improvement trends, and feedback

### Admin Features
- **Admin Account Creation**: Create admin accounts (password must be >= 12 characters)
- **Student Management**: View all students and their performance
- **Interview Review**: Review submitted mock interview videos/transcripts
- **Scoring**: Award marks (score + comment) to student submissions

## Tech Stack

- **React 18** with functional components and hooks
- **React Router v6** for routing
- **Context API** for state management
- **Tailwind CSS** for styling
- **Vitest** + **React Testing Library** for testing
- **Vite** as build tool

## Project Structure

```
placement-prep-portal/
├── src/
│   ├── api/
│   │   └── mockApi.js          # Mock API layer (localStorage-based)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── Quiz/
│   │       ├── Quiz.jsx
│   │       └── Quiz.test.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── AuthContext.test.jsx
│   ├── data/
│   │   └── sampleData.js        # Sample data (admin, student, quiz, etc.)
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Practice.jsx
│   │   ├── MockInterview.jsx
│   │   ├── AdminPanel.jsx
│   │   └── AdminReview.jsx
│   ├── routes.jsx               # Route definitions
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Setup & Run

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 3. Run Tests

```bash
npm test
```

## Sample Accounts

### Student Account
- **Username**: `dinesh`
- **Password**: `studentpass`

### Admin Account
- **Username**: `admin@college`
- **Password**: `AdminPassLong12!`

## Mock API & Data Storage

All data is stored in **localStorage** (no real backend). The mock API layer (`src/api/mockApi.js`) simulates network delays and provides Promise-based endpoints:

- **Auth**: `loginStudent`, `loginAdmin`, `createStudent`, `createAdmin`, `logout`, `getCurrentUser`
- **Quizzes**: `getQuizzes`, `getQuizById`, `submitQuiz`, `getQuizResults`
- **Interviews**: `submitInterview`, `getStudentSubmissions`, `getAllSubmissions`, `getSubmissionById`, `scoreSubmission`
- **Admin**: `getStudents`, `getStudentPerformance`
- **Performance**: `getPerformanceData`

### Video Storage

In this mock implementation, recorded videos are stored as **base64 strings** in localStorage. In production, you would:
1. Upload video blobs to a cloud storage service (AWS S3, Cloudinary, etc.)
2. Store only the video URL/reference in the database
3. Use IndexedDB for larger video files if needed client-side

## Extending the Backend

To connect to a real backend:

1. **Replace Mock API**: Update `src/api/mockApi.js` to make actual HTTP requests using `fetch` or `axios`
2. **Environment Variables**: Add API base URL to `.env` file
3. **Authentication**: Replace localStorage token with HTTP-only cookies or JWT tokens
4. **File Upload**: Implement proper video upload endpoints (multipart/form-data)
5. **Database**: Replace localStorage with actual database operations

Example API endpoint structure:
```javascript
// Replace mockApi functions with:
const API_BASE = import.meta.env.VITE_API_BASE_URL

export const authApi = {
  loginStudent: async (username, password) => {
    const response = await fetch(`${API_BASE}/auth/login/student`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    return response.json()
  },
  // ... other endpoints
}
```

## Testing

Two unit tests are included:

1. **Quiz Scoring Test** (`src/components/Quiz/Quiz.test.jsx`): Tests quiz scoring logic with various answer combinations
2. **AuthContext Test** (`src/context/AuthContext.test.jsx`): Tests login/logout functionality and localStorage token management

Run tests with:
```bash
npm test
```

## Accessibility

The app includes:
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Alt text for images/videos

## Responsive Design

Mobile-first design using Tailwind CSS breakpoints. The layout adapts to:
- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## Performance Tracking

The dashboard calculates:
- **Total Quizzes**: Number of completed quizzes
- **Average Score**: Mean score across all quizzes
- **Average Time**: Mean time per quiz
- **Improvement**: Score difference between first and last quiz
- **Trend Chart**: Simple SVG line chart showing performance over time

## Admin Password Policy

Admin account creation enforces:
- Minimum 12 characters
- Error message displayed if requirement not met

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## License

MIT
