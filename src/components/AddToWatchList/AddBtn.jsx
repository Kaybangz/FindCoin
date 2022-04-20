import React, { useContext, useLayoutEffect } from "react";
import "./AddBtn.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { AddBtnContext } from "../../AddBtnContext/AddBtnContext";

const AddBtn = ({ coin }) => {
  const {add, setAdd, setIsAdded, setExistInWatchlist, watchlisted, setWatchlisted} = useContext(AddBtnContext);

   //Function for handling add to watchlist button
   const addBtnHandler = () => {
    //Check if coin already exist in watchlist
    let isInWatchlist = watchlisted.find((item) => {
      return item.id === coin.id;
    });

    //If coin already exist in the watchlisted array, do not add it again
    //If it doesn't exist in the array, then add coin...
    if (!isInWatchlist) {
      setWatchlisted([...watchlisted, { ...coin }]);
      setAdd(true);
      setIsAdded(true);
      setExistInWatchlist(false);
    } else {
      setExistInWatchlist(true);
    }

    //Timeout for button animation and alert text display
    setTimeout(() => setAdd(false), 500);
    setTimeout(() => setIsAdded(false), 2300);
    setTimeout(() => setExistInWatchlist(false), 2300);
  };

  return (
    <button
      id="addBtn"
      onClick={() => addBtnHandler(coin)}
      className={add ? "shake" : null}
    >
      {add ? <FaStar /> : <FaRegStar />}
    </button>
  );
};

export default AddBtn;
