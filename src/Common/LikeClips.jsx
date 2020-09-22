import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartBroken,
  faHeart,
  faPaperclip,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { localClipSave, localUploadSave } from "../BackendServices/authService";
import http from "../BackendServices/http";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import { apiEndpoint } from "../BackendServices/config.json";
function LikeClips({ clip, like, user }) {
  const [info, setInfo] = useState(false);
  const [heart, setHeart] = useState(true);
  const [delete_, setDelete_] = useState(false);
  const [loading, setloading] = useState(false);
  const [followup, setfollowup] = useState(true);
  const heart_click = (clipID) => {
    setHeart(!heart);
    localClipSave(clipID);
  };

  const upload_delete = async () => {
    try {
      setloading(true);
      await http.delete(`${apiEndpoint}/clips/${clip._id}`);
      localUploadSave(clip._id);
      toast.success("Delete Completed");
      setloading(false);
      setfollowup(false);
    } catch (ex) {
      toast.error("Something Went Wrong");
    }
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
    } else {
      return (
        <FontAwesomeIcon
          icon={faTrashAlt}
          className="clip_heart likes"
          style={{ color: "#ffa3a3" }}
          onClick={() => setDelete_(true)}
        />
      );
    }
  };

  return (
    followup && (
      <div className="pro_likes">
        {delete_ && (
          <div className="pro_delete">
            {loading ? (
              <div
                style={{
                  left: "50%",
                  transform: "translateX(-50%)",
                  position: "absolute",
                }}
              >
                <RingLoader color="green" />
              </div>
            ) : (
              <React.Fragment>
                <p> Are you sure you want to delete?</p>
                <div className="pro_delete_btn">
                  <div onClick={() => setDelete_(false)}>No</div>{" "}
                  <div onClick={() => upload_delete()}>Yes</div>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
        <img
          src={clip.clips[0].url}
          width="350px"
          height="200px"
          onMouseEnter={() => setInfo(true)}
          onMouseLeave={() => setInfo(false)}
        ></img>

        {heart_render(clip._id)}

        <a href={clip.url} style={{ color: "#241526" }} target="_blank">
          <FontAwesomeIcon icon={faPaperclip} className={"clip_heart link"} />
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
    )
  );
}

export default LikeClips;
