// import React, { Component } from "react";
// import { Spring } from "react-spring/renderprops";
// import { toast } from "react-toastify";

// class attr extends Component {
//   state = {
//     attr_count: 1,
//     lock: false,
//   };

//   //tag with animation
//   input_render = (input_list, tag) => (
//     <Spring
//       from={{ marginLeft: -200, opacity: 0 }}
//       to={{ marginLeft: 25, opacity: 1 }}
//     >
//       {(props) => (
//         <input
//           style={props}
//           id="attr_input"
//           placeholder={"tag " + tag}
//           onChange={({ currentTarget: { value } }) =>
//             this.setState({ [input_list]: value })
//           }
//         ></input>
//       )}
//     </Spring>
//   );

//   render() {
//     const style = {
//       boxShadow: "unset",
//       backgroundColor: "rgba(240, 211, 229, 0.1)",
//     };
//     const { attr_submit } = this.props;
//     let { attr_count, tag_1, tag_2, tag_3, tag_4, tag_5, lock } = this.state;

//     //submit btn
//     const on_attr_submit = () => {
//       //check empty tags and push
//       const tags = [tag_1, tag_2, tag_3, tag_4, tag_5];
//       const newtags = [];
//       if (!tags[0]) {
//         toast.error("Tag 1 must required");
//         return;
//       }

//       //rearrange tags
//       for (var i = 0, j = 0; i < 5; i++) {
//         if (tags[i]) {
//           if (tags[i].length > 0) {
//             newtags[j] = { attr: tags[i] };
//             j++;
//           }
//         }
//       }
//       attr_submit(newtags);
//       this.setState({ lock: true });
//     };

//     //render comp
//     return (
//       <div className="up_grid attr" style={lock ? style : {}}>
//         {lock && (
//           <div className="submit_lock">
//             <span
//               className="submit_edit"
//               onClick={() => {
//                 this.setState({ lock: false });
//                 attr_submit(null);
//               }}
//             >
//               Edit
//             </span>
//           </div>
//         )}
//         <h2 style={{ color: "#403457" }}>Tags</h2>
//         {this.input_render("tag_1", 1)}
//         {attr_count > 1 && this.input_render("tag_2", 2)}
//         {attr_count > 2 && this.input_render("tag_3", 3)}
//         {attr_count > 3 && this.input_render("tag_4", 4)}
//         {attr_count > 4 && this.input_render("tag_5", 5)}
//         <div style={{ display: "flex", margin: "20px 40px" }}>
//           <div
//             className={attr_count < 5 ? "attr_btn add " : "attr_btn disable"}
//             onClick={() => this.setState({ attr_count: attr_count + 1 })}
//           >
//             Add
//           </div>
//           <div
//             className={attr_count > 1 ? "attr_btn remove" : "attr_btn disable"}
//             onClick={() => this.setState({ attr_count: attr_count - 1 })}
//           >
//             Remove
//           </div>
//         </div>
//         <div className="upload_comp_submit" onClick={on_attr_submit}>
//           Submit
//         </div>
//       </div>
//     );
//   }
// }

// export default attr;

import React, { Component } from "react";

import { Spring } from "react-spring/renderprops";
import { toast } from "react-toastify";
import Tag from "./tag";
class Attr extends Component {
  state = {
    attr_count: 0,
    lock: false,
    sele_tags: [],
  };

  input_render = (input_list, tag) => (
    <Spring
      from={{ transform: "translateY(-50px)", opacity: 0 }}
      to={{ margin: "0 10px 10px 0", opacity: 1, transform: "translateY(0px)" }}
    >
      {(props) => (
        <input
          style={props}
          id="attr_input"
          placeholder={"tag " + tag}
          onChange={({ currentTarget: { value } }) =>
            this.setState({ [input_list]: value })
          }
        ></input>
      )}
    </Spring>
  );
  tagSelect = (tag) => {
    const { sele_tags } = this.state;
    const existed = sele_tags.includes(tag);
    !existed
      ? sele_tags.push(tag)
      : sele_tags.splice(sele_tags.indexOf(tag), 1);
  };
  render() {
    let {
      attr_count,
      tag_1,
      tag_2,
      tag_3,
      tag_4,
      tag_5,
      tag_6,
      lock,
      sele_tags,
    } = this.state;
    const { attr_submit } = this.props;
    const style = {
      boxShadow: "unset",
      backgroundColor: "rgba(240, 211, 229, 0.1)",
    };
    //submit btn
    const on_attr_submit = () => {
      //check empty tags and push
      var tags = [tag_1, tag_2, tag_3, tag_4, tag_5, tag_6];
      const newtags = [];
      let empty_tags = sele_tags.filter(
        (item) => item && item.trim().length > 0
      );
      tags = tags.filter((item) => item !== undefined);
      if (!tags.length > 0 && !empty_tags.length > 0) {
        toast.error("At least one tag is required");
        return;
      }

      //rearrange tags
      for (var i = 0, j = 0; i < 7; i++) {
        if (tags[i]) {
          if (tags[i].length > 0) {
            newtags[j] = {
              attr: tags[i].charAt(0).toUpperCase() + tags[i].slice(1),
            };
            j++;
          }
        }
        if (empty_tags[i])
          if (empty_tags[i].length > 0) {
            newtags[j] = {
              attr: empty_tags[i],
            };
            j++;
          }
      }
      console.log(newtags);
      if (newtags.length > 5) {
        toast.error("Max 5 tags, please reduce!");
        return;
      }
      attr_submit(newtags);

      this.setState({ lock: true });
    };

    const tags = [
      { id: 1, tag: "Perfect Body" },
      { id: 2, tag: "Blonde" },
      { id: 3, tag: "Teen" },
      { id: 4, tag: "Japanese" },
      { id: 5, tag: "Masturbation" },
      { id: 6, tag: "Ass" },
      { id: 7, tag: "Tits" },
      { id: 8, tag: "Amateur" },
      { id: 9, tag: "1080p" },
      { id: 10, tag: "720p" },
    ];
    return (
      <div className="up_grid attr" style={lock ? style : {}}>
        {lock && (
          <div className="submit_lock">
            <span
              className="submit_edit"
              onClick={() => {
                this.setState({ lock: false });
                attr_submit(null);
              }}
            >
              Edit
            </span>
          </div>
        )}
        <h2>Up to 5 tags</h2>
        {tags.map((item) => (
          <Tag item={item} tagSelect={this.tagSelect} key={item.id} />
        ))}
        {attr_count > 0 && this.input_render("tag_1", 1)}
        {attr_count > 1 && this.input_render("tag_2", 2)}
        {attr_count > 2 && this.input_render("tag_3", 3)}
        {attr_count > 3 && this.input_render("tag_4", 4)}
        <div style={{ display: "flex", margin: "5px 0px" }}>
          <div
            className={attr_count < 4 ? "attr_btn add " : "attr_btn disable"}
            onClick={() => this.setState({ attr_count: attr_count + 1 })}
          >
            Add Custom Tags
          </div>
          {/* <div
            className={attr_count > 0 ? "attr_btn remove" : "attr_btn disable"}
            onClick={() => this.setState({ attr_count: attr_count - 1 })}
          >
            Remove
          </div> */}
        </div>
        <div className="upload_comp_submit" onClick={on_attr_submit}>
          Submit
        </div>
      </div>
    );
  }
}

export default Attr;
