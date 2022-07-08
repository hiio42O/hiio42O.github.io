import React, { useEffect, useState, useCallback, forwardRef } from "react";
export const { kakao, navigator } = window;
export const geocoder = new kakao.maps.services.Geocoder();

export const useMap = (
  init,
  target,
  options = {
    level: 1, // 지도의 확대 레벨
  }
) => {
  const [kakaoMap, setKakaoMap] = useState(init);
  const [currentCoord, setCurrentCoord] = useState({ lat: 0, lng: 0 });
  useEffect(() => {
    getCurrentPosition().then((coord) => {
      const { lat, lng } = coord;
      if (lat === 0 && lng === 0) return;
      let mapOption = {
        center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 1, // 지도의 확대 레벨
      };
      mapOption = { ...mapOption, ...options };
      const map = new kakao.maps.Map(document.querySelector(target), mapOption);
      setKakaoMap(map);
      setCurrentCoord(coord);
    });
  }, []);
  return [kakaoMap, currentCoord, setCurrentCoord];
};

export const useAddMarker = (initMarker) => {
  const [marker, setMarker] = useState(initMarker);
  const onSetMarker = useCallback((marker, map) => {
    setMarker((p) => {
      if (p !== null) {
        p.setMap(null);
      }
      marker.setMap(map);
      return marker;
    });
  });
  return [marker, onSetMarker];
};

export const useAddMarkerList = (initMarkerList) => {
  const [markerList, setMarkerList] = useState(initMarkerList);
  const onSetMarkerList = useCallback((markerList = [], map) => {
    setMarkerList((prevList) => {
      return prevList.map((p) => {
        if (p !== null) {
          p.setMap(null);
        }
        return;
      });
    });
    setMarkerList(
      markerList.map((m) => {
        m.setMap(map);
        return m;
      })
    );
  });

  return [markerList, onSetMarkerList];
};

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

export const getDetailCoordToAddr = ({ lat, lng }) => {
  return new Promise((res, rej) => {
    if (lat === 0 && lng === 0) {
      rej("latLng is 0,0");
    } else {
      geocoder.coord2Address(lng, lat, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          res(result);
        } else {
          rej(status);
        }
      });
    }
  });
};

export const apiAddrToCode = (addr) => {
  return new Promise((res, rej) => {
    if (addr === "") {
      rej('Address is ""');
    }
    const url = `https://www.juso.go.kr/addrlink/addrLinkApi.do?confmKey=U01TX0FVVEgyMDIyMDcwNTIyMTQxNDExMjc2NjM=&keyword=${addr}&resultType=json`;
    const params = {
      confmKey: process.env.JOSU_API_KEY,
      keyword: addr,
      resultType: "json",
    };
    fetch(url, { method: "GET", params: params })
      .then((resp) => resp.json())
      .then((resp) => res(resp))
      .catch((err) => rej(err));
  });
};

export const apiEvStationStatus = (statId) => {
  return new Promise((res, rej) => {
    if (!statId) {
      rej("statId is false");
      return;
    }
    fetch(
      `https://api.github.com/repos/hongsamhc2/repodb/contents/evcharge/json/${statId}.json`,
      {
        method: "GET",
        headers: {
          accept: "application/vnd.github.v3.raw",
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => res(resp))
      .catch((err) => res(err));
    return;
  });
};
export const apiEvStations = (code) => {
  return new Promise((res, rej) => {
    if (!code) {
      rej("code is false");
      return;
    }
    fetch(
      `https://api.github.com/repos/hongsamhc2/repodb/contents/evcharge/json/${code}.json`,
      {
        method: "GET",
        headers: {
          accept: "application/vnd.github.v3.raw",
          authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
      }
    )
      .then((resp) => resp.json())
      .then((resp) => res(resp))
      .catch((err) => res(err));
    return;
  });
};

export const getEvStations = (coord, distance = 3) => {
  return new Promise((res, rej) => {
    getDetailCoordToAddr(coord)
      .then((resp) => {
        const addr = resp[0].road_address.address_name;
        apiAddrToCode(addr)
          .then((r) => r.results.juso[0].admCd.slice(0, 2))
          .then((code) => {
            apiEvStations(code)
              .then((resp) => {
                resp = resp.reduce((prev, r) => {
                  const d = coordToDistance(coord.lat, coord.lng, r.lat, r.lng);
                  if (d <= distance) {
                    return [...prev, { ...r, d: d }];
                  } else {
                    return prev;
                  }
                }, []);
                res(resp);
              })
              .catch((err) => rej(err));
          })
          .catch((err) => rej(err));
      })
      .catch((err) => rej(err));
  });
};

export const coordToDistance = (srcLat, srcLng, targetLat, targetLng) => {
  const EARTH_RADIUS = 6371;
  srcLat = degToRad(srcLat);
  srcLng = degToRad(srcLng);
  targetLat = degToRad(targetLat);
  targetLng = degToRad(targetLng);
  const dLat = Math.abs(srcLat - targetLat);
  const dLng = Math.abs(srcLng - targetLng);
  let hav =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(srcLat) *
      Math.cos(targetLat) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  hav = Math.sqrt(hav);
  let distance = 2 * EARTH_RADIUS * Math.asin(hav);
  return distance;
};

export const degToRad = (deg) => {
  deg = Number(deg);
  return (deg * Math.PI) / 180.0;
};
