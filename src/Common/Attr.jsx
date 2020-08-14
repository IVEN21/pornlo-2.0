import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";
import { toast } from "react-toastify";

class attr extends Component {
  state = {
    attr_count: 1,
    lock: false,
  };

  //tag with animation
  input_render = (input_list, tag) => (
    <Spring
      from={{ marginLeft: -200, opacity: 0 }}
      to={{ marginLeft: 25, opacity: 1 }}
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

  render() {
    const style = {
      boxShadow: "unset",
      backgroundColor: "rgba(240, 211, 229, 0.1)",
    };
    const { attr_submit } = this.props;
    let { attr_count, tag_1, tag_2, tag_3, tag_4, tag_5, lock } = this.state;

    //submit btn
    const on_attr_submit = () => {
      //check empty tags and push
      const tags = [tag_1, tag_2, tag_3, tag_4, tag_5];
      const newtags = [];
      if (!tags[0]) {
        toast.error("Tag 1 must required");
        return;
      }

      //rearrange tags
      for (var i = 0, j = 0; i < 5; i++) {
        if (tags[i]) {
          if (tags[i].length > 0) {
            newtags[j] = { attr: tags[i] };
            j++;
          }
        }
      }
      attr_submit(newtags);
      this.setState({ lock: true });
    };

    //render comp
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
        <h2 style={{ color: "#403457" }}>Tags</h2>
        {this.input_render("tag_1", 1)}
        {attr_count > 1 && this.input_render("tag_2", 2)}
        {attr_count > 2 && this.input_render("tag_3", 3)}
        {attr_count > 3 && this.input_render("tag_4", 4)}
        {attr_count > 4 && this.input_render("tag_5", 5)}
        <div style={{ display: "flex", margin: "20px 40px" }}>
          <div
            className={attr_count < 5 ? "attr_btn add " : "attr_btn disable"}
            onClick={() => this.setState({ attr_count: attr_count + 1 })}
          >
            Add
          </div>
          <div
            className={attr_count > 1 ? "attr_btn remove" : "attr_btn disable"}
            onClick={() => this.setState({ attr_count: attr_count - 1 })}
          >
            Remove
          </div>
        </div>
        <div className="upload_comp_submit" onClick={on_attr_submit}>
          Submit
        </div>
      </div>
    );
  }
}

export default attr;
