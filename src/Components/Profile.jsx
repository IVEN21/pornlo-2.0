import React, { useState, useEffect } from "react";
import { animated, useTransition, config } from "react-spring";
function Profile({ user }) {
  const items = [
    { words: "Hi", id: 0 },
    { words: `${"" + user + ","}`, id: 1 },
    { words: "SEE", id: 2 },
    { words: "WHAT'S", id: 3 },
    { words: "NEW!", id: 4 },
    { words: "~", id: 5 },
    { words: "Nothing", id: 6 },
    { words: "New", id: 7 },
    { words: "Dumb", id: 8 },
    { words: "Shit!", id: 9 },
  ];
  const [index, set] = useState(0);
  const [space, setSpace] = useState(30);
  useEffect(() => {
    const interval =
      index < 9 &&
      setInterval(() => {
        set((state) => state + 1);
        setSpace(space + 10);
      }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [space]);

  const animation = useTransition(items[index], (items) => items.id, {
    from: {
      opacity: 0,
      transform:
        index < 6 ? `translate3d(0px,-50px,0)` : `translate3d(-50px,0px,0)`,
    },
    enter: {
      opacity: 1,
      transform:
        index < 6 ? `translate3d(0px,0px,0)` : `translate3d(0px,0px,0)`,
    },
    leave: {
      opacity: 0,
      transform:
        index < 6 ? `translate3d(-50px,0px,0)` : `translate3d(0px,-50px,0)`,
    },
    config: config.stiff,
  });

  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div className="profile comp">
      {animation.map(({ item, key, props }) => (
        <animated.p
          style={{
            ...props,

            padding: "2px",
            position: "absolute",
            fontSize: index > 8 ? "120px" : "50px",
            color: `#${randomColor}`,
            transition: "all 1s ease",
          }}
          key={key}
        >
          {item.words}
        </animated.p>
      ))}
    </div>
  );
}

export default Profile;
