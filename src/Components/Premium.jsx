import React from "react";

//top component
function topComp() {
  return (
    <div className="pre_top">
      <img
        src={require("../images/sexy_girl.gif")}
        className="pre_top_img"
        alt=""
      />
      <div className="pre_top_right">
        <label>Quality Porns Only</label>
        <p>
          Maybe you should stop jumping across multiple pornsites and wasting
          time searching that one porn
        </p>
        <p style={{ color: "#ffdbef", textDecoration: "underline" }}>
          We have the best filtered pornography
        </p>
      </div>
      <div className="pre_list">
        <span>Filtered Quality Porns</span>
        <span>Everyday Update</span>
        <span>No Ads</span>
      </div>
    </div>
  );
}

//mid component - client comment
function midComp() {
  return (
    <div className="pre_mid">
      <img src={require("../images/chu.jpg")} className="pre_mid_img" />
      <div className="pre_mid_right">
        <h3>A wise man once said</h3>
        <p>
          "I never had been so much pleasure after I found this pornsite. I cum
          myslef everytime two minutes after watching"
        </p>
        <p>Photo by Chu, Businesses Manager </p>
      </div>
    </div>
  );
}
function saleBox(h4, span, h3, p, btn, classname) {
  return (
    <div className={`sale_box ${classname}`}>
      <h4>{h4}</h4>
      <span>{span}</span>
      <h3>{h3}</h3>
      <p>{p}</p>
      <button>{btn}</button>
    </div>
  );
}

//bot component - sales
function botComp() {
  return (
    <div className="pre_bot">
      {saleBox(
        "Life Time Acess",
        "Own it forever!",
        "$149",
        "Limited time at this price",
        "Buy Now",
        "life_time"
      )}
      {saleBox(
        "Monthly Menbership",
        "All access, low price",
        "$6/Mon",
        "Cancel Anytime",
        "Subscribe now",
        "month_time"
      )}{" "}
      {saleBox(
        "Premium Free",
        "Try free for 30 days",
        "FREE",
        "-",
        "Create Account",
        "month_time"
      )}
    </div>
  );
}
//footer component
function footerComp() {
  return (
    <div className="prem_footer">
      <a href="/">Terms</a>
      <a href="/">About</a>
      <a href="/">Privacy</a>
    </div>
  );
}

//Component
function Premium(props) {
  return (
    <div className="premium comp">
      {topComp()}
      {midComp()}
      {botComp()}
      {footerComp()}
    </div>
  );
}

export default Premium;
