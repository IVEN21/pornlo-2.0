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
import {
  localClipSave,
  localClipfetch,
  getCurrrentUser,
} from "../BackendServices/authService";
import { toast } from "react-toastify";

function Clips({ clip, user }) {
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

  useEffect(() => {
    const localLikes = JSON.parse(localClipfetch());
    if (localLikes) {
      for (var i = 0; i < localLikes.length; i++) {
        if (localLikes[i] === clip._id || heart) {
          setHeart(true);
        }
      }
    }
  });

  const heart_click = (clipID) => {
    setHeart(!heart);
    localClipSave(clipID);
  };

  const heart_render = () => {
    if (user) {
      if (heart) {
        return (
          <FontAwesomeIcon
            icon={faHeart}
            className="clip_heart"
            style={{ color: "#87143b" }}
            onClick={() => heart_click(clip._id)}
          />
        );
      }
      return (
        <FontAwesomeIcon
          icon={faHeartBroken}
          className="clip_heart"
          style={{ color: "#49364d" }}
          onClick={() => heart_click(clip._id)}
        />
      );
    }
  };

  const clip_transitions = useTransition(
    clip.clip_images[index],
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
  const link_access = () => {
    if (!user) return "/login";
    return clip.clip_url;
  };

  const info_render = () => (
    <animated.div className="clip_info" style={info_animation}>
      <div className="clip_info_bottom">
        {clip.clip_tags.map((attrs, index) => (
          <span
            className="clip_attr"
            key={attrs._id}
            onClick={() =>
              (window.location = `/porns/${attrs.toLowerCase()}/1`)
            }
          >
            {attrs}
          </span>
        ))}
      </div>
      <a
        href={link_access()}
        alt="#"
        className="clip_link"
        target={getCurrrentUser() && getCurrrentUser().approved && "_blank"}
      >
        Link here
        <FontAwesomeIcon
          icon={faTired}
          style={{ color: "antiquewhite", paddingLeft: "3px" }}
        />
      </a>
    </animated.div>
  );
  return (
    <React.Fragment>
      <div className="clip-container">
        {window.innerWidth < 715 && (
          <Waypoint
            topOffset="10%"
            bottomOffset="55%"
            onEnter={() => clip_toggle(true)}
            onLeave={() => clip_toggle(false)}
          />
        )}
        {clip_transitions.map(({ item, props, key }) => (
          <animated.div
            key={key}
            className="clip"
            style={{ ...props, backgroundImage: `url(${item})` }}
            onMouseOver={() => clip_toggle(true)}
            onMouseLeave={() => clip_toggle(false)}
            onClick={() => set((index + 1) % 3)}
          />
        ))}
        <div
          onClick={() => info_toggle(!info_on)}
          className={info_on ? "cocktail" : "cocktail active"}
        >
          <FontAwesomeIcon icon={faCocktail} />
        </div>
        {heart_render(clip._id)}
        {info_render()}
      </div>
    </React.Fragment>
  );
}

export default Clips;
