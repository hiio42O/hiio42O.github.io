// src/project/t/TodoList/index.js

import React, { useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";

import Meta from "@components/meta/Meta";

import { meta } from "@project/t/TodoList/meta";
import { Section, TodoItem, TodoWrapper } from "@project/t/TodoList/style";
// import { dummy } from "@project/t/TodoList/data";
import { dateToString } from "@project/t/TodoList/components/date";
import { toggle } from "@project/t/TodoList/components/reduxContainer";
import { Wrapper, Title, HLine } from "@resources/globalStyle";

const TodoList = ({}) => {
  const dummy = useSelector((state) => state.TodoListReducer);
  const dispatch = useDispatch();
  const onToggle = useCallback(
    (idx) => {
      dispatch(toggle(idx));
    },
    [dispatch]
  );
  return (
    <Wrapper>
      <Meta data={meta} />
      <Section>
        <Title>Todo List For Self</Title>
        <HLine />
        <TodoWrapper>
          {dummy.map((d, i) => {
            return (
              <TodoItem key={Math.random()}>
                <div>{d.id}</div>
                <div>{d.title}</div>
                <div>{d.contents}</div>
                <div>{dateToString(d.regDate)}</div>
                <input
                  type="checkbox"
                  defaultChecked={d.done}
                  onChange={(e) => {
                    onToggle(i);
                  }}
                />
              </TodoItem>
            );
          })}
        </TodoWrapper>
      </Section>
    </Wrapper>
  );
};

export default TodoList;
