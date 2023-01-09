import { useState, useEffect } from "react";
import axios from "axios";
import Icon from "./icon";
import Place from "./data/place.json";
import { useLocation } from "react-router";
import { useRecoilState, atom } from "recoil";

const SERVICE_KEY =
  "85SVNYrwH8xXJbjJgkYoSQsBQqzKtn7WO1JdYfXeeMT37b9Br6ClP7F4gnruv/N4aY6wdkDHWNvzieim1yz98A==";

export const weatherData = atom({ key: "wearherData", default: {} });
export const useWeather = (init) => {
  let search = useLocation().search;
  let searchParams = new URLSearchParams(search);
  const day = init.day || 1;
  const [date, setDate] = useState(getDate());
  const [data, setData] = useRecoilState(weatherData);
  const [wIcon, setWIcon] = useState(Icon.Loading);
  const [wString, setWString] = useState("");
  const [sunrise, setSunrise] = useState(null);
  const [placeNm, setPlaceNm] = useState(
    searchParams.get("location") || "서울특별시"
  );
  const [curSun, setCurSun] = useState(null);
  useEffect(() => {
    const timer = setInterval(() => {
      const curDt = getDate();
      if (
        curDt.BASEDATE !== date.BASEDATE ||
        curDt.BASETIME !== date.BASETIME
      ) {
        setDate(curDt);
      }
      if (sunrise) {
        if (
          Number(curDt.TIME) >= Number(sunrise.item.sunrise) &&
          Number(curDt.TIME) < Number(sunrise.item.sunset) &&
          (!curSun || curSun === null)
        ) {
          setCurSun(true);
        }
        if (
          Number(curDt.TIME) >= Number(sunrise.item.sunset) &&
          (curSun || curSun === null)
        ) {
          setCurSun(false);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [date, curSun, sunrise]);
  useEffect(() => {
    let pos = {};
    if (!Object.keys(Place).includes(placeNm)) {
      pos = Place["서울특별시"];
    } else {
      pos = Place[placeNm];
    }
    axios
      .get(
        "http://apis.data.go.kr/B090041/openapi/service/RiseSetInfoService/getLCRiseSetInfo",
        {
          params: {
            serviceKey: SERVICE_KEY,
            locdate: date.DATE,
            longitude: Math.round(pos.lon * 100),
            latitude: Math.round(pos.lat * 100),
            dnYn: "N",
          },
        }
      )
      .then((r) => setSunrise(r.data.response.body.items));
  }, [date]);
  useEffect(() => {
    let pos = {};
    if (!Object.keys(Place).includes(placeNm)) {
      pos = Place["서울특별시"];
    } else {
      pos = Place[placeNm];
    }
    axios
      .get(
        "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst",
        {
          params: {
            serviceKey: SERVICE_KEY,
            numOfRows: 14 * 24 * day,
            pageNo: 1,
            dataType: "JSON",
            base_date: date.BASEDATE,
            base_time: date.BASETIME,
            nx: pos.nx,
            ny: pos.ny,
          },
        }
      )
      .then((r) => {
        const { item } = r.data.response.body.items;
        setData((p) => {
          const r = {};
          item.map((i) => {
            const { fcstDate, fcstTime, category, fcstValue } = i;
            const k = fcstDate + fcstTime;
            if (!Object.keys(r).includes(k)) {
              r[k] = {};
            }
            r[k][category] = fcstValue;
          });
          return r;
        });
      });
  }, [date, placeNm]);

  useEffect(() => {
    if (
      data[date.DATE + date.CURTIME] !== undefined &&
      sunrise !== null &&
      curSun !== null
    ) {
      let { SKY, TMP, PTY, PCP, SNO } = data[date.DATE + date.CURTIME];
      SNO = parseFloat(SNO);
      PCP = parseFloat(PCP);
      SKY = parseInt(SKY);
      PTY = parseInt(PTY);
      console.log(curSun);
      if (PTY === 0) {
        if (SKY === 1) {
          if (curSun) {
            console.log(SKY, PTY, curSun);
            setWIcon(Icon.Day);
          } else {
            setWIcon(Icon.Night);
          }
        }
        if (SKY === 3) {
          if (curSun) {
            setWIcon(Icon.CloudyDay1);
          } else {
            setWIcon(Icon.CloudyNight1);
          }
        }
        if (SKY === 4) {
          setWIcon(Icon.Cloudy);
        }
      } else if (PTY === 1) {
        if (PCP < 1.0) {
          setWIcon(Icon.Rainy1);
        } else if (PCP >= 1.0 && PCP < 20.0) {
          setWIcon(Icon.Rainy2);
        } else if (PCP >= 20.0 && PCP < 30.0) {
          setWIcon(Icon.Rainy3);
        } else if (PCP >= 30.0 && PCP < 40.0) {
          setWIcon(Icon.Rainy4);
        } else if (PCP >= 40.0 && PCP < 50.0) {
          setWIcon(Icon.Rainy5);
        } else if (PCP >= 50) {
          setWIcon(Icon.Rainy6);
        } else {
          setWIcon(Icon.Rainy1);
        }
      } else if (PTY === 2) {
        setWIcon(Icon.SnowyRainy);
      } else if (PTY === 3) {
        if (SNO < 1.0) {
          setWIcon(Icon.Snowy1);
        } else if (SNO >= 1.0 && SNO < 20.0) {
          setWIcon(Icon.Snowy2);
        } else if (SNO >= 20.0 && SNO < 30.0) {
          setWIcon(Icon.Snowy3);
        } else if (SNO >= 30.0 && SNO < 40.0) {
          setWIcon(Icon.Snowy4);
        } else if (SNO >= 40.0 && SNO < 50.0) {
          setWIcon(Icon.Snowy5);
        } else if (SNO >= 50) {
          setWIcon(Icon.Snowy6);
        } else {
          setWIcon(Icon.Snowy1);
        }
      } else if (PTY === 4) {
        setWIcon(Icon.Rainy6);
      }

      setWString(
        `${String(date.y)}년 ${String(date.m)}월 ${String(date.d)}일 ${TMP}℃`
      );
    }
  }, [date, data, curSun, sunrise]);
  return [date, data, wIcon, wString, placeNm, setPlaceNm];
};

const getDate = () => {
  console.log();
  const date = new Date();
  const y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate(),
    H = date.getHours(),
    M = date.getMinutes(),
    S = date.getSeconds(),
    W = date.getDay(),
    DATE = String(y) + String(m).padStart(2, "0") + String(d).padStart(2, "0"),
    TIME = String(H).padStart(2, "0") + String(M).padStart(2, "0");
  const tH = H - parseInt((H - 2) % 3) - 3;
  const BASE = new Date(String(y), String(m), String(d), String(tH));
  const BASEDATE = BASE.baseDate();
  const BASETIME = BASE.baseTime();
  const CURTIME = String(H).padStart(2, "0") + "00";
  return {
    y: y,
    m: m,
    d: d,
    H: H,
    M: M,
    S: S,
    W: W,
    DATE: DATE,
    TIME: TIME,
    BASEDATE: BASEDATE,
    BASETIME: BASETIME,
    CURTIME: CURTIME,
  };
};

Date.prototype.baseDate = function () {
  var y = this.getFullYear(),
    m = this.getMonth(),
    d = this.getDate();
  return String(y) + String(m).padStart(2, "0") + String(d).padStart(2, "0");
};
Date.prototype.baseTime = function () {
  var H = this.getHours();
  return String(H).padStart(2, "0") + "00";
};
