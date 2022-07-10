// src/project/e/evChargingStations/components/stationsList.js

// modules

import React from "react";
import styled from "styled-components";
import { apiEvStationStatus } from "@project/k/kakaomap-react/hooks";
const StationsList = ({ stations, onClick }) => {
  return (
    <ListWrapper>
      {stations &&
        stations.length > 0 &&
        stations
          .sort((a, b) => a.d - b.d)
          .map((station) => {
            return (
              <ListItem
                key={Math.random()}
                onClick={(e) => {
                  apiEvStationStatus(station.statId.slice(0, 6)).then(
                    (resp) => {
                      resp = resp.filter((r) => r.statId === station.statId);
                      if (onClick) {
                        onClick(resp);
                      }
                    }
                  );
                }}
              >
                {station.statNm}
              </ListItem>
            );
          })}
    </ListWrapper>
  );
};

export default StationsList;

const ListWrapper = styled.div`
  background-color: white;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 20%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const ListItem = styled.div`
  padding: 8px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  :hover {
    background-color: lightgray;
  }
`;
