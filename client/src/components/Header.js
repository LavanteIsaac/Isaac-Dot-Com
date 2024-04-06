import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // You can also save the user's preference in local storage
  };

  return (
    <header className={darkMode ? 'dark-mode' : ''}>
      <nav>
        <ul>
          <li><Link to="/app">MediaPage</Link></li>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/logout">Log Out</Link></li>
          <li><Link to="/fan-mail-wall">Fan Mail Wall</Link></li>
          <li>
            <button onClick={toggleDarkMode}>
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;