import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function DropdownSort({ setSort }) {
  let [open, setOpen] = useState(false);
  const node = useRef();
  const handleClickOutside = (e) => {

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
    <DropdownWrapper
      ref={node}
      onClick={() => setOpen((prevState) => !prevState)}
    >
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
  width: auto;
  height: 25px;
  color: white;
  font-weight: bold;
  display: flex;
  flex-shrink: 0;
  margin-left: 5px;
  justify-content: center;
  flex-direction: column;
  border-radius: 5px;
  .drop-down {
    height: 25px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-style: none;
    border-radius: 5px;
    width: auto;
    padding: 0px 15px;
    font-size: 14px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: flex-end;
    text-align: center;
    cursor: pointer;
    transition: 0.2s;
    background-color: transparent;
    color: white;
    background-color: rgba(0,0,0,0.2);
    :hover {
      background-color: rgba(0,0,0,0.3);
    }
  }
  .dropdownContainer {
    position: absolute;
    border: 1px solid #242424;
    background-color: ${props => props.theme.main.primaryVarient};
    z-index: 2;
    border-radius: 5px;
    width: 170px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
    top: 35px;
    right: 0px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
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
        background-color: rgba(255,255,255,0.3);
        border-left: 2px solid white;
      }
    }
  }
`;

export default DropdownSort;
