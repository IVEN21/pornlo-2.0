import React from "react";
import { NavLink } from "react-router-dom";
const Pagination = ({ count, pageSize, currentPage, onPage, filter }) => {
  if (Math.ceil(count / pageSize) === 1) return null;
  const pages = [];
  for (let i = 0; i < Math.ceil(count / pageSize); i++) {
    pages[i] = i + 1;
  }

  return (
    <ul className="pagination">
      {pages.map((pages) => (
        <NavLink
          onClick={() => {
            onPage(pages);
            window.scrollTo(0, 0);
          }}
          key={pages}
          style={{ listStyle: "none" }}
          to={!filter ? `/pornlo/${pages}` : `/porns/${filter}/${pages}`}
          className={currentPage === pages ? "pagBtn active" : "pagBtn"}
        >
          <li>{pages}</li>
        </NavLink>
      ))}
    </ul>
  );
};

export default Pagination;
