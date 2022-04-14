import React from "react";
import './CoinItem.css';

const CoinItem = ({ coin }) => {
  return (
    <section className="coin__row">
      <p>{coin.market_cap_rank}</p>
      <div className="img__symbol">
        <img src={coin.image} alt="" />
        <p>{coin.symbol}</p>
      </div>
      <p>{coin.current_price}</p>
      <p>{coin.price_change_percentage_24h}</p>
      <p className="hide__mobile">{coin.total_volume}</p>
      <p className="hide__mobile">{coin.market_cap}</p>
    </section>
  );
};

export default CoinItem;
