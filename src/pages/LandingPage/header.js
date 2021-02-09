import React, { useState, useEffect } from "react";
import "./header.css";
import { CSSTransition } from "react-transition-group";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 700px)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
        <div className="container">
      {/* <img src={require("../assets/logo.png")} className="Logo" alt="logo" /> */}
      <button onClick={toggleNav} className="smallMenu">
        <span><i class="fas fa-bars"></i></span>
      </button>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
          <a href="/">Doctors</a>
          <a href="/">Developers</a>
          <a href="/">Pricing</a>

        </nav>
      </CSSTransition>
    
      </div>
    </header>
  );
}