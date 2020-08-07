import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Spring } from "react-spring/renderprops";
class Login extends Component {
  state = {
    Username: "",
    Password: "",
  };

  //update state
  onchange = (e, credential) => {
    this.setState({ [credential]: e.currentTarget.value });
  };

  //check credentials empty
  validation = () => {
    const { Username, Password } = this.state;
    if (Username.length > 0 && Password.length > 0) return false;
    else return true;
  };

  //input field
  input = (credential) => {
    return (
      <React.Fragment>
        <label>{credential}</label>
        <input
          className="input_control"
          onChange={(e) => {
            this.onchange(e, credential);
          }}
        ></input>
      </React.Fragment>
    );
  };

  //login container with animation
  loginContainer = () => {
    return (
      <Spring
        from={{ marginTop: -300, opacity: 0 }}
        to={{ opacity: 1, marginTop: 0 }}
      >
        {(props) => (
          <div className="login_container" style={props}>
            {this.innerContainer()}
          </div>
        )}
      </Spring>
    );
  };

  //login inner container
  innerContainer = () => {
    return (
      <div className="login_innerContain">
        <span>Pornlo Login</span>
        {this.input("Username")}
        {this.input("Password")}
        <button disabled={this.validation()} onClick={this.login}>
          Login
        </button>
        <p>
          Don't have a account ? Click{" "}
          <NavLink
            to="/registration"
            className="regi_link"
            style={{ color: "pink" }}
          >
            Here.
          </NavLink>
        </p>
      </div>
    );
  };

  //submit login
  login = () => {};

  //render component
  render() {
    return <div className="login comp">{this.loginContainer()}</div>;
  }
}

export default Login;
