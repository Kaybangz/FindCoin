import React from "react";
import './SearchInput.css'

const SearchInput = ({searchValue, searchValueChange}) => {
  return (
    <>
      <input className="search__input" type="text" placeholder="Search coin..."  value={searchValue} onChange={searchValueChange}/>
    </>
  );
};

export default SearchInput;
