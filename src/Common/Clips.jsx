import React, { useState, useEffect } from "react";
import { useTransition, animated, config, useSpring } from "react-spring";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCocktail,
  faTired,
  faHeartBroken,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Waypoint } from "react-waypoint";

function Clips({ clip }) {
  const [index, set] = useState(0);
  const [clip_on, clip_toggle] = useState(false);
  const [info_on, info_toggle] = useState(false);
  const [heart, setHeart] = useState(false);
  useEffect(() => {
    const interval =
      clip_on &&
      setInterval(() => {
        set((state) => (state + 1) % 3);
      }, 1200);
    return () => {
      clearInterval(interval);
    };
  }, [clip_on]);

  const heart_click = () => {
    setHeart(!heart);
    //backend
    console.log("call backend: ", !heart);
  };

  const heart_render = () =>
    heart ? (
      <FontAwesomeIcon
        icon={faHeart}
        className="clip_heart"
        style={{ color: "#87143b" }}
        onClick={heart_click}
      />
    ) : (
      <FontAwesomeIcon
        icon={faHeartBroken}
        className="clip_heart"
        onClick={heart_click}
      />
    );

  const clip_transitions = useTransition(
    clip.clips[index],
    (item) => item._id,
    {
      from: { opacity: 0, transform: "scale(1.1)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0.9)" },
      config: config.stiff,
    }
  );
  const info_animation = useSpring({
    opacity: info_on ? 1 : 0,
    config: config.gentle,
    transform: info_on ? "translate3d(0,0,0)" : "translate3d(400px,0,0)",
  });
  const info_render = () => (
    <animated.div className="clip_info" style={info_animation}>
      <div className="clip_info_bottom">
        {clip.attrs.map((attrs) => (
          <span className="clip_attr" key={attrs._id}>
            {attrs.attr}
          </span>
        ))}
      </div>
      <a href={clip.url} alt="#" className="clip_link">
        Link here
        <FontAwesomeIcon icon={faTired} style={{ color: "antiquewhite" }} />
      </a>
    </animated.div>
  );
  return (
    <React.Fragment>
      <div className="clip-container">
        {window.innerWidth < 650 && (
          <Waypoint
            bottomOffset="40%"
            topOffset="10%"
            onEnter={() => clip_toggle(true)}
            onLeave={() => clip_toggle(false)}
          />
        )}
        {clip_transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            className="clip"
            style={{ ...props, backgroundImage: `url(${item.url})` }}
            onMouseOver={() => clip_toggle(true)}
            onMouseLeave={() => clip_toggle(false)}
            onClick={() => set((index + 1) % 3)}
          />
        ))}
        <FontAwesomeIcon
          icon={faCocktail}
          className="cocktail"
          style={info_on ? { color: "black" } : { color: "pink" }}
          onClick={() => info_toggle(!info_on)}
        />
        {heart_render()}
        {info_render()}
      </div>
      
    </React.Fragment>
  );
}

export default Clips;