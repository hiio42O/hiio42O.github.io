import React from "react";
import styled from "styled-components";

export const ToggleBtn = ({
  radius,
  defaultChecked = false,
  onChange = () => {},
  id = "grad-toggle-btn",
}) => {
  return (
    <>
      <ToggleBtnStyle radius={radius} checked={defaultChecked}>
        <input
          type="checkbox"
          id={id}
          onChange={(e) => {
            onChange(e);
          }}
          style={{ display: "none" }}
          defaultChecked={defaultChecked}
        />
        <label htmlFor={id}>
          <span></span>
        </label>
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

  > label {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 100%;
    border-radius: ${(props) => (props.radius ? props.radius + "px" : "16px")};
  }
  > label > span {
    position: absolute;
    display: inline-block;
    top: 50%;
    transform: translate(0, -50%);
    width: ${(props) => (props.radius ? props.radius + "px" : "16px")};
    height: ${(props) => (props.radius ? props.radius + "px" : "16px")};
    border-radius: 50%;
    box-shadow: 0px 0px 1px 1px rgba(100, 100, 100, 0.3);
    transition: 0.5s;
    background-color: ${(props) => (props.checked ? "green" : "red")};
  }
  > input[type="checkbox"]:checked ~ label > span {
    left: ${(props) =>
      props.radius ? props.radius * 2 - props.radius / 4 + "px" : "26px"};
  }
  > input[type="checkbox"] ~ label > span {
    left: ${(props) => (props.radius ? props.radius / 2 + "px" : "4px")};
  }
`;
