import styled from "styled-components";
import { FlexLayout } from "@resources/globalStyle";

export const Section = styled.div`
  padding: 24px;
`;

export const AddBtnWrapper = styled.div`
  position: fixed;
  width: 30%;
  max-width: 128px;
  height: 36px;
  border-radius: 36px;
  box-shadow: 0px 0px 1px 1px rgba(200, 200, 200, 0.5);
  bottom: 36px;
  left: 50%;
  transform: translate(-50%);
  cursor: pointer;
  > span {
    position: absolute;
    background-color: black;
    display: black;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  > span:nth-child(1) {
    width: 2px;
    height: 24px;
  }
  > span:nth-child(2) {
    height: 2px;
    width: 24px;
  }
  :hover {
    box-shadow: 0px 0px 1px 1px rgba(200, 200, 200, 0.7);
    background-color: rgba(250, 250, 250, 0.7);
  }
`;

export const EmptyItem = styled.div`
  > textarea {
    padding: 0;
    margin: 0;
    height: 160px;
    width: 100%;
    resize: none;
  }
`;
