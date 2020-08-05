import React, { useState, useEffect } from "react";
import { useSpring, animated, config, useTrail } from "react-spring";
import { NavLink } from "react-router-dom";

function Sidebar({ onSide, user, menuClose }) {
  //listen on window width
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  });

  //hide categories
  useEffect(() => {
    if (!onSide) toggleCate(false);
  }, [onSide]);

  //sidebar animation
  const sidebarAnimation = useSpring({
    from: { opacity: 0 },
    opacity: onSide ? 1 : 0,
    config: config.gentle,
    delay: 100,
  });

  //side items animation
  const side_items_1 = [{ name: "Home", id: 1, path: "/pornlo" }];
  var side_items_2 = [
    { name: "Categories", id: 3 },
    { name: "Upload", id: 4, path: "/upload" },
    { name: "Premium Free", id: 5, path: "/checkout" },
  ];

  //render items based of window width
  if (width <= 750 && user)
    var side_items = [
      ...side_items_1,
      { name: `${user}`, id: 2, path: "/profile" },
      ...side_items_2,
      { name: "API", id: 6, path: "/API" },
      { name: "Logout", id: 7, path: "/logout" },
    ];
  else if (width <= 750)
    side_items = [
      ...side_items_1,
      { name: "Login", id: 2, path: "/login" },
      ...side_items_2,
      { name: "API", id: 6, path: "/API" },
    ];
  else side_items = [...side_items_1, ...side_items_2];

  //animation
  const side_list_animation = useTrail(side_items.length, {
    from: {
      opacity: 0,
      transform: "translate3d(-200px,0,0)",
    },

    to: {
      opacity: onSide ? 1 : 0,
      transform: onSide ? "translate3d(0,0,0)" : "translate3d(-200px,0,0)",
    },
  });

  //animation render
  const side_list_render = () => {
    return (
      <React.Fragment>
        {side_list_animation.map((props, index) =>
          side_items[index].path ? (
            <animated.div
              style={props}
              key={side_items[index].id}
              onClick={menuClose}
            >
              <NavLink to={side_items[index].path} className="side_items">
                {side_items[index].name}
              </NavLink>
            </animated.div>
          ) : (
            <animated.div
              className="side_items categories"
              style={{
                ...props,
                cursor: "pointer",
                color: "antiquewhite",
                marginBottom: on_cate ? `${categories.length * 48}px` : "",
              }}
              key={side_items[index].id}
              onClick={() => toggleCate(true)}
            >
              {side_items[index].name}
              {categories_render}
            </animated.div>
          )
        )}
      </React.Fragment>
    );
  };

  //categories item animation
  const [on_cate, toggleCate] = useState(false);
  const categories = [
    { name: "Japaness", id: 100, path: "/pornlo/japs" },
    { name: "Korean", id: 101, path: "/pornlo/korean" },
    { name: "Chinese", id: 102, path: "/pornlo/chinese" },
    { name: "Blondy", id: 103, path: "/pornlo/america" },
    { name: "Big Boobs", id: 104, path: "/pornlo/大奶" },
    { name: "Long legs", id: 105, path: "/pornlo/长腿" },
    { name: "Pure", id: 106, path: "/pornlo/清纯" },
  ];

  const categories_animation = useTrail(categories.length, {
    from: { opacity: 0, marginTop: "-10px" },
    to: on_cate
      ? { opacity: 1, marginTop: "15px" }
      : { opacity: 0, marginTop: "-10px" },
    delay: 0,
  });

  const categories_render = (
    <React.Fragment>
      {categories_animation.map((props, index) => (
        <animated.div style={props} key={categories[index].id}>
          <NavLink
            to={categories[index].path}
            className="side_items cate_items"
          >
            {categories[index].name}
          </NavLink>
        </animated.div>
      ))}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <animated.div style={sidebarAnimation} className="sidebar">
        {side_list_render()}
      </animated.div>
    </React.Fragment>
  );
}

export default Sidebar;
