// src/project/e/evChargingStations/components/stationsList.js

// modules

import React from "react";
import styled from "styled-components";
import { apiEvStationStatus } from "@project/k/kakaomap-react/hooks";
import { Title } from "../../../../resources/globalStyle";
const StationsList = ({ stations, onClick }) => {
  return (
    <>
      {stations && stations.length > 0 && (
        <ListWrapper>
          <Title
            padding={"8px"}
            display={stations && stations.length > 0 ? "block" : "none"}
          >
            충전소 리스트
          </Title>
          <List>
            {stations.map((station) => {
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
                  <span>{station.statNm}</span>
                  <span className="station_addr">{station.d.toFixed(3)}km</span>
                </ListItem>
              );
            })}
          </List>
        </ListWrapper>
      )}
    </>
  );
};

export default StationsList;

export const ListWrapper = styled.div`
  background-color: white;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%);
  height: 40%;
  width: calc(100% - 16px);
  z-index: 100;
  display: flex;
  flex-direction: column;
  border-radius: 16px 16px 0 0;
  padding: 16px 8px 0 8px;
  border-top: 1px solid lightgray;
  max-width: 400px;
`;
const List = styled.div`
  overflow: scroll;
  font-size: 1.6rem;
`;

const ListItem = styled.div`
  padding: 8px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;
  display: flex;
  gap: 16px;
  :hover {
    background-color: lightgray;
  }

  .station_addr {
    margin-left: auto;
    margin-right: 16px;
  }
`;
