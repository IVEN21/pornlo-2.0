import React, { Component } from "react";
import { toast, ToastContainer } from "react-toastify";
import { login } from "../BackendServices/authService";
import http from "../BackendServices/http";
import { RingLoader } from "react-spinners";
class Signup extends Component {
  state = {
    Username: "",
    Password: "",
    angle: Math.floor(Math.random() * Math.floor(10)) * 30,
    varified: false,
    loading: false,
    ["First Name"]: "",
  };

  //update state
  onchange = (e, credential) => {
    this.setState({ [credential]: e.currentTarget.value });
  };

  //input field
  input = (credential) => {
    return (
      <React.Fragment>
        <label>{credential}</label>
        <input
          value={this.state[credential]}
          className="input_control login_input"
          onChange={(e) => {
            this.onchange(e, credential);
          }}
          type={credential.includes("Password") ? "password" : ""}
        ></input>
      </React.Fragment>
    );
  };

  //verify
  onVerify = () => {
    const { Username, Password, varified } = this.state;
    if (
      this.state["First Name"].length > 0 &&
      Username.length > 5 &&
      (Password.length > 14 || (Password.length > 7 && /\d/.test(Password))) &&
      varified
    )
      return true;
    return false;
  };

  //create account => call api
  onApi = async () => {
    this.setState({ loading: true });
    const { Username, Password } = this.state;
    if (Password !== this.state["Confirm Password"]) {
      toast.error("Passwords not match");
      this.setState({ loading: false });
      return;
    }
    try {
      const { data } = await http.post("http://localhost:5000/users", {
        name: this.state["First Name"],
        username: Username,
        password: Password,
      });
      console.log(data.username, Password);
      login(data.username, Password);
    } catch (err) {
      if (err.response.status === 409) toast.error("Username is taken");
      else toast.error("Network error");
      this.setState({
        loading: false,
        varified: false,
        Username: "",
        Password: "",
        ["Confirm Password"]: "",
        angle: Math.floor(Math.random() * Math.floor(10)) * 30,
      });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <div className="signup comp">
        <ToastContainer />

        <div className="signup_container">
          {this.state.loading && (
            <div className="signup_load">
              <RingLoader color="#00f03f" size="100px" />
            </div>
          )}
          <div style={{ textAlign: "center" }}>
            <span>Join Pornlo</span> <h1>Create Your Account</h1>
          </div>
          {this.input("First Name")}
          {this.input("Username")}
          <p style={{ fontSize: "14px", color: "#6a737d" }}>
            Make sure it's at least 6 characters
          </p>
          {this.input("Password")}
          <p style={{ fontSize: "14px", color: "#6a737d" }}>
            Make sure it's at least 15 characters OR at least 8 characters
            including a number.
          </p>
          {this.input("Confirm Password")}

          <h3>Please verify you are not a robot</h3>
          <div className="login_varify">
            <p>When the image is correct way up, click done</p>
            <img
              src={require("../images/wind.svg")}
              width="100px"
              height="100px"
              style={{ transform: `rotate(${this.state.angle}deg)` }}
            />

            <button
              onClick={() => this.setState({ angle: this.state.angle + 30 })}
            >
              Rotate
            </button>
            <button
              onClick={() => {
                if (this.state.angle % 360 === 0)
                  this.setState({ varified: true });
                else toast.error("Please try again");
              }}
            >
              Done
            </button>

            {this.state.varified && <div className="varified"></div>}
          </div>
          <div
            className={
              this.onVerify()
                ? "signup_create active"
                : "signup_create disabled"
            }
            onClick={this.onVerify() ? this.onApi : null}
          >
            Create Account
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
