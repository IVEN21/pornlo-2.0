import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import "./Components.css";
//components
import Navabr from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Login from "./Components/Login";
import Pornlo from "./Components/Pornlo";
import Premium from "./Components/Premium";
import Upload from "./Components/Upload";
import API from "./Components/API";
import Signup from "./Components/Signup";
import Logout from "./Components/Logout";
import Profile from "./Components/Profile";
//auth
import { getCurrrentUser } from "./BackendServices/authService";

function App() {
  //auth

  var user = "";
  var admin = null;
  try {
    user = JSON.parse(getCurrrentUser()).name;
    admin = JSON.parse(getCurrrentUser()).admin;
  } catch (error) {
    console.log("can not get user");
  }

  //toggle menu
  const [onSide, setSide] = useState(false);
  const toggleMenu = () => {
    setSide(!onSide);
  };
  const menuClosed = () => {
    setSide(false);
  };
  return (
    <div className="App">
      {/* Universal Components */}
      <Navabr toggleMenu={toggleMenu} user={user} />
      <Sidebar onSide={onSide} menuClose={menuClosed} user={user} />

      {/* Route Components */}
      <Switch>
        <Route
          path="/upload"
          render={(props) => <Upload admin={admin} {...props} />}
        />
        <Route path="/login" component={Login} />
        <Route
          path="/pornlo"
          render={(props) => <Pornlo {...props} user={user} />}
        />
        <Route path="/checkout" component={Premium} />
        <Route path="/api" component={API} />
        <Route path="/signup" component={Signup} />
        <Route path="/logout" component={Logout} />
        <Route
          path="/profile/:user"
          render={(props) => <Profile user={user} {...props} />}
        />
        <Redirect from="/" to="/pornlo" />
      </Switch>
    </div>
  );
}

export default App;
