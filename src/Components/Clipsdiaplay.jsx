import React from "react";
import Clips from "../Common/Clips";
import pagination from "../Common/pigination";
import Pagination from "../Components/Pagination";
import { RingLoader } from "react-spinners";
function Clipsdiaplay({
  user,
  match: { params },
  porns,
  pageSize,
  onPage,
  loading,
}) {
  //paginate pages

  //render loader
  const loder = () => (
    <div className="loader">
      <RingLoader color="pink" size="100px" loading={true} />
    </div>
  );
  const clipsDisplay = () => (
    <div className="pornlo_grid">
      {clips.map((clip) => (
        <Clips clip={clip} key={clip._id} user={user} />
      ))}
    </div>
  );
  const clips = pagination(porns, pageSize, params.id);
  return (
    <React.Fragment>
      {loading ? loder() : clipsDisplay()}
     
        <Pagination
          user={user}
          count={porns.length}
          pageSize={pageSize}
          onPage={onPage}
          currentPage={params.id}
        />
     
    </React.Fragment>
  );
}

export default Clipsdiaplay;
