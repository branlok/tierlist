import React from "react";
import { useState } from "react";
import { useEffect } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../../db";

import Item from "./Explorer/Item";

function Explorer() {
  let items = useSelector((state) => state.loadedTierlist.items);
//   let row = useSelector((state) => state.loadedTierlist.rows);
  let [orderedItems, setOrderedItems] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    (async () => {
      console.log("i randit");
      const products = await db.items
        .where('[tierlistId+resides]')
        .between([id, "0"], [id, "\uffff"])
        .toArray((re) => {
          console.log(re);
          setOrderedItems(re);
        });
    })();
  }, [items]);

  return (
    <StyledWrapper>
      <h1>Explorer</h1>
      <StyledExplorer>
        {orderedItems.map((item, idx) => {
          //   console.log(item, item[item.id], "what")
          return <Item key={item.id} item={items[item.id]} />;
        })}

        {/* {Object.values(items).map((item, idx) => {
          //   console.log(item, "wer");
          return (
            <Item key={idx} item={item} />
            // <StyledItem key={idx}>
            //   <img className="itemImage" src={item.imageURL}></img>
            //   <StyledItemContent>
            //     <div className="top">
            //       <div>add title</div>
            //       <div>{item}</div>
            //     </div>
            //     <div className="bottom">add description</div>
            //   </StyledItemContent>
            //   <StlyedBG src={item.imageURL} />
            // </StyledItem>
          );
        })} */}
      </StyledExplorer>
    </StyledWrapper>
  );
}

// let StyledItem = styled.div`
//   width: 100%;
//   height: 125px;
//   display: flex;
//   position: relative;
//   .itemImage {
//     height: 100%;
//     width: 100px;
//     object-fit: cover;
//     flex-shrink: 0;
//     z-index: 1;
//   }
// `;

// let StyledItemContent = styled.div`
//   width: 100%;
//   height: 100%;
//   z-index: 1;
//   margin: 10px;
//   display: flex;
//   flex-direction: column;
//   /* backdrop-filter: blur(3px); */
//   .top {
//     width: 100%;
//     height: 25px;
//     font-weight: bold;
//     display: flex;
//   }
//   .bottom {
//     font-size: 12px;
//   }
// `;

// let StlyedBG = styled.img`
//   position: absolute;
//   left: 0px;
//   top: 0px;
//   height: 100%;
//   width: 100%;
//   opacity: 0.2;
//   object-fit: cover;
//   object-position: center center;
// `;

let StyledWrapper = styled.div`
  height: calc(100% - 400px);
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  
  h1 {
    color: white;
    text-align: center;
    margin-bottom: 10px;
    flex-shrink: 0;
  }
`;

let StyledExplorer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background-color: #382b54;
  overflow-y: scroll;
  user-select: none; 
  ::-webkit-scrollbar {
  height: 0;
  width: 0;
  color: transparent;
}
`;

export default Explorer;
