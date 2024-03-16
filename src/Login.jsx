import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure this path matches the location of your CSS file

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin(username);
      history('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
      <div className="headerContainer">Bin Monitor</div>
      <div className="loginContainer">
        <div className="formContainer">
          <h2 className="header">Login to Dashboard</h2>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label className="label">Username:</label>
              <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="formGroup">
              <label className="label">Password:</label>
              <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
