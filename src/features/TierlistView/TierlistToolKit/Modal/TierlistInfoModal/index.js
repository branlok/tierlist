import { Field, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { editTierlistInfo, saveTierlist } from "../../../TierlistSlice";
import { StyledOverlay } from "../../styles";
import * as Yup from "yup";
import { expandIn } from "../../../../../GlobalStyles";
import { ReactComponent as CrossDelete } from "../../../../../Styles/svg/CrossDelete.svg";
function TierlistInfo({ modalOpen, setModalOpen }) {
  let { title, description, size, theme } = useSelector(
    (state) => state.loadedTierlist.tierlist
  );
  let dispatch = useDispatch();

  let initialValues = {
    title,
    description,
    // size,
    theme,
  };

  const SignupSchema = Yup.object().shape({
    title: Yup.string().max(60, "Too Long!").required("Required"),
    description: Yup.string().max(240, "Too Long!"),
    // size: Yup.string().required("Required"),
    theme: Yup.string().required("Required"),
  });

  useEffect(() => {
    let handleCloseModal = function (event) {
      if (event.key === "Escape") {
        //do something
        setModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleCloseModal);
    return () => {
      document.removeEventListener("keydown", handleCloseModal);
    };
  }, []);

  return (
    <StyledOverlay
      onClick={(e) => {
        e.preventDefault();
        setModalOpen(false);
      }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={async (values, actions) => {
          dispatch(editTierlistInfo({ newValues: values, multiple: true }));
          setModalOpen(false);
          await dispatch(saveTierlist());
        }}
      >
        {(props) => {
          return (
            <StyledModule
              onSubmit={props.handleSubmit}
              onClick={(e) => e.stopPropagation(e)}
            >
              <StyledHeader>
                <div className="spacing">
                  <button
                    aria-label="Close"
                    onClick={() => setModalOpen(false)}
                  >
                    <CrossDelete className="close" />
                  </button>
                </div>
                <div className="right">Project Settings</div>
              </StyledHeader>
              <StyledSection shrink={true}>
                <div className="title">Tierlist</div>
                <div className="body">
                  <div className="field">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      placeholder="60 characters"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.title}
                      name="title"
                    ></input>
                    {props.errors.title && props.touched.title ? (
                      <div className="warning">{props.errors.title}</div>
                    ) : null}
                  </div>
                  <div className="field">
                    <label>Caption</label>
                    <input
                      type="text"
                      placeholder="240 characters"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.description}
                      name="description"
                    ></input>
                  </div>
                </div>
              </StyledSection>
              <StyledSection shrink={true}>
                <div className="title">Appearance</div>
                <div className="body">
                  <div className="field">
                    <label>Theme</label>
                    <Field name="theme" component="select">
                      <option value="default">Default - Purple</option>
                      <option value="pink">Pink</option>
                      <option value="brightPink">Bright Pink</option>
                      <option value="blue">Blue</option>
                      <option value="brightBlue">Bright Blue</option>
                      <option value="orange">Orange</option>
                      <option value="brightOrange">Bright Orange</option>
                      <option value="red">Red</option>
                      <option value="brightRed">Bright Red</option>
                      <option value="yellow">Olive Green</option>
                      <option value="brightYellow">Yellow</option>
                    </Field>
                  </div>
                  {/* <div className="field">
                    <label>Image Dimensions</label>
                    <label className="radio-label">
                      <Field type="radio" name="size" value="original" />
                      Retain Aspect Ratio
                    </label>
                    <label className="radio-label">
                      <Field type="radio" name="size" value="square" />
                      1:1
                    </label>
                  </div> */}
                </div>
              </StyledSection>
              <StyledSection height={100} shrink={false} flexEnd={true}>
                <div className="title">Confirm</div>
                <div className="body">
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit">
                    Save
                  </button>
                </div>
              </StyledSection>
            </StyledModule>
          );
        }}
      </Formik>
    </StyledOverlay>
  );
}

export const StyledHeader = styled.div`
  width: 100%;
  height: 35px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 3px 3px 0px 0px;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
  border-bottom: 1px solid ${(props) => props.theme.main.accent}; //#30269d;
  flex-shrink: 0;
  z-index: 1;
  font-size: 14px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  .spacing {
    width: 150px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-right: 4px solid ${(props) => props.theme.main.accent}; //#30269d;
    display: flex;
    align-items: center;
    button {
      border-style: none;
      background-color: transparent;
      cursor: pointer;
    }
    .close {
      height: 10px;
      margin-left: 10px;
      width: 10px;
      fill: white;
    }
  }
  .right {
    .title {
      font-size: 14px;
      margin: 0px;
      font-weight: bold;
    }
    display: flex;
    .close {
    }
  }
`;

export const StyledModule = styled.form`
  height: 360px;
  width: 700px;
  background-color: #131313;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  animation: ${expandIn} 0.3s ease forwards;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 3px;
  position: relative;
`;

let StyledSection = styled.section`
  display: flex;
  height: ${({ height }) => (height ? height : "100%")};
  flex-shrink: ${({ shrink }) => (shrink ? "1" : "0")};
  .title {
    width: 150px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    flex-shrink: 0;
    border-right: 4px solid ${(props) => props.theme.main.accent}; //30269d;
    font-weight: bold;
    font-size: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  .body {
    font-size: 16px;
    display: flex;
    width: 100%;
    display: flex;
    justify-content: ${({ flexEnd }) => (flexEnd ? "flex-end" : "flex-start")};
    align-items: start;
    padding: 15px 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    .field {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;
      width: 50%;
      margin: 5px;
      label {
        padding-left: 5px;
        margin-bottom: 5px;
        font-size: 14px;
        height: 25px;
      }
      .radio-label {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      input {
        border-style: none;
        background-color: #434343;
        border: 1px solid #666666;
        border-radius: 5px;
        height: 25px;
        padding-left: 5px;
        color: white;
        font-size: 13px;
      }
      .warning {
        font-size: 12px;
        color: crimson;
        margin-top: 5px;
      }
      select {
        width: 100%;
        padding-left: 5px;
        /* padding: 5px 35px 5px 5px; */
        font-size: 13px;
        border: 1px solid #666666;
        background-color: #434343;
        color: white;
        border-radius: 5px;
        height: 25px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        /* background: url(https://cdn.iconscout.com/icon/free/png-256/keyboard-arrow-down-1781999-1514199.png) 96% / 15%
          no-repeat #eee;
      } */
      }
    }
    button {
      padding: 5px 25px;
      font-weight: bold;
      border-style: none;
      cursor: pointer;
      transition: 0.2s;
      border-radius: 5px;
    }
    .cancel {
      background-color: gray;
      color: white;
      margin: 5px 0px;
      :hover {
        background-color: lightgray;
      }
    }
    .submit {
      background-color: ${(props) => props.theme.main.accent};
      color: white;
      margin: 5px 10px;
      :hover {
        background-color: ${(props) => props.theme.main.primary};
      }
    }
  }
`;

export default TierlistInfo;
