import React from "react";
import "../Components.css";

function SearchBox({ onchange }) {
  const clickSearch = (e) => {
    if (e.key === "Enter") console.log("Feature Open Soon ...");
  };
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
