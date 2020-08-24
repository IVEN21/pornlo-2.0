import React from "react";
import { toast } from "react-toastify";

function SearchBox({ onchange }) {
  const clickSearch = (e) => {
    if (e.key === "Enter") {
      toast.error("Feature Open Soon");
    }
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
