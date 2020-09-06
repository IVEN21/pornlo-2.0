import React from "react";


function SearchBox({ onchange, clickSearch }) {
  
  return (
    <div className="search_container">
      <input
        className="searchbar"
        placeholder="Search Me ..."
        onChange={onchange}
        onKeyPress={clickSearch}
      ></input>
    </div>
  );
}

export default SearchBox;
