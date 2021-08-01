import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function DropdownSort({ setSort }) {
  let [open, setOpen] = useState(false);
  const node = useRef(); 
  const handleClickOutside = (e) => {
    console.log("clicking anywhere");
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  
  return (
    <DropdownWrapper ref={node} onClick={() => setOpen((prevState) => !prevState)}>
      <button className="drop-down">Sort By</button>
      {open && (
        <ul className="dropdownContainer">
          <li className="option" onClick={() => setSort("[tierlistId+name]")}>
            Alphabetical
          </li>
          <li
            className="option"
            onClick={() => setSort("[tierlistId+resides]")}
          >
            Rank
          </li>
        </ul>
      )}
    </DropdownWrapper>
  );
}

let DropdownWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 25px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  .drop-down {
    height: 25px;
    border: 1px solid #242424;
    border-radius: 5px;
    width: 100px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    cursor: pointer;
    transition: 0.2s;
    background-color: transparent;
    color: white;
    :hover {
      background-color: #2b2b2b;
    }
  }
  .dropdownContainer {
    position: absolute;
    border: 1px solid #242424;
    background-color: #161616;
    z-index: 2;
    border-radius: 5px;
    width: 170px;

    display: flex;
    justify-content: center;
    flex-direction: column;
    top: 30px;
    right: 0px;

    ::before {
      content: "";
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid #242424;
      position: absolute;
      top: -5px;
      left: 140px;
    }
    .option {
      height: 30px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      /* flex-direction: column; */
      align-items: center;
      font-size: 14px;
      padding: 20px;
      text-align: right;
      transition: 0.2s;
      cursor: pointer;
      border-left: 2px solid transparent;
      :hover {
        background-color: #2b2b2b;
        border-left: 2px solid white;
      }
    }
  }
`;

export default DropdownSort;
