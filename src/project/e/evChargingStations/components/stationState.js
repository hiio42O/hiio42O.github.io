import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { Title } from "@resources/globalStyle";
const StationState = ({ state, onClick }) => {
  const onClose = (state = false) => {
    if (state) {
      window.history.back(1);
    }
    if (onClick) {
      onClick();
    }
    window.removeEventListener("popstate", onClose);
  };
  useEffect(() => {
    const body = document.body;
    const prevStyle = body.getAttribute("style");
    body.style.overflow = "hidden";
    window.history.pushState(null, "");
    console.log(window.history);
    window.addEventListener("popstate", () => {
      onClose(false);
    });
    return () => {
      if (prevStyle) {
        body.setAttribute("style", prevStyle);
      } else {
        body.removeAttribute("style");
      }
    };
  }, []);
  return (
    <Wrapper>
      <div className="state">
        <Header>
          <Title fontSize="1.6rem">{state[0].statNm}</Title>
          <span
            onClick={(e) => {
              onClose(true);
            }}
          >
            닫기
          </span>
        </Header>
        <Body>
          <span>{state[0].addr}</span>
          <span>{state[0].useTime}</span>
          <List>
            <Item>충전소ID</Item>
            <Item>충전소위치</Item>
            <Item>충전 출력</Item>
            <Item>충전 방식</Item>
            <Item>충전 타입</Item>
            <Item>충전 상태</Item>

            {state.map((s) => {
              return (
                <Fragment key={Math.random()}>
                  <Item>{s.chgerId}</Item>
                  <Item>
                    {s.location !== "null" ? s.location : state[0].addr}
                  </Item>
                  <Item>{s.output && s.output + "kW"}</Item>
                  <Item>{s.method}</Item>
                  <Item>{chargeType[s.chgerType]}</Item>
                  <Item>{stateValue[s.stat]}</Item>
                </Fragment>
              );
            })}
          </List>
        </Body>
      </div>
    </Wrapper>
  );
};

export default StationState;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 101;
  background-color: rgba(50, 50, 50, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  > .state {
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    width: calc(100% - 16px);
    z-index: 102;
    display: flex;
    flex-direction: column;
    border-radius: 16px 16px 0 0;
    padding: 16px 8px 0 8px;
    border-top: 1px solid lightgray;
    max-width: 400px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  > span {
    font-size: 1.2rem;
    margin-left: auto;
    margin-right: 16px;
    cursor: pointer;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: scroll;
  height: 300px;
`;

const List = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
`;
const Item = styled.div`
  text-align: center;
  padding: 8px 0;
`;

const stateValue = {
  1: "통신이상",
  2: "충전대기",
  3: "충전중",
  4: "운영중지",
  5: "점검중",
  9: "상태미확인",
};

const chargeType = {
  "01": "DC차데모",
  "02": "AC완속",
  "03": "DC차데모+AC3상",
  "04": "DC콤보",
  "05": "DC차데모+DC콤보",
  "06": "DC차데모+AC3상+DC콤보",
  "07": "AC3상",
};
