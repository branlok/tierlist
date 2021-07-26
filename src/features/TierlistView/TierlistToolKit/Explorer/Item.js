import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import db from "../../../../db";

function Item({ item }) {
  //better appraoch to use api from indexeddb
  //if adding sort, like sort by api rank, need asign weight to each row.
  //adding serach abilities
  let rowReference = useSelector((state) => state.loadedTierlist.rows);

  useEffect(() => {
    (async () => {
      let x = await db.items
        .where("id")
        .equals(item.id)
        .each((item) => console.log(item, "werds"));
    })();
  }, []);

  return (
    <StyledItem>
      <img className="itemImage" src={item.imageURL}></img>
      <StyledItemContent>
        <div className="top">
          <input className="input-title" placeholder="add title" type="text" />

          {/* <div className="title">add title</div> */}
          <div className="tag">{rowReference[item.resides].name}</div>
        </div>
        <textarea className="input-description" placeholder="add note" />
      </StyledItemContent>
      <StlyedBG src={item.imageURL} />
    </StyledItem>
  );
}

let StyledItem = styled.div`
  width: 100%;
  height: 125px;
  display: flex;
  position: relative;
  .itemImage {
    height: 100%;
    width: 100px;
    object-fit: cover;
    flex-shrink: 0;
    z-index: 1;
  }
`;

let StyledItemContent = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1;
  margin: 10px;
  display: flex;
  flex-direction: column;
  /* backdrop-filter: blur(3px); */
  .top {
    width: 100%;
    height: 25px;
    font-weight: bold;
    display: flex;
    
    .input-title {
      background-color: transparent;
      border-style: none;
      color: white;
      font-weight: bold;
      padding: 0px;
      width: 100%;
      padding-right: 10px;
      padding-left: 5px;
      :focus {
        outline: none;
      }
    }
    .tag {
      width: auto;
      flex-shrink: 0;
      padding: 0px 20px;
      /* margin-right: 5px; */
      border: 1px solid gray;
      backdrop-filter: blur(10px);
      /* background-color: black; */
      border-radius: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .input-description {
    background-color: rgba(0,0,0,0.1);
    border-radius: 5px;
    margin-top: 10px;
    border-style: none;
    color: white;
    font-weight: bold;
    padding: 5px;
    font-size: 12px;
    resize: none;
    /* height: 50px; */
    /* flex-grow: auto; */
    font-family: Arial, Helvetica, sans-serif;
    :focus {
      outline: none;
    }
    ::placeholder {
        color: #bfbfbf;
    }
  }
`;

let StlyedBG = styled.img`
  position: absolute;
  left: 0px;
  top: 0px;
  height: 100%;
  width: 100%;
  opacity: 0.2;
  object-fit: cover;
  object-position: center center;
`;

export default Item;
