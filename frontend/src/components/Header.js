import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ email, loggedIn, onSignOut }) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo" />
      {loggedIn ? (
        <ul className="header__menu-items">
          <li className="header__menu-item header__nav-text_email">{email}</li>
          <li className="header__menu-item header__nav-text">
            <button
              className="header__nav-text header__nav-text_muted"
              onClick={onSignOut}
            >
              Log out
            </button>
          </li>
        </ul>
      ) : (
        <Link
          className="header__nav-text"
          to={location.pathname === "/signin" ? "/signup" : "/signin"}
        >
          {location.pathname === "/signin" ? "Sign up" : "Sign in"}
        </Link>
      )}
    </header>
  );
}

export default Header;
