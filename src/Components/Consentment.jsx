import React from "react";

const Consentment = () => {
  return (
    <div className="consentment comp">
      <div className="consentment_container">
        <h4> Credit/copyright: <a style={{color:"#f0bdbd"}} href="https://www.pornhub.com" target="_blank"> pornhub.com</a>, <a target="_blank" href="https://www5.javmost.com/" style={{color:"#f0bdbd"}}>javmost.com</a>. Pure demo website, no production intended.</h4>
        <p style={{ margin: '0', fontSize: "21px" }}>Leave site if under 18</p>
        <p style={{ color: "#5a635e", textDecoration: "none" }}>Content may be subjective to men</p>
        <div onClick={() => (window.location = "/pornlo/1")}>Enter</div>
      </div>
    </div>
  );
};

export default Consentment;
