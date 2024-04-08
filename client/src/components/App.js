import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Header';
import MediaPage from './MediaPage';
import LogIn from './LogIn';
import LogOut from './LogOut';
import About from './About';
import Auth from './Auth';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setDarkMode(!darkMode);
    };

    return (
        
            <div className={darkMode ? 'dark-mode' : ''}>
            <Header toggleDarkMode={toggleDarkMode} />
            <Header exact path="/" component={Header} />
            <MediaPage path="/media" component={MediaPage} />
            <LogIn path="/login" component={LogIn} />
            <Auth/>
            <LogOut path="/logout" component={LogOut} />
            <About />
        </div>
    );
}

export default App;