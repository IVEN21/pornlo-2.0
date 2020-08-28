import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartBroken,
  faHeart,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import { localClipSave } from "../BackendServices/authService";
function LikeClips({ clip, user, like }) {
  const [info, setInfo] = useState(false);
  const [heart, setHeart] = useState(true);
  const heart_click = (clipID) => {
    setHeart(!heart);
    localClipSave(clipID);
  };

  const heart_render = () => {
    if (like) {
      if (heart) {
        return (
          <FontAwesomeIcon
            icon={faHeart}
            className="clip_heart likes"
            style={{ color: "#87143b" }}
            onClick={() => heart_click(clip._id)}
          />
        );
      }
      return (
        <FontAwesomeIcon
          icon={faHeartBroken}
          className="clip_heart likes"
          style={{ color: "#49364d" }}
          onClick={() => heart_click(clip._id)}
        />
      );
    }
  };

  return (
    <div className="pro_likes">
      <img
        src={clip.clips[0].url}
        width="370px"
        height="200px"
        onMouseEnter={() => setInfo(true)}
        onMouseLeave={() => setInfo(false)}
      ></img>

      {heart_render(clip._id)}
      <a href={clip.url} style={{ color: "#241526" }}>
        <FontAwesomeIcon
          icon={faPaperclip}
          className={like ? "clip_heart link" : "clip_heart justLink"}
        />
      </a>
      {info && (
        <div className="pro_like_info">
          {clip.attrs.map((attrs) => (
            <span className="clip_attr likes" key={attrs._id}>
              {attrs.attr}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default LikeClips;
