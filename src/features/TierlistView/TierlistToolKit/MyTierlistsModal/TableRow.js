import React, { useState } from "react";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import {
  StyledActionButton,
  StyledActionLink,
} from "../Modal/Styles/StyledTable";
import { ReactComponent as GargabeSVG } from "../../../../Styles/svg/Gargabe.svg";
import { deleteTierlist } from "../../TierlistSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function TableRow(item) {
  let [confirmDelete, setConfirmDelete] = useState(false);
  let dispatch = useDispatch();
  let [deleted, setDeleted] = useState(false);
  let { id: currentTierlistId } = useParams();

  let { title, status, lastEdited, date, id, numberOfItems } = item.item;

  let handleDelete = async (targetTierlistId, calledFrom) => {
    let deleteSelf = targetTierlistId === calledFrom;

    if (deleteSelf) {
      await dispatch(
        deleteTierlist({
          tierlistId: id,
          option: { deleteImageIndex: false, reset: true },
        })
      );
    } else {
      await dispatch(
        deleteTierlist({
          tierlistId: id,
          option: { deleteImageIndex: false, reset: false },
        })
      );
    }

    setDeleted(true);
  };

  let lastCreated = new Date(date);
  let lastModified = new Date(lastEdited);

  if (deleted) return null;
  return (
    <tr>
      <td className="title"> {title}</td>
      <td>
        <ReactTimeAgo date={lastCreated} locale="en-US" />
      </td>
      <td>
        <ReactTimeAgo date={lastModified} locale="en-US" />
        {/* ({status ? "expires in "}) */}
      </td>
      {/* <th>{numberOfItems}</th> */}
      <td className="action">
        <StyledActionLink
          href={`/build/${id}`}
          className="linkbutton"
          width="fit"
          disable={confirmDelete}
        >
          Open
        </StyledActionLink>

        <StyledActionButton
          bg={confirmDelete ? "#131313" : "#910715"}
          width={confirmDelete ? "fit" : ""}
          onClick={() => setConfirmDelete((prevState) => !prevState)}
        >
          {!confirmDelete ? <GargabeSVG className="svg" /> : "Cancel"}
        </StyledActionButton>
        {confirmDelete && (
          <StyledActionButton
            bg={"#910715"}
            width="fit"
            onClick={async () => {
              await handleDelete(id, currentTierlistId);
            }}
          >
            Confirm
          </StyledActionButton>
        )}
      </td>
    </tr>
  );
}

export default TableRow;
