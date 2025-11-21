import { type JSX } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SuperAdminLogin from './pages/SuperAdminLogin';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { Provider } from 'react-redux';
import { store } from './store';

const ProtectedRoute = ({ children }: { children: JSX.Element, role: string }) => {
  // In a real app, check auth state here. For now, relying on login redirect.
  // Ideally, check Redux state for authentication and role.
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Default redirect to Admin Login */}
          <Route path="/" element={<Navigate to="/admin/login" replace />} />

          {/* Public Login Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/super-admin/login" element={<SuperAdminLogin />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/dashboard"
            element={
              <ProtectedRoute role="super-admin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
