import React from "react";

const Consentment = () => {
  return (
    <div className="consentment comp">
      <div className="consentment_container">
        <h4> Contents are copyrighted, no production intended.</h4>
        <p style={{ margin: '0', fontSize: "21px" }}>Leave site if under 18</p>
        <p style={{ color: "#5a635e", textDecoration: "none" }}>Content may be subjective to men</p>
        <div onClick={() => (window.location = "/pornlo/1")}>Enter</div>
      </div>
    </div>
  );
};

export default Consentment;
