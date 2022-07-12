import React, { useEffect, useRef, useState } from "react";
import {
  kakao,
  useMap,
  makeMarker,
  getCurrentPosition,
} from "@project/k/kakaomap-react/hooks";
import { Wrapper, Title, HLine } from "@resources/globalStyle";
import styled from "styled-components";

const KakaoMapReact = () => {
  const { kakao } = window;
  const [kakaoMap, currentCoord] = useMap(kakao, null, "#kakaoMap");
  useEffect(() => {
    const marker = makeMarker({ ...currentCoord, kakao: kakao });
    marker.setMap(kakaoMap);
  }, [kakaoMap, currentCoord]);

  return (
    <Wrapper>
      <Title>카카오 맵 현재 위치 표시</Title>
      <HLine />
      <KakaoMapWrapper id="kakaoMap"></KakaoMapWrapper>
    </Wrapper>
  );
};

export default KakaoMapReact;

const KakaoMapWrapper = styled.div`
  width: 100%;
  height: 300px;
`;
