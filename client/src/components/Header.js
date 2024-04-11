import React from "react";
import { Link } from "react-router-dom";

function Header({ darkMode, onDarkModeToggle, logoutUser }) {
  const handleModeClick = () => onDarkModeToggle();
  const buttonText = darkMode ? "Light Mode" : "Dark Mode";

  function handleLogout() {
    fetch('/logout', {
      method: 'DELETE'
    }).then(resp => {
      if (resp.ok) {
        logoutUser(); // Call the logoutUser function passed as a prop
      }
    });
  }
  
  return (
    <header>
      <div>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={handleModeClick}>{buttonText}</button>
      </div>
      <nav>
        <ul>
          <li><Link to="/app">MediaPage</Link></li>
          <li><Link to="/wall">Fan Mail Wall</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;