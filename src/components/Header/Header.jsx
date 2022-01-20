import React from "react";
import { ReactComponent as Logo } from "./../../assets/logo.svg";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header__wrapper">
      <div className="header__logo">
        <Logo className="logo" />
      </div>
    </div>
  );
};

export default Header;
