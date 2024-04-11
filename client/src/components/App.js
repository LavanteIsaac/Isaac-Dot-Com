import React, { useState } from "react";
import Header from "./Header";
import MediaPage from "./MediaPage"

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const logoutUser = () => {
    // Clear session token from local storage
    localStorage.removeItem("token");
    // Redirect to the login page or any other page
    window.location.href = "/login";
  };

  return (
    <div className={darkMode ? "dark-mode" : ""}>
      <Header darkMode={darkMode} onDarkModeToggle={toggleDarkMode} logoutUser={logoutUser} />
      <MediaPage />
    </div>
  );
}

export default App;