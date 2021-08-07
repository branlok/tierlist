import React from "react";
import StyledTable, { StyledCol } from "../Modal/Styles/StyledTable";
import TableRow from "./TableRow";
import { ReactComponent as SortBySVG } from "../../../../Styles/svg/triangle.svg";
import styled from "styled-components";
function Table({
  tierlists,
  setReverse,
  reverse,
  category,
  setCategory,
  disableSort,
}) {
  return (
    <StyledTable>
      <thead>
        <tr>
          <th
            className="title"
            onClick={() => {
              setCategory("title");
              setReverse((prevState) => !prevState);
            }}
          >
            <StyledCol
              className="sortingSVG"
              reverse={reverse}
              selected={category == "title"}
            >
              Title <SortBySVG className="sortingSVG" />
            </StyledCol>
          </th>
          <th
            className="dateAdded"
            onClick={() => {
              setCategory("date");
              setReverse((prevState) => !prevState);
            }}
          >
            <StyledCol
              reverse={reverse}
              selected={!disableSort && category == "date"}
            >
              Date Added
              <SortBySVG className="sortingSVG" />
            </StyledCol>
          </th>
          <th
            className="lastEdited"
            onClick={() => {
              setCategory("lastEdited");
              setReverse((prevState) => !prevState);
            }}
          >
            <StyledCol
              reverse={reverse}
              disabled={!disableSort}
              selected={!disableSort && category == "lastEdited"}
            >
              Last Edited
              <SortBySVG className="sortingSVG" />
            </StyledCol>
          </th>
          <th className="action">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tierlists.map((item) => (
          <TableRow key={item.id} item={item} />
        ))}
      </tbody>
    </StyledTable>
  );
}

export default Table;
