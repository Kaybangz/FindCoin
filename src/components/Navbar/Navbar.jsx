import React from "react";
import "./Navbar.css";
import SearchInput from "../SearchInput/SearchInput";
import { Link } from "react-router-dom";
import LDmodeBtn from "../LDModeBtn/LDModeBtn";

const Navbar = ({toggleBtnClick, toggleTheme, isToggled}) => {
  return (
    <nav>
      <section className="nav__container">
        <Link to="/" className="home__link">
          <h1>
            Coin<span>Find</span>
          </h1>
        </Link>

        <div>
          <h2>Portfolio</h2>
        </div>

        <div className="nav__tools">
  
          <select name="currencies" id="currencies">
            <option value="ngn">NGN</option>
            <option value="usd">USD</option>
            <option value="dol">DOL</option>
            <option value="zmb">ZMB</option>
          </select>
          <LDmodeBtn/>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
