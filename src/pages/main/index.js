// src/pages/main/index.js

// modules
import React from "react";
import styled from "styled-components";
import Nav from "@components/nav";
import axios from "axios";
// SVG

import { FlexCenterLayout, GridColumnLayout } from "@resources/globalStyle";

const MainWrapper = styled(FlexCenterLayout)`
  > div {
    width: 100%;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  @media screen and (max-width: 660px) {
    padding: 0 20px;
    width: calc(100% - 40px);
  }
`;

const Main = () => {
  axios
    .get(
      "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst",
      {
        params: {
          serviceKey:
            "85SVNYrwH8xXJbjJgkYoSQsBQqzKtn7WO1JdYfXeeMT37b9Br6ClP7F4gnruv/N4aY6wdkDHWNvzieim1yz98A==",
          numOfRows: 14 * 24 * 7,
          pageNo: 1,
          dataType: "JSON",
          base_date: "20230106",
          base_time: "1700",
          nx: "55",
          ny: "127",
        },
      }
    )
    .then((r) => console.log(r));

  return (
    <MainWrapper>
      <div>
        <Nav />
      </div>
    </MainWrapper>
  );
};

export default Main;
