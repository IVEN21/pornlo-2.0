import React, { Component } from "react";
import UploadImg from "../Common/uploadImg";
import Attr from "../Common/Attr";
import Url from "../Common/Url";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadBtn from "../Common/UploadBtn";
import http from "../BackendServices/http";
import { apiEndpoint } from "../BackendServices/config.json";
import { toast } from "react-toastify";

class Upload extends Component {
  state = {
    imgs: [],
    attrs: [],
    url: "",
    loading: {
      load: false,
      text: "",
    },
    toastclick: false,
  };
  //reminder
  componentDidMount() {
    toast("Only administrator can upload, click to login");
  }
  //toast click dynamic path
  toastClick = () => {
    if (this.state.toastclick) return () => (window.location = "/pornlo");
    else return () => (window.location = "/login");
  };

  //update state when submit
  attr_submit = (info) => {
    this.setState({ attrs: info });
  };
  url_submit = (info) => {
    this.setState({ url: info });
  };
  img_sumbit = (info, index) => {
    this.setState({
      ["img" + index]: info,
    });
  };

  //if data filled => locked
  lock = () => {
    const { attrs, url, img1, img2, img3 } = this.state;
    if (attrs && url && img1 && img2 && img3) return true;
    return false;
  };

  //upload to cloundary
  images_upload = async () => {
    const images = [
      { img: this.state.img1 },
      { img: this.state.img2 },
      { img: this.state.img3 },
    ];
    var img_url = [];
    for (let i = 0; i < images.length; i++) {
      try {
        this.setState({
          loading: { load: true, text: "Uploading Images to Cloud" },
        });
        const promise = await http.post(apiEndpoint + "/upload", {
          data: images[i].img,
        });
        img_url = [...img_url, { url: promise.data }];
      } catch (err) {
        toast.error("Images may not be uploaded due to api problem");
        return;
      }
    }
    this.clips_info_upload(img_url);
  };

  //upload to database
  clips_info_upload = async (img_url) => {
    try {
      this.setState({ loading: { load: true, text: "Uploading to API" } });
      await http.post(apiEndpoint + "/clips", {
        clips: img_url,
        attrs: this.state.attrs,
        url: this.state.url,
      });
      this.setState({ loading: { load: false, text: "DONE!" } });
    } catch (error) {
      toast.error("data could not be uploaded due to api problem");
      return;
    }
    this.setState({ toastclick: true });
    toast.success("Upload success, click to view or edit to upload more");
  };

  render() {
    return (
      <div className="upload comp">
        <ToastContainer onClick={this.toastClick()} />
        <div className="upload_grid_area">
          <UploadImg input="1" img_submit={this.img_sumbit} />
          <UploadImg input="2" img_submit={this.img_sumbit} />
          <UploadImg input="3" img_submit={this.img_sumbit} />
          <Attr attr_submit={this.attr_submit} />
          <Url url_submit={this.url_submit} />
          <UploadBtn
            loading={this.state.loading}
            data_upload={this.images_upload}
            locked={this.lock()}
          />
        </div>
      </div>
    );
  }
}

export default Upload;
