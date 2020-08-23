import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
function UploadImg({ input, img_submit }) {
  //functional states
  const [lock, setlock] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  //images file display and store
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    try {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    } catch (error) {}
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    try {
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        img_submit(reader.result, input);
      };
      setlock(true);
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    boxShadow: "unset",
    backgroundColor: "rgba(240, 211, 229, 0.1)",
  };
  return (
    <div className="up_grid" style={lock ? style : {}}>
      {lock && (
        <div className="submit_lock">
          <span
            className="submit_edit"
            onClick={() => {
              setlock(false);
              img_submit(null, input);
            }}
          >
            Edit
          </span>
        </div>
      )}

      <input
        type="file"
        id={"file" + input}
        accept="image/*"
        onChange={handleFileInputChange}
        value={fileInputState}
      />
      <label htmlFor={"file" + input}>
        <FontAwesomeIcon icon={faImage} className="up_grid_icon" />
      </label>
      {previewSource && (
        <React.Fragment>
          <img src={previewSource} alt="chosen" className="image_display" />
          <div onClick={handleSubmitFile} className="upload_comp_submit">
            Submit
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default UploadImg;
