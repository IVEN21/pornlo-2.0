import React, { Component } from "react";
import { getPorns } from "../BackendServices/pornsService";
import { ClimbingBoxLoader } from "react-spinners";
import pagination from "../Common/pigination";
import Clips from "../Common/Clips";
import Pagination from "../Components/Pagination";
class Pornlo extends Component {
  state = { currentPage: 1, pageSize: 6, porns: [] };
  onPage = (page) => {
    this.setState({ currentPage: page });
  };
  async componentDidMount() {
    this.setState({ porns: await getPorns() });
  }

  render() {
    const { porns, pageSize, currentPage } = this.state;
    const clips = pagination(porns, pageSize, currentPage);
    return (
      <div className="pornlo comp">
        <ClimbingBoxLoader
          color="pink"
          loading={this.state.porns.length === 0}
        />
        <div className="pornlo_grid">
          {clips.map((clip) => (
            <Clips clip={clip} key={clip._id} />
          ))}
        </div>
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
