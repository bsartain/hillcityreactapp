import React from 'react';

export const Pagination = ({ sermonsPerPage, totalSermons, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalSermons / sermonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="...">
      <ul className="pagination pagination-sm">
        {pageNumbers.map((pageNumber, index) => {
          return (
            <li
              onClick={() => {
                paginate(pageNumber);
                window.scroll({
                  top: 950,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
              key={pageNumber}
              className="page-item"
            >
              <button className="page-link">{pageNumber}</button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
