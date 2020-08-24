import React, { Component } from "react";
import { getPorns } from "../BackendServices/pornsService";
import { RingLoader } from "react-spinners";
import pagination from "../Common/pigination";
import Clips from "../Common/Clips";
import Pagination from "../Components/Pagination";
import { toast, ToastContainer } from "react-toastify";
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
    const { porns, pageSize, currentPage } = this.state;

    //paginate pages
    const clips = pagination(porns, pageSize, currentPage);

    //render loader
    const loder = () => (
      <div className="loader">
        <RingLoader color="pink" size="100px" loading={true} />
      </div>
    );

    //render clips with pagination
    const clipsDisplay = () => (
      <div className="pornlo_grid">
        {clips.map((clip) => (
          <Clips clip={clip} key={clip._id} user={this.props.user}/>
        ))}
      </div>
    );

    //render component
    return (
      <div className="pornlo comp">
        <ToastContainer />
        {this.state.loading ? loder() : clipsDisplay()}
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
