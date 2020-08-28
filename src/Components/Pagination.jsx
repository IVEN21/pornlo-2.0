import React from "react";
import { NavLink } from "react-router-dom";
const Pagination = ({ count, pageSize, currentPage, onPage, user }) => {
  if (Math.ceil(count / pageSize) === 1) return null;
  const pages = [];
  for (let i = 0; i < Math.ceil(count / pageSize); i++) {
    pages[i] = i + 1;
  }

  return (
    <ul className="pagination">
      {pages.map((pages) => (
        <NavLink
          key={pages}
          style={{ listStyle: "none" }}
          to={`/pornlo/${pages}`}
          className={currentPage === pages ? "pagBtn active" : "pagBtn"}
        >
          <li
            onClick={() => {
              onPage(pages);
              window.scrollTo(0, 0);
            }}
          >
            {pages}
          </li>
        </NavLink>
      ))}
    </ul>
  );
};

export default Pagination;
