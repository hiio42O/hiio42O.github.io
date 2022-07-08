import React, { useEffect, useRef, useState } from "react";
import {
  kakao,
  useMap,
  makeMarker,
  getEvStations,
  useAddMarkerList,
  apiEvStationStatus,
} from "@project/k/kakaomap-react/hooks";
import { Wrapper, Title, HLine } from "@resources/globalStyle";
import styled from "styled-components";

const EvChargingStation = () => {
  const [kakaoMap, currentCoord, setCurrentCoord] = useMap(null, "#kakaoMap", {
    level: 2,
  });
  const [evChargeList, setEvChargeList] = useState([]);
  const [markerList, setMarkerList] = useAddMarkerList([]);
  useEffect(() => {
    const { lat, lng } = currentCoord;
    if (lat === 0 && lng === 0) return;
    getEvStations(currentCoord, 2).then((result) => {
      setEvChargeList(result);
      console.log(result);
      setMarkerList(
        result.map((r) => makeMarker(r)),
        kakaoMap
      );
    });
  }, [kakaoMap, currentCoord]);

  useEffect(() => {
    if (markerList === []) return;
    markerList.map((marker, index) => {
      kakao.maps.event.addListener(marker, "click", (e) => {
        console.log(evChargeList[index]);
        apiEvStationStatus(evChargeList[index].statId.slice(0, 3)).then(
          (resp) =>
            console.log(
              resp.filter((r) => r.statId === evChargeList[index].statId)
            )
        );
      });
    });
  }, [markerList, evChargeList]);

  return (
    <Wrapper>
      <Title fontSize={"2rem"}>전기차 충전소 정보</Title>
      <HLine />
      <KakaoMapWrapper id="kakaoMap"></KakaoMapWrapper>
    </Wrapper>
  );
};

export default EvChargingStation;

const KakaoMapWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
