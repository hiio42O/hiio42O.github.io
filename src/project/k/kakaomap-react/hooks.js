import React, { useEffect, useState, useCallback, forwardRef } from "react";
export const { kakao, navigator } = window;

export const useMap = (init, target) => {
  const [kakaoMap, setKakaoMap] = useState(init);
  const [currentCoord, setCurrentCoord] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    getCurrentPosition().then((coord) => {
      const { lat, lng } = coord;
      if (lat === 0 && lng === 0) return;
      const mapOption = {
        center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 1, // 지도의 확대 레벨
      };
      const map = new kakao.maps.Map(document.querySelector(target), mapOption);
      setKakaoMap(map);
      setCurrentCoord(coord);
    });
  }, []);
  return [kakaoMap, currentCoord];
};

export const addMarker = ({ map, lat, lng, imageSrc }) => {};

export const makeMarker = ({ lat, lng, imageSrc }) => {
  const imageSize = new kakao.maps.Size(64, 69);
  const imageOption = { offset: new kakao.maps.Point(32, 34.5) };

  const markerImage = imageSrc
    ? new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
    : null;
  const markerPosition = new kakao.maps.LatLng(lat, lng);

  // 마커를 생성합니다
  return new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage, // 마커이미지 설정
  });
};

export const getCurrentPosition = () => {
  return new Promise((res, rej) => {
    const { geolocation } = navigator;
    if (geolocation) {
      geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          res({ lat: latitude, lng: longitude });
        },
        (err) => {
          if (err) throw err;
          rej(err);
        }
      );
    } else {
      const IP_URL = "http://ip-api.com/json";
      axios
        .get(IP_URL)
        .then((resp) => {
          const { lat, lon } = resp.data;
          res({ lat: lat, lng: lon });
        })
        .catch((err) => rej(err));
    }
  });
};
