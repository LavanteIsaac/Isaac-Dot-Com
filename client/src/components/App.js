import React, { useState } from "react";
import Header from "./Header";
import MediaPage from "./MediaPage"

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const logoutUser = () => {
   
    localStorage.removeItem("token");
  
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