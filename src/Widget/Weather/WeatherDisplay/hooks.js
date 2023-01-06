import { useState, useEffect } from "react";
import axios from "axios";
export const useWeather = (init) => {
    const day = init.day || 1
  const [date, setDate] = useState(getDate());
  const [data, setData] = useState([]);
  useEffect(() => {
    const timer = setInterval(() => {
      const curDt = getDate();
      if (curDt.BASEDATE !== date.BASEDATE || curDt.BASETIME !== date.BASETIME) {
        setDate(curDt);
      }
      // console.log(date.DATE,date.BASETIME,date.W)
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [date]);
  useEffect(() => {
    axios
      .get(
        "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst",
        {
          params: {
            serviceKey:
              "85SVNYrwH8xXJbjJgkYoSQsBQqzKtn7WO1JdYfXeeMT37b9Br6ClP7F4gnruv/N4aY6wdkDHWNvzieim1yz98A==",
            numOfRows: 14 * 24 * day,
            pageNo: 1,
            dataType: "JSON",
            base_date: date.BASEDATE,
            base_time: date.BASETIME,
            nx: "55",
            ny: "127",
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
  }, [date]);
  return [date, data];
};

const getDate = () => {
    console.log()
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
  const BASE = new Date(String(y),String(m),String(d),String(tH))
  const BASEDATE =BASE.baseDate();
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
    BASEDATE:BASEDATE,
    BASETIME: BASETIME,
    CURTIME: CURTIME,
  };
};

Date.prototype.baseDate=function(){
    var y= this.getFullYear(),
    m=this.getMonth(),
    d=this.getDate()
    return String(y) + String(m).padStart(2, "0") + String(d).padStart(2, "0")
}
Date.prototype.baseTime=function(){
    var H = this.getHours();
    return String(H).padStart(2, "0") + "00";
}