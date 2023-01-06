import React from "react";

import { Wrapper, Section, Title, HLine } from "@resources/globalStyle";
import Masonry from "@project/m/Masonry/components/Masonry";
import { useSelector } from "react-redux";
const MasonryPage = () => {
  const dummy = useSelector((state) => state.TodoListReducer).map((el) => {
    return (
      <div>
        <div>{el.id}</div>
        <div>{el.title}</div>
        <div>{el.contents}</div>
      </div>
    );
  });
  return (
    <Wrapper>
      <Section>
        <Title>Masonry</Title>
        <HLine />
        <div style={{ marginTop: "16px" }}>
          <Masonry items={dummy}></Masonry>
        </div>
      </Section>
    </Wrapper>
  );
};

export default MasonryPage;
