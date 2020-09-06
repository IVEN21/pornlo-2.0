import React from "react";
import Clips from "../Common/Clips";
import pagination from "../Common/pigination";
import Pagination from "../Components/Pagination";
import { ClipLoader } from "react-spinners";

function Clipsdiaplay({
  user,
  match: { params },
  porns,
  pageSize,
  onPage,
  loading,
  filter,
  routepage,
}) {

  //render loader
  const loder = () => (
    <div className="loader">
      <ClipLoader color="pink" size="70px" loading={true} />
    </div>
  );
  const clipsDisplay = () => {
    if (clips.length > 0)
      return (
        <div className="pornlo_grid">
          {clips.map((clip) => (
            <Clips clip={clip} key={clip._id} user={user} />
          ))}
        </div>
      );
    return <h1 style={{ color: "#f24b7d" }}>No relevant result found</h1>;
  };

  const clips = !filter
    ? pagination(porns, pageSize, params.id)
    : pagination(porns, pageSize, routepage);
  return (
    <React.Fragment>
      {loading ? loder() : clipsDisplay()}

      <Pagination
        filter={filter}
        count={porns.length}
        pageSize={pageSize}
        onPage={onPage}
        currentPage={!filter ? params.id : routepage}
      />
    </React.Fragment>
  );
}

export default Clipsdiaplay;
