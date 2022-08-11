import React from "react";

import Meta from "@components/meta/Meta";

import { ToggleBtn } from "./components/ToggleBtn";

import { Wrapper } from "@resources/globalStyle";
import { meta } from "@project/b/ButtonCollection/meta";

const ButtonCollection = () => {
  return (
    <Wrapper>
      <Meta data={meta} />
      <ToggleBtn
        onChange={(e) => {
          console.log(e.target.checked);
        }}
        radius={16}
      ></ToggleBtn>
    </Wrapper>
  );
};

export default ButtonCollection;
