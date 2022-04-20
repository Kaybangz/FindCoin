import React, { useContext, useLayoutEffect, useState } from "react";
import { AddBtnContext } from "../../AddBtnContext/AddBtnContext";
import { CurrencyContext } from "../../CurrencyContext/CurrencyContext";
import "./Watchlist.css";

const Watchlist = () => {
  const { symbol, currencyValue } = useContext(CurrencyContext);
  const { watchlisted, setWatchlisted } = useContext(AddBtnContext);

  const [isDeleted, setIsDeleted] = useState(false);

  //Delete items from the bookmarked array
  const deleteCoinHandler = (coin) => {
    const existInWatchlist = watchlisted.filter((item) => item.id !== coin.id);

    setWatchlisted(existInWatchlist);

    // setTimeout(() => setIsDeleted(false), 2300);
    
  };

  return (
    <main className="watchlist__wrapper">
      <section className="watchlist__container">
        {watchlisted.map((coin) => {
          return (
            <main className="watchlist_content_container" key={coin.id}>
              <div className="watchlist__content">
                <section className="coin_info">
                  <div className="coinImg">
                    {coin.image ? <img src={coin.image.small} alt="" /> : null}
                  </div>
                  <div className="name__ticker">
                    <p>{coin.name}</p>
                    <p>
                      {coin.symbol.toUpperCase()}/{currencyValue.toUpperCase()}
                    </p>
                  </div>
                </section>

                <div className="coinPrice">
                  {coin.market_data?.current_price ? (
                    <p>
                      Price: {symbol}
                      {coin.market_data.current_price[currencyValue.toLowerCase()].toLocaleString()}
                    </p>
                  ) : null}

                  {coin.market_data?.market_cap ? (
                    <p>
                      Mcap: {symbol}
                      {coin.market_data.market_cap[currencyValue.toLowerCase()].toLocaleString()}
                    </p>
                  ) : null}
                </div>
              </div>

              <button
                onClick={() => deleteCoinHandler(coin)}
                className="deleteBtn"
              >
                Delete from watchlist
              </button>
              {isDeleted && <p className="alert__msg">{coin.name} deleted</p>}
            </main>
          );
        })}
      </section>
    </main>
  );
};

export default Watchlist;
