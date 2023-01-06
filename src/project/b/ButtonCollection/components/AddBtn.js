import React from "react";
import styled from "styled-components";

const AddBtn = (props) => {
  return (
    <AddBtnWrapper
      {...props}
      onClick={(e) => {
        if (props.onClik) {
          props.onClick();
        }
      }}
    >
      <span></span>
      <span></span>
    </AddBtnWrapper>
  );
};

export default AddBtn;

const AddBtnWrapper = styled.div`
  position: fixed;
  border-radius: 100%;
  width: ${(props) => (props.radius ? props.radius + "px" : "16px")};
  height: ${(props) => (props.radius ? props.radius + "px" : "16px")};
  background-color: ${(props) =>
    props.backgroudColor ? props.backgroudColor : "white"};
  border: 1px solid black;
  bottom: ${(props) => (props.bottom ? props.bottom + "px" : "20px")};
  right: ${(props) => (props.right ? props.right + "px" : "50%")};
  > span {
    position: absolute;
    display: inline-block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: black;
  }
  > span:nth-child(1) {
    width: 2px;
    height: 80%;
  }
  > span:nth-child(2) {
    height: 2px;
    width: 80%;
  }
`;
