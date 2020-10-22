import React, { Component } from "react";
import { getPorns } from "../BackendServices/pornsService";

import ClipsDisplay from "../Components/Clipsdiaplay";

import { toast, ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinSquintTears } from "@fortawesome/free-solid-svg-icons";
import { getCurrrentUser } from "../BackendServices/authService";
class PornFilter extends Component {
  state = {
    porns: [],
    currentPage: 1,
    pageSize: 9,
    loading: false,
  };
  async componentDidMount() {
    window.scrollTo(0, 0);
    await this.pornFilter();
  }
  onPage = (page) => {
    this.setState({ currentPage: page });
  };
  pornFilter = async () => {
    try {
      this.setState({ loading: true });
      const porns = await getPorns();
      const filter = this.props.match.params.filter;
      var tempPorns = [];
      for (var i = 0; i < porns.length; i++) {
        loop:
        for (var j = 0; j < porns[i].attrs.length; j++) {
          if (porns[i].attrs[j].attr.toLowerCase().includes(filter.trim())) {
            tempPorns.push(porns[i]);
            break loop
          }

        }
      }
      this.setState({ porns: tempPorns.reverse() });
    } catch (error) {
      toast.error("Server Down :( ");
    }
    this.setState({ loading: false });
  };
  render() {
    const { porns, pageSize, loading } = this.state;

    return (
      <div className="pornlo comp">
        <div style={{ position: "relative" }}>
          <p>
            Filtered{" "}
            {porns.length > 1
              ? `${porns.length} objects`
              : `${porns.length} object`}{" "}
            from database ({this.props.match.params.filter.trim()}
            )
            <FontAwesomeIcon
              icon={faGrinSquintTears}
              style={{ paddingLeft: "7px", color: "pink" }}
            />
          </p>
          <Route
            path={`/porns/:id`}
            render={(props) => (
              <ClipsDisplay
                routepage={this.props.match.params.page}
                filter={this.props.match.params.filter}
                loading={loading}
                {...props}
                porns={porns}
                pageSize={pageSize}
                user={getCurrrentUser()}
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

export default PornFilter;
