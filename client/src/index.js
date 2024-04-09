import React from "react";
import ReactDOM from 'react-dom/client';
import  { RouterProvider, createBrowserRouter } from  "react-router-dom"
import App from "./components/App"
import LogIn from './components/LogIn';
import LogOut from "./components/LogOut"
import Wall from "./components/Wall"
import Auth from "./components/Auth"

import "./index.css";
// import reportWebVitals from './reportWebVitals';

const routes = [
  {
    path: '/login',
    element:  < LogIn />,
 },

{
  path: '/auth',
  element: <Auth />,

},

{
  path: '/app',
  element: <App/>,  
},


{
    path: '/logout',
    element: <LogOut/>,  
},

{
  path: '/wall',
  element: <Wall/>,
}

]
    
    const router = createBrowserRouter(routes)
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    );