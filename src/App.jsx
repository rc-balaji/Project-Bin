import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate replace to="/dashboard" /> : <Login onLogin={handleLogin} />} />
        <Route path="/dashboard" element={user ? <Dashboard username={user} onLogout={handleLogout} /> : <Navigate replace to="/login" />} />
        <Route path="/" element={<Navigate replace to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
