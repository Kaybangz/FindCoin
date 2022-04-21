import React, { useState, useLayoutEffect, useContext } from "react";
import axios from "axios";
import SearchInput from "../../components/SearchInput/SearchInput";
import "./MainDisplay.css";
import CoinList from "./CoinList/CoinList";
import { CurrencyContext } from "../../CurrencyContext/CurrencyContext";

const MainDisplay = () => {
  const {currencyValue} = useContext(CurrencyContext);

  const [coinList, setCoinList] = useState([]);

  const [loading, setLoading] = useState(false);

  const coinURL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyValue}&order=market_cap_desc&per_page=100&page=1&sparkline=false`

  const getCoins = async () => {
    try{
      const response = await axios.get(coinURL)
      .then(res => {
        setCoinList(res.data)
      })
      setLoading(true);
    }
    catch{
      throw new Error("There was an error");
    }
  }

  useLayoutEffect(() => {
    getCoins();
  }, [currencyValue]);

  const [searchValue, setSearchValue] = useState("");

  const searchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <main className="wrapper">
      <div className="container">
        <SearchInput
          searchValue={searchValue}
          searchValueChange={searchValueChange}
        />
        <CoinList coinList={coinList} searchValue={searchValue} loading={loading} />
      </div>
    </main>
  );
};

export default MainDisplay;
