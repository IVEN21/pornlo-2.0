import React, { useState, useEffect } from "react";
import { useTrail, animated, useSpring, config } from "react-spring";
import { Waypoint } from "react-waypoint";
import { NavLink } from "react-router-dom";

//mid component - client comment

function saleBox(h4, span, h3, p, btn, classname) {
  return (
    <div className={`sale_box ${classname}`}>
      <h4>{h4}</h4>
      <span>{span}</span>
      <h3>{h3}</h3>
      <p>{p}</p>
      {classname !== "month_time_" ? (
        <button>{btn}</button>
      ) : (
          <NavLink to="/signup">
            <button
              style={{ textDecoration: "underline", border: "1px solid pink" }}
            >
              {btn}{" "}
            </button>
          </NavLink>
        )}
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
        "$-0.85",
        "Limited time at this price",
        "Buy Now",
        "life_time"
      )}
      {saleBox(
        "Monthly Menbership",
        "All access, low price",
        "$0.035/Mon",
        "Cancel anytime",
        "Subscribe now",
        "month_time"
      )}{" "}
      {saleBox(
        "Watching Free",
        "Just Create Acc lol",
        "FREE",
        "Come on dude",
        "Create Account",
        "month_time_"
      )}
    </div>
  );
}
//footer component
function footerComp() {
  return (
    <div className="prem_footer">
      <label>Terms</label>
      <label>Condition</label>
      <label>About</label>
      <label
        style={{ color: "pink", cursor: "pointer" }}
        onClick={() =>
          (window.location = "https://www.instagram.com/_yesloiven__/")
        }
      >
        AddMe
      </label>
    </div>
  );
}

//Component
function Premium(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [img, setImg] = useState(false);
  const { x } = useSpring({
    x: img ? 0 : 130,
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
        <a href="https://dribbble.com/shots/5866597-2018" target="_blank" style={{ color: "white", fontSize: "20px", margin: "0 0 0 5px" }}> - Img Credit</a>
        <div className="pre_top_right">
          <label>Oh yea, stepSis?</label>
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
    { p: "No Ads Lol!", id: 3 },
  ];
  const list_animation = useTrail(list.length, {
    from: {
      opacity: 0,
      transform: "translate3d(-400px,0,0)",
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
            zIndex: 20,
          }}
        >
          <img
            src={require("../images/chu.jpg")}
            className="pre_mid_img"
            alt=""
          />
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
             always cum myslef too quick after watching"
            </p>
            <p>Photo by Chu, fake accounting manager </p>
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
