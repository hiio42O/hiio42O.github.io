import React from "react";
import WeatherDisplay from "@Widget/Weather/WeatherDisplay";
import Place from "./WeatherDisplay/data/place.json";
import { useEffect, useState } from "react";
import Search from "@resources/images/common/search-bar-01-32.png";
import CopyIcon from "@resources/images/common/copyIcon.png";

const Weather = () => {
  const [keys, setKeys] = useState(Object.keys(Place));
  const [placeTree, setPlaceTree] = useState({});
  const [depthA, setDepthA] = useState([]);
  const [depthB, setDepthB] = useState([]);
  const [selected, setSeleted] = useState({ ts: "", ds: "", gs: "" });
  const [placeNm, setPlaceNm] = useState("");
  const [search, setSearch] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const k = keys
      .map((k) => k.split(" "))
      .sort((a, b) => a.length - b.length)
      .map((d) => {
        if (d.length === 1) {
          setPlaceTree((p) => ({ ...p, [d[0]]: {} }));
        }
        if (d.length === 2) {
          setPlaceTree((p) => {
            p[d[0]] = { ...p[d[0]], [d[1]]: {} };
            return p;
          });
        }
        if (d.length === 3) {
          setPlaceTree((p) => {
            p[d[0]][d[1]] = { ...p[d[0]][d[1]], [d[2]]: {} };
            return p;
          });
        }
      });
  }, []);
  useEffect(() => {
    if (selected.ts !== null && selected.ds !== null && selected.gs !== null) {
      setPlaceNm(`${Object.values(selected).join(" ")}`);
    }
  }, [selected]);
  return (
    <div className="widget-item" style={{ minHeight: "100%", height: "100%" }}>
      <div
        id="weather-search"
        style={{ margin: "20px 0", textAlign: "center" }}
      >
        <div>지역 선택</div>
        <div>
          <input
            type="text"
            onKeyUp={(e) => {
              if (e.target.value.replace(/[\s]+/gi, "").length === 0) {
                setSearch([]);
              } else {
                const place = keys.filter((d) => d.includes(e.target.value));
                setSearch(place);
              }
            }}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          ></input>
          <div>
            <img src={Search} />
          </div>
          {search.length == 0 ? null : (
            <div>
              <ul>
                {search.map((s) => {
                  return (
                    <li
                      key={Math.random()}
                      onClick={(e) => {
                        var a = s.split(" ");
                        if (a.length === 1) {
                          setSeleted({ ts: a[0], ds: "", gs: "" });
                        } else if (a.length === 2) {
                          setDepthA(Object.keys(placeTree[a[0]]));
                          setSeleted({ ts: a[0], ds: a[1], gs: "" });
                        } else if (a.length === 3) {
                          setDepthA(Object.keys(placeTree[a[0]]));
                          setDepthB(Object.keys(placeTree[a[0]][a[1]]));
                          setSeleted({ ts: a[0], ds: a[1], gs: a[2] });
                        }
                        setSearchText("");
                        setSearch([]);
                      }}
                    >
                      {s}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
        <div>
          <select
            onChange={(e) => {
              setDepthA((p) =>
                Object.keys(placeTree).includes(e.target.value)
                  ? Object.keys(placeTree[e.target.value])
                  : []
              );
              setSeleted({ ts: e.target.value, ds: "", gs: "" });
            }}
            name="ts"
            value={selected.ts}
          >
            <option value="null">--선택--</option>
            {Object.keys(placeTree).map((p) => {
              return (
                <option value={p} key={Math.random()}>
                  {p}
                </option>
              );
            })}
          </select>
          <select
            onChange={(e) => {
              setDepthB((p) =>
                Object.keys(placeTree[selected.ts]).includes(e.target.value)
                  ? Object.keys(placeTree[selected.ts][e.target.value])
                  : []
              );
              setSeleted((p) => ({ ...p, ds: e.target.value, gs: "" }));
            }}
            name="ds"
            value={selected.ds}
          >
            <option value="null">--선택--</option>
            {depthA.map((p) => {
              return (
                <option value={p} key={Math.random()}>
                  {p}
                </option>
              );
            })}
          </select>
          <select
            name="gs"
            value={selected.gs}
            onChange={(e) => {
              setSeleted((p) => ({ ...p, gs: e.target.value }));
            }}
          >
            <option value="null">--선택--</option>
            {depthB.map((p) => {
              return (
                <option value={p} key={Math.random()}>
                  {p}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div style={{ height: "70%" }}>
        <WeatherDisplay propPlaceNm={placeNm} />
      </div>
      {placeNm.replace(/[\s]+/gi, "").length === 0 ? null : (
        <div id="url-copy">
          <span>URL</span>
          <div>
            <img
              src={CopyIcon}
              onClick={(e) => {
                copyText(
                  `https://hiio420.com/widget/weather/display?location=${placeNm}`
                );
              }}
            />
          </div>
          <p>
            https://hiio420.com/widget/weather/display?location=
            {encodeURIComponent(placeNm)}
          </p>
        </div>
      )}
    </div>
  );
};

function copyText(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.top = 0;
  textarea.style.left = 0;
  textarea.style.position = "fixed";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
  alert("클립보드에 복사되었습니다.");
}
export default Weather;
