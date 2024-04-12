import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  const handleLogin = (username) => {
    localStorage.setItem("user", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate replace to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            user ? (
              <Dashboard username={user} onLogout={handleLogout} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={<Navigate replace to={user ? "/dashboard" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
