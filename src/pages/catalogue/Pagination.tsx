import React, { useState, useEffect } from "react";
import "./style.scss";
import {PaginationType} from "../../type/index";

const Pagination = ({ showPerPage, onPaginationChange, filterdLength }: PaginationType) => {

  const [counter, setCounter] = useState<number>(1);
  //  Pagination === >>
  useEffect(
    () => {
      const value = showPerPage * counter;
      onPaginationChange(value - showPerPage, value);
    },
    [counter]
  );

  // Handle Pagination next-previous button === >>
  const handlePaginationNullPage = (type: string) => {
    if (type === "previous" && counter !== 1) setCounter(counter - 1);
    else if (type === "next" && (Math.ceil(filterdLength / showPerPage) !== counter)) setCounter(counter + 1);
  };

  return (
    <>
      <div className="">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
            {counter > 1 &&  <button
                className="page-link"
                id="pre-btn"
                onClick={() => handlePaginationNullPage("previous")}
              >
                Previous
              </button>
            }
            </li>
            <li>
              {counter}/{Math.ceil(filterdLength / showPerPage)}
            </li>
            <li className="page-item">
            { counter < (Math.ceil(filterdLength / showPerPage)) &&
              <button
                className="page-link"
                id="next-btn"
                onClick={() => handlePaginationNullPage("next")}
              >
                Next
              </button>
            }
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default Pagination;
