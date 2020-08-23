import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Spring } from "react-spring/renderprops";
import { ToastContainer } from "react-toastify";
import { login } from "../BackendServices/authService";
import { RingLoader } from "react-spinners";
class Login extends Component {
  state = {
    Username: "",
    Password: "",
    loading: false,
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
          type={credential === "Password" ? "password" : ""}
          className="input_control"
          onChange={(e) => {
            this.onchange(e, credential);
          }}
          onKeyPress={
            !this.validation()
              ? (e) => {
                  if (e.key === "Enter") this.onLogin();
                }
              : null
          }
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

  //submit login
  onLogin = async () => {
    const { Username, Password } = this.state;
    this.setState({ loading: true });
    await login(Username, Password);
    this.setState({ loading: false });
  };

  //login inner container
  innerContainer = () => {
    return (
      <div className="login_innerContain">
        {this.state.loading && (
          <div className="login_load">
            <RingLoader color="#00ff44" />
          </div>
        )}
        <span>Pornlo Login</span>
        {this.input("Username")}
        {this.input("Password")}
        <button disabled={this.validation()} onClick={this.onLogin}>
          Login
        </button>
        <p>
          Don't have a account ? Click{" "}
          <NavLink to="/signup" className="regi_link" style={{ color: "pink" }}>
            Here.
          </NavLink>
        </p>
      </div>
    );
  };

  //render component
  render() {
    return (
      <div className="login comp">
        <ToastContainer />

        {this.loginContainer()}
      </div>
    );
  }
}

export default Login;
