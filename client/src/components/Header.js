import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onToggleDarkMode, onLogout }) => {
  return (
    <header>
      <nav>
        <ul>
          <li><button onClick={onToggleDarkMode}>Dark Mode</button></li>
          <li><button onClick={onLogout}>Logout</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;