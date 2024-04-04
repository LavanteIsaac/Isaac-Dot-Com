import React, { useEffect, useState } from "react";
import Header from "./Header";
// import FanWall from "/Fanwall";
import MediaPage from "./MediaPage";

import "../index.css";



function App() {
  return <div className="App">
    <Header />
    {/* <FanWall /> */}
    <MediaPage />
  </div>;
}

export default App;