import React from "react";

import Meta from "@components/meta/Meta";

import { ToggleBtn } from "./components/ToggleBtn";

import { meta } from "@project/b/ButtonCollection/meta";
import { Wrapper, Title, HLine, Section } from "@resources/globalStyle";
const ButtonCollection = () => {
  return (
    <Wrapper>
      <Meta data={meta} />
      <Section>
        <Title>Button Collection</Title>
        <HLine />
        <div style={{ marginTop: "16px" }}>
          <ToggleBtn
            onChange={(e) => {
              console.log(e.target.checked);
            }}
            radius={16}
          ></ToggleBtn>
        </div>
      </Section>
    </Wrapper>
  );
};

export default ButtonCollection;
