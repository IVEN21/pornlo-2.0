import React from "react";
import { Link } from "react-router-dom";
const Pagination = ({ count, pageSize, currentPage, onPage }) => {
  if (Math.ceil(count / pageSize) === 1) return null;
  const pages = [];
  for (let i = 0; i < Math.ceil(count / pageSize); i++) {
    pages[i] = i + 1;
  }

  return (
    <ul className="pagination">
      {pages.map((pages) => (
        <li
          key={pages}
          className={currentPage === pages ? "pagBtn active" : "pagBtn"}
          onClick={() => {
            onPage(pages);
            window.scrollTo(0, 0);
          }}
        >
          {pages}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
