import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchInput from "../../components/SearchInput/SearchInput";
import "./MainDisplay.css";
import CoinList from "./CoinList/CoinList";

const MainDisplay = () => {
  const [coinList, setCoinList] = useState([]);

  useEffect(() => {
    axios
      .get( 
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      )
      .then((res) => {
        setCoinList(res.data);
        console.log(res.data[0]);
      })
      .catch((err) => {
        throw new Error();
      });
  }, []);

  return (
    <main className="main__display">
      <div className="wrapper">
        <SearchInput />
        <CoinList coinList={coinList}/>
      </div>
    </main>
  );
};

export default MainDisplay;
