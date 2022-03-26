import React from "react";
import starling from "assets/starling.svg";
import "./logo.css";

function Logo() {
  return (
    <div className="stf_logo_wrapper flex_row">
      <img className="stf_logo" src={starling} alt="logo" />
      <div className="stf_logo_text_wrapper">
        <span className="stf_logo_text">STARFLIX</span>
        <span className="stf_logo_caption">bird videos</span>
      </div>
    </div>
  );
}

export default Logo;
