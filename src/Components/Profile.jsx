import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSadTear, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  refreshUser,
  userLike,
  localClipfetch,
  logout,
  localUploadfetch,
} from "../BackendServices/authService";
import http from "../BackendServices/http";
import LikeClips from "../Common/LikeClips";
import { toast, ToastContainer } from "react-toastify";
import { RingLoader } from "react-spinners";
import {apiEndpoint} from "../BackendServices/config.json"
class Profile extends Component {
  state = {
    loading: false,
    info_on: false,
    likesClips: [],
    uploadClips: [],
  };

  updateClips = async () => {
    const localLikes = JSON.parse(localClipfetch());
    const localUpload = JSON.parse(localUploadfetch());
    const likesClips = [];
    const uploadClips = [];

    for (var i = 0; i < localLikes.length; i++) {
      const { data } = await http.get(
        `${apiEndpoint}/clips/${localLikes[i]}`
      );
      likesClips.push(data);
    }
    for (i = 0; i < localUpload.length; i++) {
      const { data } = await http.get(
        `${apiEndpoint}/clips/${localUpload[i]}`
      );
      uploadClips.push(data);
    }

    this.setState({ likesClips, uploadClips });
  };

  async componentDidMount() {
    this.updateClips();
  }

  likesRendering = () => {
    return this.state.likesClips.map((clip) => (
      <LikeClips
        clip={clip}
        key={clip._id}
        user={this.props.user}
        like={true}
      />
    ));
  };

  uploadRendering = () => {
    return this.state.uploadClips.map((clip) => (
      <LikeClips clip={clip} key={clip._id} user={this.props.user} />
    ));
  };

  updateUser = async () => {
    try {
      this.setState({ loading: true });
      await userLike(this.props.user._id, {
        likes: JSON.parse(localClipfetch()),
        uploads: JSON.parse(localUploadfetch()),
      });
      await refreshUser(this.props.user._id);
      await this.updateClips();
      this.setState({ loading: false });
    } catch (error) {}
  };
  render() {
    const { user } = this.props;
    const { likesClips, uploadClips, loading } = this.state;

    return (
      <div className="profile comp">
        <ToastContainer />
        <div className="profile_container">
          <div className="profile_user">
            <FontAwesomeIcon
              icon={faUser}
              style={{ fontSize: "75px", color: "pink" }}
            />
            <p
              style={{ fontSize: "23px", fontWeight: "400", color: "#303030" }}
            >
              {user.name}
            </p>
            <div className="profile_subtilte">
              <label>@{user.name}</label>
              <label>Member Since No Boby Cares</label>
            </div>
            {true ? (
              <div className="pro_approved">
                Approved
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "#85ff9d", marginLeft: "5px" }}
                />
              </div>
            ) : (
              <div className="pro_approved">Not Approved Yet</div>
            )}
          </div>{" "}
          <div onClick={this.updateUser} className="pro_btn update">
            {loading ? <RingLoader color="black" size="40px" /> : "Update User"}
          </div>
          {user.approved && (
            <div className="pro_approved_div">
              <p>
                To grant fully access to all features on this website, you have
                to input two of your favorite porn links in below and it will be
                verify by web developer. Pardon 24 hours after submitting.
              </p>
              <input /> <input />
              <div className="pro_btn submit">Submit</div>
            </div>
          )}
          <div className="pro_mid">
            <div className="pro_sub">
              <h4 className="pro_h4">{likesClips.length} Likes</h4>
              {this.likesRendering()}
              {this.state.likesClips.length === 0 && (
                <div style={{ fontSize: "20px" }}>
                  User did not like any ...{" "}
                  <FontAwesomeIcon
                    icon={faSadTear}
                    style={{ color: "#c1dec9" }}
                  />
                  <div
                    className="pro_btn watch"
                    onClick={() => (window.location = "/pornlo/1")}
                  >
                    Watch
                  </div>
                </div>
              )}
            </div>

            <div className="pro_sub">
              <h4 className="pro_h4">{uploadClips.length} Uploads</h4>
              {this.uploadRendering()}
              {this.state.uploadClips.length === 0 && (
                <div style={{ fontSize: "20px" }}>
                  User did not upload any ...{" "}
                  <FontAwesomeIcon
                    icon={faSadTear}
                    style={{ color: "#c4a7c7" }}
                  />
                  <div
                    className="pro_btn uploads"
                    onClick={() => (window.location = "/upload")}
                  >
                    Upload
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
