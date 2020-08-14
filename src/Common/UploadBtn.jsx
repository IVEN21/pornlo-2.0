import React, { useState, useEffect } from "react";
import { useTrail, animated, config } from "react-spring";
import { HashLoader } from "react-spinners";
function UploadBtn({ data_upload, locked }) {
  const item = [
    { char: "U", id: 0 },
    { char: "P", id: 1 },
    { char: "L", id: 2 },
    { char: "O", id: 3 },
    { char: "A", id: 4 },
    { char: "D", id: 5 },
  ];

  //contineous animation per 2s
  const [on_animation, set_animation] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      set_animation(!on_animation);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });

  //random appearance
  var rand = -30 + Math.random() * (100 - 50);
  var rand_ = -10 + Math.random() * (50 - 10);

  //animation
  const animation = useTrail(item.length, {
    from: {
      marginLeft: "10px",
      color: "pink",
      fontSize: "40px",
    },
    to: {
      opacity: on_animation || locked ? 1 : 0,
      transform:
        on_animation || locked
          ? "translate3d(0,0,0)"
          : `translate3d(${rand * -1}px,${rand_}px,0px)`,
    },
    config: config.stiff,
  });

  //render
  return (
    <div
      className="up_grid upload_btn"
      onClick={locked ? data_upload : null}
      style={
        locked
          ? {
              cursor: "pointer",
              backgroundColor: "rgba(240, 211, 229, 0.8)",
              transform: "translateY(-20px)",
              boxShadow: " 0rem 0.5rem 1rem antiquewhite",
            }
          : {}
      }
    >
      <div className="upload_lock">
        {animation.map((props, index) => (
          <animated.div
            style={{
              ...props,
              color: !locked ? "#473932" : "#97e8ac",

              transition: "color ease-in 250ms",
            }}
            key={item[index].id}
          >
            {item[index].char}
          </animated.div>
        ))}
      </div>
    </div>
  );
}

export default UploadBtn;
