import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useLayoutEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext/ThemeContext";
import MainDisplay from "./pages/MainDisplay/MainDisplay";
import SingleDisplay from "./pages/SingleDisplay/SingleDisplay";
import { AddBtnContext } from "./AddBtnContext/AddBtnContext";
import Watchlist from "./pages/Watchlist/Watchlist";
import { CurrencyContext } from "./CurrencyContext/CurrencyContext";

const App = () => {
  const [pageTheme, setPageTheme] = useState("darkTheme");
  const [isToggled, setIsToggled] = useState(false);

  const toggleTheme = () => {
    setIsToggled(!isToggled);
    setPageTheme((currTheme) =>
      currTheme === "lightTheme" ? "darkTheme" : "lightTheme"
    );
  };

  //State for handling watchlist button animation and alert messge
  const [add, setAdd] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [existInWatchlist, setExistInWatchlist] = useState(false);

  //Empty watchlist array that would be passed as props to the watchlist route
  const [watchlisted, setWatchlisted] = useState([]);

  //Saving watchlist array to local storage
  useLayoutEffect(() => {
    const watchlisted = localStorage.getItem("watchlisted");

    if (watchlisted) {
      setWatchlisted(JSON.parse(watchlisted));
    }
  }, []);

  useLayoutEffect(() => {
    localStorage.setItem("watchlisted", JSON.stringify(watchlisted));
  }, [watchlisted]);



  var [symbol, setSymbol] = useState("$");

  var [currencyValue, setCurrencyValue] = useState("usd");

  useLayoutEffect(() => {
    if(currencyValue === "usd"){
      setSymbol("$");
    }else if(currencyValue === "eur"){
      setSymbol("€");
    }else if(currencyValue === "ngn"){
      setSymbol("₦");
    }

  }, [currencyValue])


  return (
    <ThemeContext.Provider value={{ pageTheme, toggleTheme, isToggled }}>
      <AddBtnContext.Provider
        value={{ add, isAdded, existInWatchlist, setAdd, setIsAdded, setExistInWatchlist, watchlisted, setWatchlisted}}
      >
        <CurrencyContext.Provider
          value={{ currencyValue, setCurrencyValue, symbol }}
        >
          <main className="main__wrapper" id={pageTheme}>
            <Navbar toggleTheme={toggleTheme} isToggled={isToggled} />
            <Routes>
              <Route path="/" element={<MainDisplay />} />
              <Route
                path="/coin/:id"
                element={<SingleDisplay />}
              />
              <Route
                path="/watchlist"
                element={<Watchlist watchlisted={watchlisted} />}
              />
            </Routes>
          </main>
        </CurrencyContext.Provider>
      </AddBtnContext.Provider>
    </ThemeContext.Provider>
  );
};

export default App;
