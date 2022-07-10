import React, { useEffect, useRef, useState } from "react";
import {
  useMap,
  makeMarker,
  getEvStations,
  useAddMarkerList,
  apiEvStationStatus,
} from "@project/k/kakaomap-react/hooks";
import { Wrapper, Title, HLine } from "@resources/globalStyle";
import styled from "styled-components";
import { getDetailCoordToAddr } from "../../k/kakaomap-react/hooks";

const EvChargingStation = () => {
  const { kakao } = window;
  const [kakaoMap, currentCoord, setCurrentCoord] = useMap(
    kakao,
    null,
    "#kakaoMap",
    {
      level: 2,
    }
  );
  const [evChargeList, setEvChargeList] = useState([]);
  const [markerList, setMarkerList] = useAddMarkerList([]);
  useEffect(() => {
    const { lat, lng } = currentCoord;
    if (lat === 0 && lng === 0) return;
    getEvStations(kakao, currentCoord, 3).then((result) => {
      setEvChargeList(result);
      setMarkerList(
        result.map((r) => makeMarker({ ...r, kakao: kakao })),
        kakaoMap
      );
    });
  }, [kakaoMap, currentCoord]);

  useEffect(() => {
    if (markerList === []) return;
    markerList.map((marker, index) => {
      kakao.maps.event.addListener(marker, "click", (e) => {
        console.log(evChargeList[index]);
        apiEvStationStatus(evChargeList[index].statId.slice(0, 6)).then(
          (resp) =>
            console.log(
              resp.filter((r) => r.statId === evChargeList[index].statId)
            )
        );
      });
    });
  }, [markerList, evChargeList]);

  useEffect(() => {
    if (!kakaoMap) return;
    kakao.maps.event.addListener(kakaoMap, "click", (e) => {
      getDetailCoordToAddr({
        kakao: kakao,
        lat: e.latLng.getLat(),
        lng: e.latLng.getLng(),
      }).then((r) => console.log(r));
      setCurrentCoord({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
    });
  }, [kakaoMap]);

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
