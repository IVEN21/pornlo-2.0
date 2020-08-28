import React, { Component } from "react";
import { getPorns } from "../BackendServices/pornsService";

import ClipsDisplay from "../Components/Clipsdiaplay";

import { toast, ToastContainer } from "react-toastify";
import { Route } from "react-router-dom";
class Pornlo extends Component {
  state = { currentPage: 1, pageSize: 6, porns: [], loading: false };

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
    const { porns, pageSize,loading } = this.state;


    //render component
    return (
      <div className="pornlo comp">
        <Route
          path={`/pornlo/:id`}
          render={(props) => (
            <ClipsDisplay
              loading={loading}
              {...props}
              porns={porns}
              pageSize={pageSize}
              user={this.props.user}
              onPage={this.onPage}
            />
          )}
        />
        <ToastContainer />
     
      </div>
    );
  }
}

export default Pornlo;
