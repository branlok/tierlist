import React, { useEffect, useState } from "react";
import styled from "styled-components";
import db from "../../../../db";
import { ReactComponent as AddSVG } from "../../../../Styles/svg/Add2.svg";
import { ReactComponent as DeleteSVG } from "../../../../Styles/svg/CrossDelete.svg";

function LocalStorageItem({ imageURL, itemId, itemKeys, dateAdded }) {
  let [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (itemId) {
      (async () => {
        await db.items.where({ id: itemId }).toArray((re) => {
          if (isMounted) {
            console.log(re);
            setItemDetails(re[0]);
          }
        });
      })();
      return () => {
        isMounted = false;
      };
    }
  }, [itemId]);
  let date = new Date(dateAdded);
  if (itemDetails) {
    return (
      //   <StyledRow>

      <StyledRow exists={itemKeys.includes(itemId)}>
        <td className="picture-column">
          <img className="picture" src={imageURL}></img>
        </td>
        <td>{itemDetails.name.length > 0 ? itemDetails.name : "Untitled"}</td>
        <td>{date.toLocaleDateString()}</td>
        <td>
          {itemKeys.includes(itemId) ? (
            "added"
          ) : (
            <div className="action-wrapper">
              <button>
                <AddSVG className="svg" />
              </button>
              <button>
                <AddSVG className="svg delete" />
              </button>

              {/* <DeleteSVG className="svg"/> */}
            </div>
          )}
        </td>
      </StyledRow>

      //   </StyledRow>
    );
  } else {
    return null;
  }
}
let StyledRow = styled.tr`
  height: 50px;
  width: 100%;
  padding: 5px;
  transition: 0.2s;
  color: gray;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  :hover {
    color: white;
  }
  .picture-column {
    width: 100px;
    text-align: center;
    vertical-align: middle;
  }
  /* :nth-child(even) {
    background: #111111;
  }
  :nth-child(odd) {
    background: #181818;
  } */
  :hover {
    background-color: ${(props) => props.theme.main.accent};
  }
  .picture {
    height: 50px;
    width: 50px;
    object-fit: cover;
    overflow: hidden;
  }
  td {
    text-align: start;
    vertical-align: middle;
    font-weight: bold;
    /* border-right: 1px solid ${(props) => props.theme.main.accent}; */
    padding-left: 10px;
    .action-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;

    }
    button {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 1px solid #212121;
      margin-right: 10px;
      background-color: #131313;
      cursor: pointer;
      transition: 0.2s;
      :hover {
        transform: scale(1.1);
        background-color: #212121;
      }
    }
    .svg {
      fill: white;
      height: 10px;
      width: 10px;
      padding: 10px;
      margin: 0px;
    }
    .delete {
      fill: #8f1313;
      transform: rotate(45deg);
    }
  }
`;

export default LocalStorageItem;
