import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleDarkMode }) => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/app">MediaPage</Link></li>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/logout">Log Out</Link></li>
          <li><Link to="/wall">Fan Mail Wall</Link></li>
          <li>
            <button onClick={toggleDarkMode}>
              Dark Mode
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;