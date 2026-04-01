import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Market from './pages/Market';
import News from './pages/News';
import Wallet from './pages/Wallet';
import Settings from './pages/Settings';
import History from './pages/History';
import Auth from './pages/Auth';
import { UserProvider, useUser } from './context/UserContext';
import './App.css';

const AppContent = () => {
  const { isAuthenticated } = useUser();

  return (
    <Router>
      {/* {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : ( */}
        <div className="app-container">
          <Sidebar />
          <main className="main-content fade-in">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/market" element={<Market />} />
              <Route path="/news" element={<News />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/history" element={<History />} />
              {/* Login route available but not forced */}
              <Route path="/login" element={<Auth />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      {/* )} */}
    </Router>
  );
};

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
