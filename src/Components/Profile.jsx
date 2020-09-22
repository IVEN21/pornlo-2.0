import React, { Component } from "react";
import { Transition, animated } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSadTear, faCheck } from "@fortawesome/free-solid-svg-icons";
import {
  refreshUser,
  userLike,
  localClipfetch,
  localUploadfetch,
  send_approved_request,
  getCurrrentUser,
  fetchdata,
} from "../BackendServices/authService";
import http from "../BackendServices/http";
import LikeClips from "../Common/LikeClips";
import { RingLoader } from "react-spinners";
import { apiEndpoint } from "../BackendServices/config.json";
import { toast, ToastContainer } from "react-toastify";
class Profile extends Component {
  state = {
    loading: false,
    info_on: false,
    likesClips: [],
    uploadClips: [],
    link_1: "",
    link_2: "",
    await: getCurrrentUser().await,
  };

  //update likes and uploads to databse
  updateClips = async () => {
    const localLikes = JSON.parse(localClipfetch());
    const localUpload = JSON.parse(localUploadfetch());
    const likesClips = [];
    const uploadClips = [];

    for (var i = 0; i < localLikes.length; i++) {
      const { data } = await http.get(`${apiEndpoint}/clips/${localLikes[i]}`);
      if (data._id) likesClips.push(data);
    }
    for (i = 0; i < localUpload.length; i++) {
      const { data } = await http.get(`${apiEndpoint}/clips/${localUpload[i]}`);
      if (data._id) uploadClips.push(data);
    }

    this.setState({ likesClips, uploadClips });
  };

  async componentDidMount() {
    this.updateClips();
  }

  //ponrs that you like
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
  //login container with animation
  // {!user.approved && (

  // )}
  approvedField = () => {
    return (
      !getCurrrentUser().approved && (
        <Transition
          native
          items={!getCurrrentUser().await}
          from={{ overflow: "hidden", height: 0 }}
          enter={{ height: "auto" }}
          leave={{ height: 0 }}
        >
          {(show) =>
            show &&
            ((props) => (
              <animated.div className="pro_approved_div" style={props}>
                <p>
                  <span style={{ color: "#bd8f9a", fontWeight: "700" }}>
                    {" "}
                    Please share two porns with us!
                  </span>{" "}
                  Input any two porn links below :)
                </p>
                {this.link_upload("link_1")}
                {this.link_upload("link_2")}

                <button
                  className="pro_btn submit"
                  onClick={this.link_submit}
                  disabled={this.validation()}
                >
                  Share
                </button>
              </animated.div>
            ))
          }
        </Transition>
      )
    );
  };
  //porns that you upload
  uploadRendering = () => {
    return this.state.uploadClips.map((clip) => (
      <LikeClips clip={clip} key={clip._id} user={this.props.user} />
    ));
  };

  //link input field
  link_upload = (spec) => (
    <input
      style={{ marginLeft: "10px" }}
      onChange={(e) => this.setState({ [spec]: e.currentTarget.value })}
    />
  );

  //send approved request
  link_submit = async () => {
    try {
      const { link_1, link_2 } = this.state;
      this.setState({ loading: true });
      await send_approved_request(this.props.user._id, link_1, link_2);
      await userLike(
        this.props.user._id,
        {
          likes: JSON.parse(localClipfetch()),
          uploads: JSON.parse(localUploadfetch()),
        },
        true
      );
      const { data } = await http.post(`${apiEndpoint}/_users/refresh`, {
        userID: this.props.user._id,
      });

      localStorage.setItem("token", JSON.stringify(data));

      this.setState({ loading: false, await: true });
    } catch (error) {}
  };

  //approve redner
  approved_render = () => {
    return (
      <div className="pro_approved">
        Approved
        <FontAwesomeIcon
          icon={faCheck}
          style={{ color: "#85ff9d", marginLeft: "5px" }}
        />
      </div>
    );
  };

  //disabled btn
  validation = () => {
    const { link_1, link_2 } = this.state;
    if (link_1.length > 0 && link_2.length > 0) return false;
    else return true;
  };

  triApprove = () => {
    if (getCurrrentUser().await === true) return true;
    else if (
      getCurrrentUser().approved === undefined ||
      getCurrrentUser().approved === true
    )
      return false;
    return true;
  };
  updateUser = async () => {
    await fetchdata(this.props.user._id);

    try {
      this.setState({ loading: true });

      await userLike(
        this.props.user._id,
        {
          likes: JSON.parse(localClipfetch()),
          uploads: JSON.parse(localUploadfetch()),
        },
        this.triApprove()
      );
      if (getCurrrentUser().approved) this.setState({ await: false });
      await refreshUser(this.props.user._id);
      await this.updateClips();
      this.setState({ loading: false });
      toast.success("Everything Up to Date!");
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

            {this.approved_render()}
          </div>{" "}
          <div onClick={this.updateUser} className="pro_btn update">
            {loading ? <RingLoader color="black" size="40px" /> : "Update User"}
          </div>
          {this.approvedField()}
          <div className="pro_mid">
            <div className="pro_sub">
              <h4 className="pro_h4">{likesClips.length} Likes</h4>
              <div className="pro_flex">
                {this.likesRendering()}
                {this.state.likesClips.length === 0 && (
                  <div
                    style={{
                      fontSize: "20px",
                      padding: "10px 30px",
                      lineHeight: "30px",
                    }}
                  >
                    User did not like any... go watch some porns please{" "}
                    <FontAwesomeIcon
                      icon={faSadTear}
                      style={{ color: "#c1dec9" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="pro_sub">
              <h4 className="pro_h4">{uploadClips.length} Uploads</h4>
              <div className="pro_flex">
                {" "}
                {this.uploadRendering()}
                {this.state.uploadClips.length === 0 && (
                  <div
                    style={{
                      fontSize: "20px",
                      padding: "10px 30px",
                      lineHeight: "30px",
                    }}
                  >
                    User did not upload any...{" "}
                    <FontAwesomeIcon
                      icon={faSadTear}
                      style={{ color: "#c4a7c7" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="pro_footer">
            <label>Terms</label>
            <label>Condition</label>
            <label>About</label>
            <label>
              <a
                href="https://www.instagram.com/_yesloiven__/"
                style={{ color: "pink" }}
              >
                AddMe
              </a>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
