import React,{useContext} from "react";
import { CurrencyContext } from "../../../CurrencyContext/CurrencyContext";
import './CoinItem.css';

const CoinItem = ({ coin }) => {

  const { symbol } = useContext(CurrencyContext);

  return (
    <section className="coin__row">
      <p className="coin__rank">{coin.market_cap_rank}</p>
      <div className="img__symbol">
        <img src={coin.image} alt="" />
        <p>{coin.symbol.toUpperCase()}</p>
      </div>
      <p className="coin__price">{symbol}{coin.current_price.toLocaleString()}</p>
      <p id="percentage" className={coin.price_change_percentage_24h < 1 ? "red-text" : "green-text"}>{coin.price_change_percentage_24h.toFixed(1)}%</p>
      <p id="coin__volume" className="hide__mobile">{symbol}{coin.total_volume.toLocaleString()}</p>
      <p className="hide__mobile">${coin.market_cap.toLocaleString()}</p>
    </section>
  );
};

export default CoinItem;
