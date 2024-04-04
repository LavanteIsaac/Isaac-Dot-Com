import React, { useEffect, useState } from "react";
import Header from "./Header";
// import FanWall from "/Fanwall";
import Media from "./Media";

import "../index.css";



function App() {
  return <div className="App">
    <Header />
    {/* <FanWall /> */}
    <Media />
  </div>;
}

export default App;