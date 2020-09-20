import React, { useState, useEffect } from "react";
import { useSpring, animated, config, useTrail } from "react-spring";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp } from "@fortawesome/free-solid-svg-icons";

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
    pointerEvents: onSide ? "all" : "none",
    from: { opacity: 0, pointerEvents: "none" },
    opacity: onSide ? 1 : 0,
    config: config.gentle,
    delay: 100,
  });

  //side items animation
  const side_items_1 = [{ name: "Home", id: 1, path: "/pornlo/1" }];
  var side_items_2 = [
    { name: "Categories", id: 3 },
    { name: "Upload", id: 4, path: "/upload" },
    // { name: "Live", id: 5, path: "/live" },
    { name: "Premium Free", id: 6, path: "/checkout" },
  ];

  //render items based of window width
  if (width <= 750 && user)
    var side_items = [
      ...side_items_1,
      { name: `${user.name}`, id: 2, path: `/profile/${user.name}` },
      ...side_items_2,
      { name: "Logout", id: 8, path: "/logout" },
    ];
  else if (width <= 750)
    side_items = [
      ...side_items_1,
      { name: "Login", id: 2, path: "/login" },
      ...side_items_2,
      { name: "API", id: 7, path: "/API" },
    ];
  else side_items = [...side_items_1, ...side_items_2];

  //items trail animation
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

  //items render
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
              <NavLink to={side_items[index].path} className="side_items items">
                {side_items[index].name}
              </NavLink>
            </animated.div>
          ) : (
            <animated.div
              className="side_items"
              key={side_items[index].id}
              onClick={() => toggleCate(!on_cate)}
              style={{ ...props, color: "#996aa8" }}
            >
              {side_items[index].name}
              {
                <FontAwesomeIcon
                  icon={faSortUp}
                  className="cate_sort"
                  style={
                    on_cate
                      ? { transform: " rotateX(-180deg)" }
                      : { transform: " rotateX(0deg)" }
                  }
                />
              }
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
    { name: "~ Japaness", id: 100, path: "/porns/japanese/1" },
    { name: "~ Blonde", id: 101, path: "/porns/blonde/1" },
    { name: "~ Teen", id: 102, path: "/porns/teen/1" },
    { name: "~ Masturbation", id: 103, path: "/porns/masturbation/1" },
    { name: "~ Tits", id: 104, path: "/porns/tits/1" },
    { name: "~ 1080p", id: 105, path: "/porns/1080p/1" },
  ];

  //categories trail animation
  const categories_animation = useTrail(categories.length, {
    from: {
      transform: "scaleX(0)",
    },
    to: on_cate
      ? {
          transform: "scaleX(1)",
        }
      : {
          transform: "scaleX(0)",
        },
    delay: 0,
  });

  //categories render
  const categories_render = (
    <div
      className="cate_container"
      style={on_cate ? { pointerEvents: "all" } : { pointerEvents: "none" }}
    >
      {categories_animation.map((props, index) => (
        <animated.div
          style={props}
          key={categories[index].id}
          onClick={() => (window.location = categories[index].path)}
        >
          <div className="cate_items">{categories[index].name}</div>
        </animated.div>
      ))}
    </div>
  );

  //render component
  return (
    <React.Fragment>
      <animated.div style={sidebarAnimation} className="sidebar">
        {side_list_render()}
      </animated.div>
    </React.Fragment>
  );
}

export default Sidebar;
