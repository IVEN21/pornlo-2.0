import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
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
import Consentment from "./Components/Consentment";
//auth
import { getCurrrentUser } from "./BackendServices/authService";
import PornFilter from "./Components/PornFilter";

function App() {
  //auth

  const user = getCurrrentUser();
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
      <Navabr toggleMenu={toggleMenu} user={user && user.name} />
      <Sidebar
        onSide={onSide}
        menuClose={menuClosed}
        user={user && user.name}
      />

      {/* Route Components */}
      <Switch>
  
        <Route path="/porns/:filter/:page" component={PornFilter} />
        <Route
          path="/upload"
          render={(props) => <Upload user={user && user} {...props} />}
        />
        <Route path="/login" component={Login} />
        <Route
          path="/pornlo"
          render={(props) => <Pornlo {...props} user={user && user} />}
        />

        <Route path="/checkout" component={Premium} />
        <Route path="/api" component={API} />
        <Route path="/signup" component={Signup} />
        <Route
          path="/logout"
          render={(props) => <Logout {...props} user={user} />}
        />
        <Route
          path="/profile/:user"
          render={(props) => <Profile user={user} {...props} />}
        />

        <Route exact path="/" component={Consentment} />
      </Switch>
    </div>
  );
}

export default App;
