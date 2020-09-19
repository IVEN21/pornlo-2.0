import React, { Component } from "react";
import { getPorns } from "../BackendServices/pornsService";
import ClipsDisplay from "../Components/Clipsdiaplay";
import { toast, ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGrinHearts,
  faMehRollingEyes,
} from "@fortawesome/free-solid-svg-icons";
class Pornlo extends Component {
  state = { currentPage: 1, pageSize: 9, porns: [], loading: false };

  //update current page
  onPage = (page) => {
    this.setState({ currentPage: page });
  };

  //update data
  async componentDidMount() {
    window.scrollTo(0, 0);

    this.setState({ loading: true });
    try {
      const porns = await getPorns();
      this.setState({ porns: porns.reverse() });
    } catch (error) {
      toast.error("Server Down :( ");
    }
    this.setState({ loading: false });
  }

  render() {
    const { porns, pageSize, loading } = this.state;

    //render component
    return (
      <div className="pornlo comp">
        <div style={{ position: "relative" }} className="pornlo_comp_inside">
          <p>
            Showing{" "}
            {porns.length > 1
              ? `${porns.length} objects`
              : `${porns.length} object`}{" "}
            in database
            {porns.length > 1 ? (
              <FontAwesomeIcon
                icon={faGrinHearts}
                style={{ paddingLeft: "7px", color: "#ffcfdb" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faMehRollingEyes}
                style={{ paddingLeft: "7px", color: "#ffcfdb" }}
              />
            )}
          </p>
          <Route
            path={`/pornlo/:id`}
            render={(props) => (
              <ClipsDisplay
                filter={false}
                loading={loading}
                {...props}
                porns={porns}
                pageSize={pageSize}
                user={this.props.user}
                onPage={this.onPage}
              />
            )}
          />
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default Pornlo;
