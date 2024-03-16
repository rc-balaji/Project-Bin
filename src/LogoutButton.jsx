// LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login'); // Use navigate instead of history.push
  };

  // Inline CSS for the button
  const buttonStyle = {
    cursor: 'pointer',
    backgroundColor: '#007bff', // Primary Blue
    color: '#ffffff', // White text
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    margin: '10px',
    transition: '0.2s', // Smooth transition for hover effect
  };

  // Add hover effect for button
  const hoverEffect = {
    onMouseEnter: (e) => (e.target.style.backgroundColor = '#0056b3'), // Darker blue on hover
    onMouseLeave: (e) => (e.target.style.backgroundColor = '#007bff'), // Back to original on mouse leave
  };

  return (
    <button
      onClick={handleLogout}
      style={buttonStyle}
      {...hoverEffect}
    >
      Logout
    </button>
  );
}

export default LogoutButton;
