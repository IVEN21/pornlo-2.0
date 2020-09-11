import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCocktail, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../Common/SearchBox";
function Navbar({ user, toggleMenu }) {
  //LOGO
  const logo = (
    <Link className="navbar-brand" to="/pornlo/1">
      <div id="logo">
        <span>Pornlo</span>
        <FontAwesomeIcon
          icon={faCocktail}
          style={{ fontSize: "30px", color: "rgb(255, 201, 232)" }}
        />
      </div>
    </Link>
  );

  //MENU
  const menu = (
    <div className="menu" onClick={toggleMenu}>
      <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />
    </div>
  );

  //Searchbar Functionality
  const [query, setQuery] = useState("");
  const onSearch = ({ currentTarget }) => {
    setQuery(currentTarget.value);
  };
  const clickSearch = (e) => {
    if (e.key === "Enter") {
      window.location = window.location = `/porns/${query.trim()}/1`;
    }
  };
  const search_bar = (
    <SearchBox onchange={onSearch} value={query} clickSearch={clickSearch} />
  );

  //user login
  const logging = () => {
    if (user)
      return (
        <React.Fragment>
          <NavLink className="nav_item" to={`/profile/${user.name}`}>
            <FontAwesomeIcon icon={faUser} />
            {user.name}
          </NavLink>
          <NavLink className="nav_item" to="/logout">
            Logout
          </NavLink>
        </React.Fragment>
      );
    else
      return (
        <NavLink className="nav_item" to="/login">
          Login
        </NavLink>
      );
  };

  //Nav Items
  const nav_items = (
    <div className="nav_items">
      {logging()}
      <NavLink
        className={user && user.admin ? "nav_item" : "nav_item disabled"}
        to={user && user.admin ? "/api" : "/WhatAreYouTryingToDo???"}
      >
        API 
      </NavLink>
    </div>
  );

  return (
    <div id="navbar">
      {menu}
      {logo}
      {search_bar}
      {nav_items}
    </div>
  );
}

export default Navbar;
