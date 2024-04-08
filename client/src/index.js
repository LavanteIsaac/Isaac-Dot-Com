import React from "react";
import ReactDOM from 'react-dom/client';
import  { RouterProvider, createBrowserRouter } from  "react-router-dom"
import App from "./components/App"
import Login from './components/LogIn';
import LogOut from "./components/LogOut"

import "./index.css";
// import reportWebVitals from './reportWebVitals';


const routes = [
  {
    path: '/LogIn',
    element:  < Login />,
 },


{
  path: '/App',
  element: <App/>,  
},

{
    path: '/LogOut',
    element: <LogOut/>,  
  },


]

const router = createBrowserRouter(routes)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);