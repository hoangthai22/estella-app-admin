import React from "react";
import logo from "./../../assets/logo.jpg";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header__wrapper">
      <div className="header__logo">
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default Header;
