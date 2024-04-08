import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const LogIn = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewUser) {
      // Handle new user registration
      console.log('Creating new user:', { email, password });
    } else {
      // Handle login with existing credentials
      console.log('Logging in with email and password:', { email, password });
    }
  };

  return (
    <div>
      <h2>Welcome to Isaac DOT com</h2>
      <p>Please {isNewUser ? 'create an account' : 'log in'} to continue</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">{isNewUser ? 'Create Account' : 'Login'}</button>
      </form>
      <div>
        {isNewUser ? (
          <p>Already have an account? <Link to="/login" onClick={() => setIsNewUser(false)}>Log in</Link></p>
        ) : (
          <p>Don't have an account? <Link to="/create-account" onClick={() => setIsNewUser(true)}>Create one</Link></p>
        )}
      </div>
      <Header />
    </div>
  );
};

export default LogIn;