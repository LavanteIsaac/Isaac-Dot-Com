import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Auth from './Auth';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login with entered credentials
    console.log('Logging in with email and password:', { email, password });
  };

  return (
    <div>
      <h2>Welcome to Isaac DOT com</h2>
      <p>Please log in to continue</p>
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
      <Header />
      <Auth />
    </div>
  );
};

export default LogIn;