import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addImage } from "../../../../imageSlice";
import {
  addItem,
  deleteItemFromDB,
  editItemTitle,
  saveTierlist,
} from "../../../../TierlistSlice";

function Item({ id, imageUrl, title, description }) {
  //on add dispatch async to indexeddb item, images and
  let dispatch = useDispatch();
  let { id: tierlistId } = useParams();
  let items = useSelector((state) => state.loadedTierlist.items);

  useEffect(() => {
    if (items[id]) {
      setExists(true);
    } else {
      setExists(false);
    }
  }, [items]);

  let [exists, setExists] = useState(false);

  let add = async (id, title, imageUrl) => {
    let objectURLS = [[imageUrl, id]];
    await dispatch(
      addImage({
        source: imageUrl,
        imageURL: imageUrl,
        id,
        tierlistId,
      })
    );
    dispatch(addItem(objectURLS));
    dispatch(editItemTitle({ id, field: "name", newValue: title }));
    await dispatch(saveTierlist());
  };

  let remove = async (id, title, imageUrl) => {
    await dispatch(deleteItemFromDB(id)); //doesn't delete source unless its the last item.
    await dispatch(saveTierlist());
  };

  return (
    <StyledItem className="modal" remove={exists}>
      <img src={imageUrl} />
      <div className="wrapper">
        <header className="top">
          <h1 className="title">
            {title?.length > 0 ? title.substring(0, 70) : "Untitled"}{" "}
            {title?.length > 70 ? "..." : ""}
          </h1>
          {!exists ? (
            <button onClick={() => add(id, title, imageUrl)}>
              Add to Tierlist
            </button>
          ) : (
            <button onClick={() => remove(id)}>remove</button>
          )}
        </header>
        <div className="bottom">
          <p>{description}</p>
        </div>
      </div>
    </StyledItem>
  );
}

let StyledItem = styled.div`
  height: 155px;
  width: 100%;
  display: flex;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  /* border: 2px solid #3b3b3b; */
  border: 2px solid ${(props) => props.theme.main.primary};
  margin: 5px;
  transition: 0.2s;
  :hover {
    border: 2px solid ${(props) => props.theme.main.primary};
  }
  &:hover .top {
    background-color: ${(props) => props.theme.main.primary};
  }
  /* &:hover button {
      height: 30px !important;
  } */
  .wrapper {
    /* height: 125px; */
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${(props) => props.theme.main.primaryVarient};
    .top {
      width: 100%;
      height: 60px;
      font-weight: bold;
      display: flex;
      align-items: center;
      /* background-color: rgba(255, 255, 255, 0.1); */
      background-color: ${(props) => props.theme.main.primary};
      flex-shrink: 0;
      .title {
        background-color: transparent;
        border-style: none;
        color: white;
        font-weight: bold;
        width: 100%;
        /* height: 50px; */
        height: 100%;
        overflow: hidden;
        /* padding-left: 10px; */
        font-size: 12px;
        color: ${(props) => props.theme.fontColor["100"]};
        text-align: start;
        padding-left: 10px;
        display: flex;
        align-items: center;
        margin-right: 5px;
      }
    }
    .bottom {
      height: 100%;
      width: 100%;
      padding: 10px;
      font-size: 12px;
      margin-bottom: 10px;
      /* color: #cfcfcf; */
      color: ${(props) => props.theme.fontColor["200"]};
      background-color: ${(props) => props.theme.main.primaryVarient};
      ::-webkit-scrollbar {
        height: 0;
        width: 0;
        color: transparent;
      }
      scrollbar-width: none;
      overflow-y: scroll;
    }
    button {
      flex-shrink: 0;
      /* height: 20px; */
      height: 25px;
      width: 100px;
      border-style: none;
      font-weight: bold;
      color: white;
      background-color: ${(props) =>
        props.remove ? "rgba(150,0,0,1)" : "rgba(0, 0, 0, 0.45)"};
      transition: 0.2s;
      cursor: pointer;
      border-radius: 20px;
      margin-right: 5px;
      padding: 0px 10px;
      font-size: 10px;
      :hover {
        transform: scale(0.95);
        background-color: ${(props) =>
          props.remove ? "rgba(255,0,0,0.8)" : props.theme.main.accent};
      }
      :active {
        transform: scale(0.9);
        
      }
    }

    h1 {
      font-size: 12px;
      font-weight: bold;
    }
  }
  img {
    object-fit: cover;
    height: 100%;
    width: 150px;
    overflow: hidden;
  }
`;

export default Item;
