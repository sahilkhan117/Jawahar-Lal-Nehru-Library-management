import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Public Pages
import Landing from './pages/public/Landing'
import Login from './pages/public/Login'

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard'
import StudentCatalog from './pages/student/StudentCatalog'
import StudentHistory from './pages/student/StudentHistory'
import StudentProfile from './pages/student/StudentProfile'
import StudentComplaints from './pages/student/StudentComplaints'

// Librarian Pages
import LibrarianPOS from './pages/librarian/LibrarianPOS'
import LibrarianStudents from './pages/librarian/LibrarianStudents'
import LibrarianInventory from './pages/librarian/LibrarianInventory'
import LibrarianDefaulters from './pages/librarian/LibrarianDefaulters'

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminComplaints from './pages/admin/AdminComplaints'
import AdminNotices from './pages/admin/AdminNotices'
import AdminStaff from './pages/admin/AdminStaff'

import AppLayout from './components/layout/AppLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Student Routes */}
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student/*" element={
            <AppLayout role="student">
              <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="catalog" element={<StudentCatalog />} />
                <Route path="history" element={<StudentHistory />} />
                <Route path="complaints" element={<StudentComplaints />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </AppLayout>
          } />
        </Route>

        {/* Protected Librarian Routes */}
        <Route element={<ProtectedRoute allowedRoles={['librarian']} />}>
          <Route path="/librarian/*" element={
            <AppLayout role="librarian">
              <Routes>
                <Route path="pos" element={<LibrarianPOS />} />
                <Route path="students" element={<LibrarianStudents />} />
                <Route path="inventory" element={<LibrarianInventory />} />
                <Route path="defaulters" element={<LibrarianDefaulters />} />
                <Route path="*" element={<Navigate to="pos" replace />} />
              </Routes>
            </AppLayout>
          } />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin/*" element={
            <AppLayout role="admin">
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="complaints" element={<AdminComplaints />} />
                <Route path="notices" element={<AdminNotices />} />
                <Route path="staff" element={<AdminStaff />} />
                <Route path="*" element={<Navigate to="dashboard" replace />} />
              </Routes>
            </AppLayout>
          } />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
