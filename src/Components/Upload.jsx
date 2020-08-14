import React, { Component } from "react";
import UploadImg from "../Common/uploadImg";
import Attr from "../Common/Attr";
import Url from "../Common/Url";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UploadBtn from "../Common/UploadBtn";
class Upload extends Component {
  state = {
    imgs: [],
    attrs: [],
    url: "",
  };
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

  lock = () => {
    const { attrs, url, img1, img2, img3 } = this.state;
    if (attrs && url && img1 && img2 && img3) return true;
    return false;
  };
  //upload to cloundary
  images_upload = async () => {
    console.log("Lol");
    // const images = [
    //   { img: this.state.img1 },
    //   { img: this.state.img2 },
    //   { img: this.state.img3 },
    // ];
    // var img_url = [];
    // for (let i = 0; i < images.length; i++) {
    //   try {
    //     const promise = await http.post(apiEndpoint + "/upload", {
    //       data: images[i].img,
    //     });
    //     img_url = [...img_url, { url: promise.data }];
    //     console.log(promise);
    //   } catch (err) {
    //     toast.error("Images may not be uploaded due to api problem");
    //     return;
    //   }
    // }
    // this.clips_info_upload(img_url);
  };
  //upload to api
  clips_info_upload = async (img_url) => {
    // try {
    //   await http.post(apiEndpoint + "/clips", {
    //     clips: img_url,
    //     attrs: this.state.attrs,
    //     url: this.state.url,
    //   });
    // } catch (error) {
    //   toast.error("data could not be uploaded due to api problem");
    //   return;
    // }
    // toast.success("Upload success, refresh to upload more");
  };

  render() {
    console.log(this.state);
    return (
      <div className="upload comp">
        <ToastContainer />
        <div className="upload_grid_area">
          <UploadImg input="1" img_submit={this.img_sumbit} />
          <UploadImg input="2" img_submit={this.img_sumbit} />
          <UploadImg input="3" img_submit={this.img_sumbit} />
          <Attr attr_submit={this.attr_submit} />
          <Url url_submit={this.url_submit} />
          <UploadBtn data_upload={this.images_upload} locked={this.lock()} />
        </div>
      </div>
    );
  }
}

export default Upload;
