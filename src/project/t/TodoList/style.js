import styled from "styled-components";
import { FlexLayout } from "@resources/globalStyle";

export const Section = styled.div`
  padding: 24px;
`;
export const TodoWrapper = styled(FlexLayout)`
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
`;
export const TodoItem = styled(FlexLayout)`
  width: 80%;
  gap: 8px;
  border-radius: 16px;
  box-shadow: 1px 1px 1px 1px rgba(200, 200, 200, 0.3),
    -1px -1px 1px 1px rgba(150, 150, 150, 0.3);
  padding: 8px 16px;
  font-size: 1.2rem;
  align-items: center;
  cursor: pointer;
  > div:nth-child(1) {
    width: 8px;
  }
  > div:nth-child(2) {
    width: 128px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
  }
  > div:nth-child(3) {
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > div:nth-child(4) {
    width: 64px;
  }
  > div:nth-child(5) {
    width: 12px;
  }
  :hover {
    background-color: rgba(165, 165, 165, 0.2);
  }
`;
