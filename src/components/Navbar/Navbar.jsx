import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import LDmodeBtn from "../LDModeBtn/LDModeBtn";
import { CurrencyContext } from "../../CurrencyContext/CurrencyContext";

const Navbar = () => {
  const currencyContext = useContext(CurrencyContext);

  return (
    <nav>
      <section className="nav__container">
        <Link to="/" className="home__link">
          <h1>
            Find<span>Coin</span>
          </h1>
        </Link>

        <div>
          <Link to="/watchlist" className="watchlist__heading">
            <h2>Watchlist</h2>
          </Link>
        </div>

        <div className="nav__tools">
          <select
            name="currencies"
            id="currencies"
            value={currencyContext.currencyValue}
            onChange={(e) => currencyContext.setCurrencyValue(e.target.value)}
          >
                <option value="usd">
                  USD
                </option>

                <option value="eur">
                  EUR
                </option>

                <option value="ngn">
                  NGN
                </option>
              );
          </select>
          <LDmodeBtn />
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
