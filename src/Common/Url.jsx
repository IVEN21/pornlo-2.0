import React, { useState } from "react";
import { toast } from "react-toastify";

function Url({ url_submit }) {
  const [lock, setlock] = useState(false);
  const [url, seturl] = useState("");
  var regex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  const on_url_submit = () => {
    if (regex.test(url)) {
      url_submit(url);
      setlock(true);
    } else {
      toast.error("Please provide a valid url");
    }
  };
  const style = {
    boxShadow: "unset",
    backgroundColor: "rgba(240, 211, 229, 0.1)",
  };
  return (
    <div className="up_grid url" style={lock ? style : {}}>
      {lock && (
        <div className="submit_lock">
          <span
            className="submit_edit"
            onClick={() => {
              setlock(false);
              url_submit(null);
            }}
          >
            Edit
          </span>
        </div>
      )}
      <h2 style={{ color: "#453b36" }}>Link</h2>
      <input
        id="url_input"
        onChange={({ currentTarget: { value } }) => seturl(value)}
        placeholder="Valid Url ..."
      ></input>
      <div className="upload_comp_submit" onClick={on_url_submit}>
        Submit
      </div>
    </div>
  );
}

export default Url;
