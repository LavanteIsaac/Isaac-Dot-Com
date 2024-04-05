import React, { useState, useEffect } from "react"


function Header() {
  const [ darkMode, setDarkMode ] = useState(true)
  const [user, setUser] = useState('')



  
  const handleModeCLick = () => setDarkMode(!darkMode)
  const buttonText = darkMode ? "Light Mode" : "Dark Mode"
  
    useEffect(() => {
    fetch("http://localhost:5555/users") 
        .then(r => r.json())
        .then(dbUsers => setUser(dbUsers))
      }, []);

    return (
     <header>
          <h1>
              <span className="logo">{"//"}</span>
              Isaac Cotton
          </h1>
          <button onClick={(handleModeCLick)}>{ buttonText }</button>
      </header>
      
  )
}

export default Header;