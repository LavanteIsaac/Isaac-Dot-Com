import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from "./Header";
import MediaPage from "./MediaPage";
import LogIn from "./LogIn";
import CreateAccount from "./CreateAccount";
import LogOut from "./LogOut";

import "../index.css";

function App() {
  return (
    <div className="App">
      
        <Header />
        <LogIn exact path="/login" component={LogIn} />
        <CreateAccount path="/create-account" component={CreateAccount} />
        <LogOut path="/logout" component={LogOut} />
        <MediaPage exact path="/" component={MediaPage} />
      
    </div>
  );
}

export default App;