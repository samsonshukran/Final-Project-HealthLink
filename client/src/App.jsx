import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import MCH from './pages/MCH';
import HealthLink from './pages/HealthLink';
import SymptomCheckerPage from './pages/SymptomCheckerPage';
import HealthTips from './pages/HealthTips';
import HealthInfo from './pages/HealthInfo';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/mch" element={<MCH />} />
              <Route path="/healthlink" element={<HealthLink />} />
              <Route path="/symptom-checker" element={<SymptomCheckerPage />} />
              <Route path="/health-tips" element={<HealthTips />} />
              <Route path="/health-info" element={<HealthInfo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;