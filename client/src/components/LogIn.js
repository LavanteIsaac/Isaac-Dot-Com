import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // 

const LogIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('/login', { username, password });
      
      if (response.status === 200) {
     
        window.location.href = '/app';
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Error logging in. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Welcome to Isaac DOT com</h2>
      <p>Please log in to continue</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
      <div>
        Don't have an account? <Link to="/auth">Create one</Link>
      </div>
    </div>
  );
};

export default LogIn;