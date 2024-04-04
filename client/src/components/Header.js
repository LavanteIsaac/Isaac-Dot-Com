import { useState } from "react"

function Header() {
  const [ darkMode, setDarkMode ] = useState(true)
  
  const handleModeCLick = () => setDarkMode(!darkMode)
  const buttonText = darkMode ? "Light Mode" : "Dark Mode"

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