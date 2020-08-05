import React, { useState } from "react";
import "./App.css";
//components
import Navabr from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

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
      <Navabr toggleMenu={toggleMenu} user="iven" />
      <Sidebar onSide={onSide} menuClose={menuClosed} user="iven" />
      <header className="App-header">lols</header>
    </div>
  );
}

export default App;
