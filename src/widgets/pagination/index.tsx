import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./style.scss";

interface IBuildPagination {
  totalpages: number;
  activepage: number;
  getrequestedpage: (params: number) => void;
  service ?: string;
}

const BuildPagination: React.FunctionComponent<IBuildPagination> = ({
  totalpages,
  activepage,
  getrequestedpage,
  service
}: IBuildPagination) => {
  const [activePage, setActivePage] = useState<number>(activepage);

  const handlePageClick = (pageNumber: number) => {
    getrequestedpage(pageNumber);
    setActivePage(pageNumber);
  };


  const changePage = (newrequest: number) => {
    setActivePage(newrequest);
    getrequestedpage(newrequest);
  };

  const renderPageNumbers = () => {
    const pageNumbers: any[] = [];
    // const maxVisiblePages: number = service != "core" ? 10 : 2;
    const maxVisiblePages: number = service !== "core" ? 10 : 200;
    const minVisiblePages: number = 5;


    if (totalpages <= maxVisiblePages) {
      for (let i = 0; i < totalpages; i++) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === activePage}
            onClick={() => handlePageClick(i)}
          >
            {i + 1}
          </Pagination.Item>
        );
      }
    } else {
      const startPage: number = Math.max(
        0,
        activePage - Math.floor(minVisiblePages / 2)
      );
      const endPage: number = Math.min(totalpages - 1, startPage + minVisiblePages - 1);
      if (startPage > 0) {
        pageNumbers.push(
          <Pagination.Item key={0} onClick={() => handlePageClick(0)}>
            {1}
          </Pagination.Item>
        );
        if (startPage > 1) {
          pageNumbers.push(<Pagination.Ellipsis key="startEllipsis" />);
        }
      }
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <Pagination.Item
            key={i}
            active={i === activePage}
            onClick={() => handlePageClick(i)}
          >
            {i + 1}
          </Pagination.Item>
        );
      }
      if (endPage < totalpages - 1) {
        if (endPage < totalpages - 2) {
          pageNumbers.push(<Pagination.Ellipsis key="endEllipsis" />);
        }
        pageNumbers.push(
          <Pagination.Item
            key={totalpages - 1}
            onClick={() => handlePageClick(totalpages - 1)}
          >
            {totalpages}
          </Pagination.Item>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <React.Fragment>
      {totalpages > 1 && (
        <Pagination>
          {activePage > 0 && (
            <Pagination.Prev onClick={() => changePage(activePage - 1)} />
          )}
          {renderPageNumbers()}
          {activePage < totalpages - 1 && (
            <Pagination.Next onClick={() => changePage(activePage + 1)} />
          )}
        </Pagination>
      )}
    </React.Fragment>
  );
};

export default BuildPagination;
