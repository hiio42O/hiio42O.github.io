import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Masonry = ({ items = [], options = {}, ...props }) => {
  const GridRef = useRef();

  useEffect(() => {
    GridRef.current.childNodes.forEach((el) => {
      el.style.gridRowEnd = `span ${el.clientHeight - 50}`;
      el.style.padding = "8px";
      el.style.margin = "8px";
    });
    GridRef.current.style.display = "grid";
    GridRef.current.style.gridTemplateColumns = `repeat(auto-fill,320px)`;
    GridRef.current.style.columnGap = `${options.columnGap || "8px"}`;
    GridRef.current.style.gridAutoRow = "1px";
    return () => {
      if (GridRef.current) {
        GridRef.current.removeAttribute("style");
      }
    };
  }, [items]);
  return (
    <MasonryGrid ref={GridRef} columnsWidth={options.columnsWidth || "20%"}>
      {items.map((el) => {
        return <div key={Math.random()}>{el}</div>;
      })}
    </MasonryGrid>
  );
};

const MasonryGrid = styled.div`
  justify-content: center;
`;

export default Masonry;
