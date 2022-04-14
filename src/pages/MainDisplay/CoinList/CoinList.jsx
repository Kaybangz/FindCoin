import React from "react";
import CoinItem from "../CoinItem/CoinItem";
import './CoinList.css';

const CoinList = ({ coinList }) => {
  return (
    <main className="coinList__container">
      <React.Fragment>
        <section className="heading">
          <p>#</p>
          <p className="coin__name">Coin</p>
          <p className="coin__price">Price</p>
          <p>24h</p>
          <p className="hide__mobile">Volume</p>
          <p className="hide__mobile">Market Cap</p>
        </section>

        {coinList.map((coin) => {
          return <CoinItem key={coin.id} coin={coin} />;
        })}
      </React.Fragment>
    </main>
  );
};

export default CoinList;
