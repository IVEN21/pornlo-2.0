import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Tag({ item, tagSelect }) {
  const [tag_lock, settag_lock] = useState(false);

  return (
    <div
      style={tag_lock  ? { pointerEvents: "none" } : {}}
      className="att_tag"
      onClick={() => {

        settag_lock(!tag_lock);
        tagSelect(item.tag);
      }}
    >
      {tag_lock && (
        <div className="tag_lock">
          <div className="tag_delete">
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
      {item.tag}
      <FontAwesomeIcon
        icon={faTag}
        style={{ paddingLeft: "5px", color: "#8c7772" }}
      />
    </div>
  );
}

export default Tag;
