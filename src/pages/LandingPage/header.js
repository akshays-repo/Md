import React, { useState, useEffect } from "react";
import "./header.css";
import { CSSTransition } from "react-transition-group";
import LogoImg from './assets/images/fossilmd.jpg'

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
          <div className="topHeader">
          <div className="logo">
      {/* <img src={require("../assets/fossilmd.jpg")} className="Logo" alt="logo" /> */}
      <img src={LogoImg} />
      </div>
      <button onClick={toggleNav} className="smallMenu">
        <span><i class="fas fa-bars"></i></span>
      </button>
      </div>
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
          <a href="/login">Login</a>

        </nav>
      </CSSTransition>
  
    
      </div>
    </header>
  );
}