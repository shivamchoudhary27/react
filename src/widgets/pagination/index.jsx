import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './style.scss';

const CustomPagination = ({totalpages, activepage, getrequestedpage}) => {
  const [activePage, setActivePage] = useState(activepage);

  const handlePageClick = (pageNumber) => {
    getrequestedpage(pageNumber);
    setActivePage(pageNumber);
  }

  const changePage = (newrequest) => {
    setActivePage(newrequest);
    getrequestedpage(newrequest);
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < totalpages; i++) {
      pageNumbers.push(
        <Pagination.Item key={i} active={(i) === activePage} onClick={() => handlePageClick(i)}>
          {i + 1}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  }

  return (
    <>
      <Pagination>
        {activePage > 1 && 
        <Pagination.Prev onClick={() => changePage(activePage - 1)}/>
        }
        {renderPageNumbers()}
        {
          activePage < totalpages &&
        <Pagination.Next onClick={() => changePage(activePage + 1)}/>
        }
      </Pagination>
    </>
  );
}

export default CustomPagination;