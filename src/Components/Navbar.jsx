import React, { useState } from "react";
import "../Components.css";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCocktail, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../Common/SearchBox";
function Navbar({ user }) {
  //LOGO
  const logo = (
    <Link className="navbar-brand" to="/pornlo">
      <div id="logo">
        <span>Pornlo</span>
        <FontAwesomeIcon
          icon={faCocktail}
          style={{ fontSize: "30px", color: "pink" }}
        />
      </div>
    </Link>
  );

  //MENU
  const menu = (
    <div className="menu">
      <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />
    </div>
  );

  //Searchbar Functionality
  const [query, setQuery] = useState("");
  const onSearch = ({ currentTarget }) => {
    setQuery(currentTarget.value);
  };
  const search_bar = <SearchBox onchange={onSearch} value={query} />;

  //user login
  const logging = () => {
    if (user)
      return (
        <React.Fragment>
          <NavLink className="nav_item" to="/profile">
            <FontAwesomeIcon icon={faUser} />
            {user}
          </NavLink>
          <NavLink className="nav_item" to="/logout">
            Logout
          </NavLink>
        </React.Fragment>
      );
    else
      return (
        <NavLink className="nav_item" to="login">
          Login
        </NavLink>
      );
  };

  //Nav Items
  const nav_items = (
    <div className="nav_items">
      {logging()}
      <NavLink className="nav_item" to="/api">
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
