import React, { useState } from "react";
import { useTrail, animated, useSpring, config } from "react-spring";
import { Waypoint } from "react-waypoint";
//top component

//mid component - client comment

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
  const [img, setImg] = useState(false);
  const { x } = useSpring({
    x: img ? 0 : 100,
    config: config.wobbly,
  });
  const topComp = () => {
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
          {list_animation.map((props, index) => (
            <animated.span style={props} key={list[index].id}>
              {list[index].p}
            </animated.span>
          ))}
        </div>
      </div>
    );
  };
  const list = [
    { p: "Filtered Quality Porns", id: 1 },
    { p: "Everyday Update", id: 2 },
    { p: "No Ads", id: 3 },
  ];
  const list_animation = useTrail(list.length, {
    from: {
      opacity: 0,
      transform: "translate3d(-200px,0,0)",
    },

    to: {
      opacity: 1,
      transform: "translate3d(0,0,0)",
    },
  });
  const midComp = () => {
    return (
      <div className="pre_mid">
        <Waypoint bottomOffset="20%" onEnter={() => setImg(true)} />
        <animated.div
          style={{
            transform: x.interpolate((x) => `translate3d(${x * -1}%,0,0)`),
            zIndex: 100,
          }}
        >
          <img src={require("../images/chu.jpg")} className="pre_mid_img" />
        </animated.div>
        <animated.div
          style={{
            transform: x.interpolate((x) => `translate3d(${x}%,0,0)`),
          }}
        >
          <div className="pre_mid_right">
            <h3>A wise man once said</h3>
            <p>
              "I never had been so much pleasure after I found this pornsite. I
              cum myslef everytime two minutes after watching"
            </p>
            <p>Photo by Chu, Businesses Manager </p>
          </div>
        </animated.div>
      </div>
    );
  };
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
