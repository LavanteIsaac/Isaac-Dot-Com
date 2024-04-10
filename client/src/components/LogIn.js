import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making HTTP requests

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to your backend API endpoint for user creation
      const response = await axios.post('/users', { email, password });
      console.log('User created:', response.data);
      
      // Redirect the user to the appropriate page after successful user creation
      window.location.href = '/dashboard'; // Replace '/dashboard' with your desired destination
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Error creating user. Please try again later.'); // Set generic error message
    }
  };

  return (
    <div>
      <h2>Welcome to Isaac DOT com</h2>
      <p>Please log in to continue</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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