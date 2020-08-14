import React, { useState, useEffect } from "react";
import { useTrail, animated, config } from "react-spring";

function Live(props) {
  const item = [
    { char: "O", id: 0 },
    { char: "p", id: 1 },
    { char: "e", id: 2 },
    { char: "n", id: 3 },
    { char: "S", id: 4 },
    { char: "o", id: 5 },
    { char: "o", id: 6 },
    { char: "n", id: 7 },
  ];
  const [on_animation, set_animation] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      set_animation(!on_animation);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  });
  const animation = useTrail(item.length, {
    from: {
      marginLeft: "10px",
      color: "pink",
      fontSize: "calc(2vw + 20px)",
      filter: "drop-shadow(.5rem .5rem 0.2rem grey)",
    },
    to: {
      opacity: on_animation ? 1 : 0,
      transform: on_animation
        ? "translate3d(0,0,0)"
        : `translate3d(${0}px,${-50}px,0px)`,
    },
    config: config.stiff,
  });
  return (
    <div className="comp live">
      <div className="open_soon">
        {animation.map((props, index) => (
          <animated.div style={props} key={item[index].id}>
            {item[index].char}
          </animated.div>
        ))}
      </div>
    </div>
  );
}

export default Live;
