import { Formik } from "formik";
import React, { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useAsync from "../../../../customHooks/useAsync";
import db from "../../../../db";

/**
 *
 * @param {object} searchType
 * @param {string} searchType.query - "search"
 * @param {string} searchType.index - "index"
 * @param {string} searchType.key - "key"

*/
function getSearchFunction(searchType) {
  if (searchType === "search/items/name") {
    return async (values, id) => {
      return await db.items
        .where("name")
        .startsWithIgnoreCase(values.query)
        .toArray((arr) => {
          //make sure we get current tierlist
          let results = arr.filter((item) => item.tierlistId == id);
          return results;
        });
    };
  } else if (searchType === "search/tierlists/name") {
    return async (values, id) => {
      return await db.tierlists
        .where("title")
        .startsWithIgnoreCase(values.query)
        .toArray((arr) => {
          //make sure we get current tierlist
          return arr;
        });
    };
  } else if (searchType === "search/images/fileName") {
    return async (values, id) => {
      return await db.images
        .where("fileName")
        .startsWithIgnoreCase(values.query)
        .toArray((arr) => {
          //make sure we get current tierlist
          return arr;
        });
    };
  }
}
//pending, success, error, stop
//indexeddb gateway search;
// still need to implement error, loading handling to parent.

/**
 * unviersal serach component to access indexeddb via dexie logic.
 *
 * @param {object} param0
 * @param {function} param0.setQueryResult - set function to keep results
 * @param {string} param0.searchType - a string to get certain search
 * @param {function} param0.setUserSearch - a set function to explicitly toggle searchoff/on
 * @returns
 */
function Search({ setQueryResult, searchType, setUserSearch }) {
  let initialValues = { query: "" };
  let { id } = useParams();
  let targetFunction = getSearchFunction(searchType);
  let { execute, status, value, error } = useAsync(targetFunction, false);

  useEffect(() => {

    if (status == "success") {
      setQueryResult(value);
    }
    if (status == "error") {
      setQueryResult(error);
    }
  }, [status]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        try {
          if (values.query.length == 0) {
            setUserSearch(false);
          } else {
            await execute(values, id);

            // await db.items
            //   .where("name")
            //   .startsWithIgnoreCase(values.query)
            //   .toArray((arr) => {
            //     let x = arr.filter((item) => item.tierlistId == id);
            //     console.log(x);
            //     setQueryResult(x);
            //   });
          }
        } catch (err) {
          console.log(err);
        }
      }}
    >
      {(props) => {
        return (
          <StyledForm onSubmit={props.handleSubmit}>
            <StyledInput
              className="text"
              type="text"
              placeholder="search items"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.query}
              name="query"
            ></StyledInput>
            <button className="submit" type="submit">
              Search
            </button>
          </StyledForm>
        );
      }}
    </Formik>
  );
}

let StyledInput = styled.input`
  background-color: white;
  height: 100%;
  width: 100%;
  border-style: none;
  color: black;
  font-weight: bold;
  padding-left: 10px;
  border-radius: 20px !important;
  font-family: Arial, Helvetica, sans-serif;
  border: 4px solid ${(props) => props.theme.main.accent};
  transition: 0.2s;
  :hover {
    border: 4px solid ${(props) => props.theme.main.accent};
  }
  :focus {
    outline: none;
  }
`;

let StyledForm = styled.form`
  height: 30px;
  width: 100%;
  display: flex;
  align-items: center;
  /* margin-bottom: 10px; */
  .submit {
    border-radius: 15px;
    height: 100%;
    width: 80px;
    flex-shrink: 0;
    background-color: ${(props) => props.theme.main.accent};

    color: white;
    font-weight: bold;
    border-style: none;
    margin-left: 10px;
    font-family: Arial, Helvetica, sans-serif;
    transition: 0.3s;
    cursor: pointer;
    :hover {
      background-color: ${(props) => props.theme.main.primary};
    }
  }
`;

export default Search;
