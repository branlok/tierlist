import React from "react";
import styled from "styled-components";
import { ReactComponent as ArrowSVG } from "../../../../Styles/svg/arrow.svg";
import StyledPagination from "./Styles/StyledPagination";

function PaginationButtons({ page, setPage, itemLength, hide }) {
  return (
    <StyledPagination
      className="stylePagination"
      disableLeft={hide || page === 0}
      disableRight={hide || itemLength === 0}
    >
      {
        <button
          disabled={page === 0}
          className="left"
          onClick={() =>
            setPage((prevState) => {
              return prevState === 0 ? prevState : --prevState;
            })
          }
        >
          <ArrowSVG className="backwards svg" />
        </button>
      }
      {
        <button
          disabled={itemLength === 0}
          className="right"
          onClick={() =>
            setPage((prevState) => {
              return itemLength > 0 ? ++prevState : prevState;
            })
          }
        >
          <ArrowSVG className="forwards svg" />
        </button>
      }
    </StyledPagination>
  );
}

export default PaginationButtons;
