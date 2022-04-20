import React from "react";
import CoinItem from "../CoinItem/CoinItem";
import "./CoinList.css";
import { Link } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";

const CoinList = ({ coinList, searchValue, loading }) => {


  const searchedCoin = coinList.filter((coin) => {
    return coin.name.toLowerCase().includes(searchValue.toLowerCase()) || coin.symbol.toLowerCase().includes(searchValue.toLowerCase());
  })

  return (
    <main className="coinList__container">
      <React.Fragment>
        <section className="heading">
          <p>#</p>
          <p className="coin__name">Coin</p>
          <p className="coin__price">Price</p>
          <p>24h</p>
          <p className="hide__mobile">Trading Volume</p>
          <p className="hide__mobile">Market Cap</p>
        </section>

        {loading ?  searchedCoin.map((coin) => {
          return (
            <Link
              className="single_coin_link"
              to={`/coin/${coin.id}`}
              key={coin.id}
            >
              <CoinItem coin={coin} />
            </Link>
          );
        }) : <Loading/>}
      </React.Fragment>
    </main>
  );
};

export default CoinList;
