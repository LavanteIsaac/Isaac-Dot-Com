import React from 'react';
import Header from './Header';
import MediaPage from './MediaPage';
import LogIn from './LogIn';
import CreateAccount from './CreateAccount';
import LogOut from './LogOut';
import About from './About';

const App = () => {
    return (
        <div>
         
            <Header exact path="/" component={Header} />
            <MediaPage path="/media" component={MediaPage} />
            <LogIn path="/login" component={LogIn} />
            <CreateAccount path="/create-account" component={CreateAccount} />
            <LogOut path="/logout" component={LogOut} />
            <About path="/about" component={About} />
        </div>
    );
}

export default App;