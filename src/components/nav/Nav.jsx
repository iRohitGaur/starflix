import React from "react";
import CTA from "./cta/CTA";
import Logo from "./logo/Logo";
import "./nav.css";

function Nav() {
  return (
    <nav>
      <Logo />
      <CTA />
    </nav>
  );
}

export default Nav;
