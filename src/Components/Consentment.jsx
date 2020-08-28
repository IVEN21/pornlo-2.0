import React from "react";

const Consentment = () => {
  return (
    <div className="consentment comp">
      <div className="consentment_container">
        <h4> Contents are copyrighted, no production intended.</h4>
        <p>Leave site if under 18</p>
        <div onClick={() => (window.location = "/pornlo/1")}>Click to enter</div>
      </div>
    </div>
  );
};

export default Consentment;
