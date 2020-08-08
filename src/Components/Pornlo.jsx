import React, { Component } from "react";
import { getPorns } from "../BackendServices/pornsService";
import { ClimbingBoxLoader } from "react-spinners";
import pagination from "../Common/pigination";
import Clips from "../Common/Clips";
import Pagination from "../Components/Pagination";
class Pornlo extends Component {
  state = { currentPage: 1, pageSize: 6, porns: [] };

  //update current page
  onPage = (page) => {
    this.setState({ currentPage: page });
  };

  //update data
  async componentDidMount() {
    this.setState({ porns: await getPorns() });
  }

  render() {
    const { porns, pageSize, currentPage } = this.state;

    //paginate pages
    const clips = pagination(porns, pageSize, currentPage);

    //render loader
    const loder = () => (
      <div className="loader">
        <ClimbingBoxLoader color="pink" size="50px" loading={true} />
      </div>
    );

    //render clips with pagination
    const clipsDisplay = () => (
      <div className="pornlo_grid">
        {clips.map((clip) => (
          <Clips clip={clip} key={clip._id} />
        ))}
      </div>
    );

    //render component
    return (
      <div className="pornlo comp">
        {this.state.porns.length === 0 ? loder() : clipsDisplay()}
        <Pagination
          count={porns.length}
          pageSize={pageSize}
          onPage={this.onPage}
          currentPage={currentPage}
        />
      </div>
    );
  }
}

export default Pornlo;
