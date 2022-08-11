import React from "react";
import styled from "styled-components";

export const ToggleBtn = ({ radius, onChange = () => {} }) => {
  return (
    <>
      <ToggleBtnStyle radius={radius}>
        <input
          type="checkbox"
          id="grad-toggle-btn"
          onChange={(e) => onChange(e)}
          style={{ display: "none" }}
        />
        <label htmlFor="grad-toggle-btn"></label>
      </ToggleBtnStyle>
    </>
  );
};

const ToggleBtnStyle = styled.div`
  width: ${(props) => (props.radius ? props.radius * 3 + 2 + "px" : "32px")};
  height: ${(props) => (props.radius ? props.radius + 8 + "px" : "24px")};
  background-color: white;
  position: relative;
  border-radius: ${(props) => (props.radius ? props.radius + "px" : "16px")};
  box-shadow: 0px 0px 1px 1px rgba(100, 100, 100, 0.3);
  > span {
    position: absolute;
    display: inline-block;
    top: 50%;
    transform: translate(-50%, -50%);
    left: 50%;
    width: 80%;
    height: 3px;
    background-color: black;
  }
  > label {
    position: absolute;
    display: inline-block;
    top: 50%;
    transform: translate(0, -50%);
    width: ${(props) => (props.radius ? props.radius + "px" : "16px")};
    height: ${(props) => (props.radius ? props.radius + "px" : "16px")};
    border-radius: 50%;
    border: 1px solid black;
    transition: 0.3s;
    background-color: white;
  }
  > input[type="checkbox"]:checked ~ label {
    left: ${(props) =>
      props.radius ? props.radius * 2 - props.radius / 4 + "px" : "26px"};
  }
  > input[type="checkbox"] ~ label {
    left: ${(props) => (props.radius ? props.radius / 4 + "px" : "4px")};
  }
`;
