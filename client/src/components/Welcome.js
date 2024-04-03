import React from "react" 
// import {NavLink} from "react-router-dom"

function Welcome() {
    return (
      <div className="welcome-container">
        <h1 className="welcome-heading">Welcome to the land of Isaac</h1>
        <img
          className="isaac-image"
        //   src="insert image url"
          alt="CLassic Isaac"
        />
        {/* <NavLink className="get-bidding-link" to="/App">
          *~-CLICK ME TO GET BIDDING!-~*
        </NavLink> */}
      </div>
    );
  }