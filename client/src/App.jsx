import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { FaWhatsapp } from 'react-icons/fa';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import Home from './pages/Home';
import StripeCheckoutMock from './pages/StripeCheckoutMock';

// Simple Auth Guard
const PrivateRoute = ({ children, role }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
};

/* Inner component so useLocation works inside <Router> */
function AppContent() {
  const location = useLocation();
  const showWhatsApp = location.pathname === '/';

  return (
    <>
      <Toaster position="top-right" />

      {/* Floating WhatsApp Button — visible only on the Home page */}
      {showWhatsApp && (
        <a
          href="https://wa.me/919345787942"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '60px',
            height: '60px',
            backgroundColor: '#25D366',
            color: 'white',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: '35px',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
            zIndex: 9999,
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <FaWhatsapp />
        </a>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment-gateway" element={<StripeCheckoutMock />} />

        <Route
          path="/admin/*"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/*"
          element={
            <PrivateRoute role="doctor">
              <DoctorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/*"
          element={
            <PrivateRoute role="patient">
              <PatientDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
