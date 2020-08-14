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

function App() {
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
      <Navabr toggleMenu={toggleMenu} />
      <Sidebar onSide={onSide} menuClose={menuClosed} />

      {/* Route Components */}
      <Switch>
        <Route path="/upload" component={Upload} />
        <Route path="/login" component={Login} />
        <Route path="/pornlo" component={Pornlo} />
        <Route path="/checkout" component={Premium} />
        <Redirect from="/" to="/pornlo" />
      </Switch>
    </div>
  );
}

export default App;
