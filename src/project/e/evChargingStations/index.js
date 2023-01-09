// import React, { useEffect, useRef, useState } from "react";
// import {
//   useMap,
//   makeMarker,
//   getEvStations,
//   useAddMarkerList,
//   apiEvStationStatus,
// } from "@project/k/kakaomap-react/hooks";
// import StationsList from "@project/e/evChargingStations/components/stationsList";
// import { Wrapper, Title, HLine } from "@resources/globalStyle";
// import styled from "styled-components";
// import { getDetailCoordToAddr } from "../../k/kakaomap-react/hooks";
// import StationState from "./components/stationState";

// const EvChargingStation = () => {
//   const { kakao } = window;
//   const [kakaoMap, currentCoord, setCurrentCoord] = useMap(
//     kakao,
//     null,
//     "#kakaoMap",
//     {
//       level: 3,
//     }
//   );
//   const [stationState, setStationState] = useState([]);
//   const [evChargeList, setEvChargeList] = useState([]);
//   const [markerList, setMarkerList] = useAddMarkerList([]);
//   useEffect(() => {
//     const { lat, lng } = currentCoord;
//     if (lat === 0 && lng === 0) return;
//     getEvStations(kakao, currentCoord, 3).then((result) => {
//       setEvChargeList(result);
//       setMarkerList(
//         result.map((r) => makeMarker({ ...r, kakao: kakao })),
//         kakaoMap
//       );
//     });
//   }, [kakaoMap, currentCoord]);

//   useEffect(() => {
//     if (markerList === []) return;
//     markerList.map((marker, index) => {
//       kakao.maps.event.addListener(marker, "click", (e) => {
//         apiEvStationStatus(evChargeList[index].statId.slice(0, 6)).then(
//           (resp) => {
//             resp = resp.filter((r) => r.statId === evChargeList[index].statId);
//             setStationState(resp);
//           }
//         );
//       });
//     });
//   }, [markerList, evChargeList]);

//   useEffect(() => {
//     if (!kakaoMap) return;
//     kakao.maps.event.addListener(kakaoMap, "click", (e) => {
//       getDetailCoordToAddr({
//         kakao: kakao,
//         lat: e.latLng.getLat(),
//         lng: e.latLng.getLng(),
//       }).then((r) => console.log(r));
//       setCurrentCoord({ lat: e.latLng.getLat(), lng: e.latLng.getLng() });
//     });
//   }, [kakaoMap]);
//   useEffect(() => {
//     if (!kakaoMap) return;
//     if (stationState.length > 0) {
//       kakaoMap.panTo(
//         new kakao.maps.LatLng(stationState[0].lat, stationState[0].lng)
//       );
//     }
//   }, [stationState, kakaoMap]);
//   return (
//     <Wrapper>
//       <Title fontSize={"2rem"}>전기차 충전소 정보</Title>
//       <span>공공데이터를 이용한 개인 포트폴리오용 데모 페이지입니다.</span>
//       <HLine />
//       <KakaoMapWrapper id="kakaoMap">
//         <StationsList
//           stations={evChargeList}
//           onClick={(resp) => setStationState(resp)}
//         />
//         {stationState.length > 0 && (
//           <StationState
//             state={stationState}
//             onClick={(e) => setStationState([])}
//           />
//         )}
//       </KakaoMapWrapper>
//     </Wrapper>
//   );
// };

// export default EvChargingStation;

// const KakaoMapWrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   position: relative;
// `;
