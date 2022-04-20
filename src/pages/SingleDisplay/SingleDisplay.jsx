import React, { useState, useLayoutEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./SingleDisplay.css";
import axios from "axios";
import { Line } from "react-chartjs-2";
import DomPurify from "dompurify";
import AddBtn from "../../components/AddToWatchList/AddBtn";
import { AddBtnContext } from "../../AddBtnContext/AddBtnContext";
import { CurrencyContext } from "../../CurrencyContext/CurrencyContext";

const SingleDisplay = () => {
  //Destructure the props gotten from the AddBtnContext
  const { isAdded, existInWatchlist } = useContext(AddBtnContext);

  //Destructure the props gotten from CurrencyContext
  const { currencyValue, symbol } = useContext(CurrencyContext);

  //Destructure the id from the react-router-dom useParams
  const { id } = useParams();

  //State management for days
  const [days, setDays] = useState(1);

  //Api for displaying a single coin
  const url = `https://api.coingecko.com/api/v3/coins/${id}`;

  //Api for displaying a single coin chart
  const chartURL = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currencyValue}&days=${days}`;

  //State management for the single coin
  const [coin, setCoin] = useState({});

  //State management for the coin chart
  const [coinChart, setCoinChart] = useState([]);

  //Function for passing the single coin api to the coin state
  const fetchSingleCoin = async () => {
    const response = await axios.get(url);
    setCoin(response.data);
  };

  const fetchSingleCoinChart = async () => {
    const response = await axios.get(chartURL);
    setCoinChart(response.data.prices);
  };

  //Calling the functions in our useLayoutEffect
  useLayoutEffect(() => {
    fetchSingleCoin();
    console.log(coinChart);
  }, [url]);

  useLayoutEffect(() => {
    fetchSingleCoinChart();
  }, [days, currencyValue]);

  return (
    <main className="single_coin_wrapper">
      <article className="single_coin_container">
        <header className="name__container">
          <div>
            {" "}
            <h1 className="coin_name">{coin.name}</h1>
          </div>

          {/* WATCHLIST BUTTON */}
          <div className="watchlist">
            <AddBtn coin={coin} />
            <p>Add to watchlist</p>
          </div>
        </header>

        {/* COIN RANK */}
        <div className="content">
          <section className="coin_rank">
            <span className="rank__btn">Rank # {coin.market_cap_rank}</span>
          </section>

          {/* COIN INFO STARTS HERE */}
          <section className="info">
            <div className="coin__heading">
              {coin.image && <img src={coin.image.small} alt="" />}
              {coin.name && <p>{coin.name}</p>}
              {coin.symbol && (
                <p>
                  {coin.symbol.toUpperCase()}/{currencyValue.toUpperCase()}
                </p>
              )}
            </div>
            <div className="coin__price">
              {coin.market_data?.current_price && (
                <h2>
                  {symbol}
                  {coin.market_data.current_price[
                    currencyValue.toLowerCase()
                  ].toLocaleString()}
                </h2>
              )}
            </div>
          </section>
        </div>

        {/* COIN CHANGE PERCENTAGE STARTS HERE */}
        <section className="content__two">
          <table>
            <thead>
              <tr>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>14d</th>
                <th>30d</th>
                <th>60d</th>
                <th>1y</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {coin.market_data?.price_change_percentage_1h_in_currency && (
                    <p
                      className={
                        coin.market_data.price_change_percentage_1h_in_currency[
                          currencyValue.toLowerCase()
                        ].toFixed(2) < 1
                          ? "red-text"
                          : "green-text"
                      }
                    >
                      {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                        2
                      )}
                      %
                    </p>
                  )}
                </td>

                <td>
                  {coin.market_data
                    ?.price_change_percentage_24h_in_currency && (
                    <p
                      className={
                        coin.market_data.price_change_percentage_24h_in_currency[
                          currencyValue.toLowerCase()
                        ].toFixed(2) < 1
                          ? "red-text"
                          : "green-text"
                      }
                    >
                      {coin.market_data.price_change_percentage_24h_in_currency[
                        currencyValue.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  )}
                </td>

                <td>
                  {coin.market_data?.price_change_percentage_7d_in_currency && (
                    <p
                      className={
                        coin.market_data.price_change_percentage_7d_in_currency[
                          currencyValue.toLowerCase()
                        ].toFixed(2) < 1
                          ? "red-text"
                          : "green-text"
                      }
                    >
                      {coin.market_data.price_change_percentage_7d_in_currency[
                        currencyValue.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  )}
                </td>

                <td>
                  {coin.market_data
                    ?.price_change_percentage_14d_in_currency && (
                    <p
                      className={
                        coin.market_data.price_change_percentage_14d_in_currency[
                          currencyValue.toLowerCase()
                        ].toFixed(2) < 1
                          ? "red-text"
                          : "green-text"
                      }
                    >
                      {coin.market_data.price_change_percentage_14d_in_currency[
                        currencyValue.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  )}
                </td>

                <td>
                  {coin.market_data
                    ?.price_change_percentage_30d_in_currency && (
                    <p
                      className={
                        coin.market_data.price_change_percentage_30d_in_currency[
                          currencyValue.toLowerCase()
                        ].toFixed(2) < 1
                          ? "red-text"
                          : "green-text"
                      }
                    >
                      {coin.market_data.price_change_percentage_30d_in_currency[
                        currencyValue.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  )}
                </td>

                <td>
                  {coin.market_data
                    ?.price_change_percentage_60d_in_currency && (
                    <p
                      className={
                        coin.market_data.price_change_percentage_60d_in_currency[
                          currencyValue.toLowerCase()
                        ].toFixed(2) < 1
                          ? "red-text"
                          : "green-text"
                      }
                    >
                      {coin.market_data.price_change_percentage_60d_in_currency[
                        currencyValue.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  )}
                </td>

                <td>
                  {coin.market_data?.price_change_percentage_1y_in_currency && (
                    <p
                      className={
                        coin.market_data.price_change_percentage_1y_in_currency[
                          currencyValue.toLowerCase()
                        ].toFixed(2) < 1
                          ? "red-text"
                          : "green-text"
                      }
                    >
                      {coin.market_data.price_change_percentage_1y_in_currency[
                        currencyValue.toLowerCase()
                      ].toFixed(2)}
                      %
                    </p>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* COIN CHART STARTS HERE */}

        {/* <section className="content__three">
          <Line
            data={{
              labels: coinChart.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;

                    return days===1 ? time : date.toLocaleDateString()
              }),
            }}
          />
        </section> */}

        {/* COIN STATS STARTS HERE */}
        <section className="content__four">
          <div className="stats">
            <aside className="left">
              <div className="row">
                <h5>24 hour low</h5>
                {coin.market_data?.low_24h && (
                  <p>
                    {symbol}
                    {coin.market_data.low_24h[
                      currencyValue.toLowerCase()
                    ].toLocaleString()}
                  </p>
                )}
              </div>

              <div className="row">
                <h5>24 hour high</h5>
                {coin.market_data?.high_24h && (
                  <p>
                    {symbol}
                    {coin.market_data.high_24h[
                      currencyValue.toLowerCase()
                    ].toLocaleString()}
                  </p>
                )}
              </div>

              <div className="row">
                <h5>All time high</h5>
                {coin.market_data?.ath && (
                  <p>
                    {symbol}
                    {coin.market_data.ath[
                      currencyValue.toLowerCase()
                    ].toLocaleString()}
                  </p>
                )}
              </div>

              <div className="row">
                <h5>All time low</h5>
                {coin.market_data?.atl && (
                  <p>
                    {symbol}
                    {coin.market_data.atl[
                      currencyValue.toLowerCase()
                    ].toLocaleString()}
                  </p>
                )}
              </div>
            </aside>

            <aside className="right">
              <div className="row">
                <h5>Total Volume</h5>
                {coin.market_data && (
                  <p>
                    {symbol}
                    {coin.market_data.total_volume[
                      currencyValue.toLowerCase()
                    ].toLocaleString()}
                  </p>
                )}
              </div>

              <div className="row">
                <h5>Market Cap</h5>
                {coin.market_data?.market_cap && (
                  <p>
                    {symbol}
                    {coin.market_data.market_cap.usd.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="row">
                <h5>Total Supply</h5>
                {coin.market_data?.total_supply && (
                  <p>{coin.market_data.total_supply.toLocaleString()}</p>
                )}
              </div>

              <div className="row">
                <h5>Circulating Supply</h5>
                {coin.market_data && (
                  <p>{coin.market_data.circulating_supply.toLocaleString()}</p>
                )}
              </div>
            </aside>
          </div>
        </section>

        {/* COIN ABOUT STARTS HERE */}
        <section className="content__five">
          <div className="about__coin">
            <h3 className="about__header">About</h3>
            <p
              dangerouslySetInnerHTML={{
                __html: DomPurify.sanitize(
                  coin.description && coin.description.en
                ),
              }}
            ></p>
          </div>
        </section>
        {isAdded && (
          <p className="alert__msg">{coin.name} added to watchlist</p>
        )}
        {existInWatchlist && (
          <p className="alert__msg">{coin.name} already in watchlist</p>
        )}
      </article>
    </main>
  );
};

export default SingleDisplay;
