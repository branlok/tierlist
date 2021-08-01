import { Formik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import db from "../../../../db";

function Search({ setQueryResult }) {
  let initialValues = { query: "" };
  let { id } = useParams();

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          try {
            if (values.query.length == 0) {
              setQueryResult(false);
            } else {
              await db.items
                .where("name")
                .startsWithIgnoreCase(values.query)
                .toArray((arr) => {
                  let x = arr.filter((item) => item.tierlistId == id);
                  console.log(x);
                  setQueryResult(x);
                });
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
              <button type="submit">Search</button>
            </StyledForm>
          );
        }}
      </Formik>
    </div>
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
  border-radius: 10px !important;
  font-family: Arial, Helvetica, sans-serif;
`;

let StyledForm = styled.form`
  height: 30px;
  padding: 5px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 5px 0px;

  button {
    border-radius: 10px;
    height: 100%;
    width: 80px;
    flex-shrink: 0;
    background-color: ${(props) => props.theme.main.accent};
    color: white;
    font-weight: bold;
    border-style: none;
    margin-left: 10px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default Search;
