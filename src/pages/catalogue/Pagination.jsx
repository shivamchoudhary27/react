import React, { useState, useEffect } from "react";
import './style.scss';

const Pagination = ({ showPerPage, onPaginationChange, totalData }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const handlePaginationNullPage = (type) => {
    if (type === "previous") {
      if (counter === 1) {
        document.getElementById('pre-btn').style.display = 'none';
        setCounter(1);
      } else {
        document.getElementById('next-btn').style.display = 'block';
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(totalData / showPerPage) === counter) {
        document.getElementById('next-btn').style.display = 'none';
        setCounter(counter);
      } else {
        document.getElementById('pre-btn').style.display = 'block';
        setCounter(counter + 1);
      }
    }
  };

  return (
    <>
      <div className="">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                id="pre-btn"
                onClick={() => handlePaginationNullPage("previous")}
              >
                Previous
              </button>
            </li>
            <li>{counter}/{Math.ceil(totalData / showPerPage)}</li>
            <li className="page-item">
              <button
                className="page-link"
                id="next-btn"
                onClick={() => handlePaginationNullPage("next")}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Pagination;
