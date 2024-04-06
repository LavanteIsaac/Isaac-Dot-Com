import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      // Handle new user registration
      console.log('Creating new user:', { username, email, password });
    } else {
      // Handle login with existing credentials
      console.log('Logging in with email and password:', { email, password });
    }
  };

  return (
    <div>
      <h2>Welcome to Isaac.com</h2>
      <p>Please {isNewUser ? 'create an account' : 'log in'} to continue</p>
      {isNewUser ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Create Account</button>
        </form>
      ) : (
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
      )}
      <div>
        {isNewUser ? (
          <p>Already have an account? <Link to="/">Log in</Link></p>
        ) : (
          <p>Don't have an account? <Link to="/create-account">Create one</Link></p>
        )}
      </div>
    </div>
  );
};

export default LogIn;