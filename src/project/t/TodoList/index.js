// src/project/t/TodoList/index.js

import React, { useCallback, useEffect, useState } from "react";

import Meta from "@components/meta/Meta";

import { meta } from "@project/t/TodoList/meta";
import { dateToString } from "@project/t/TodoList/components/date";

import { Wrapper, Title, HLine, Section } from "@resources/globalStyle";

import { useSelector, useDispatch } from "react-redux";
import { onCreate, onUpdate, onDelete } from "@Redux/TodoList";
import axios from "axios";
const TodoList = ({}) => {
  const TodoListData = useSelector((state) => state.TodoListReducer);
  const [todoItem, setTodoItem] = useState({
    id: "",
    title: "",
    contents: "",
    done: false,
  });
  const dispatch = useDispatch();
  const onItemAdd = useCallback(() => {
    dispatch(onCreate(todoItem));
  }, [dispatch, todoItem]);
  const onItemUpdate = useCallback(() => {
    dispatch(onUpdate());
  }, [dispatch]);
  const onItemDelete = useCallback(
    (idx) => {
      dispatch(onDelete(idx));
    },
    [dispatch]
  );

  return (
    <Wrapper>
      <Meta data={meta} />
      <Section>
        <Title>Todo List For Self</Title>
        <HLine />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            gap: "16px",
            margin: "20px 0 0 0",
          }}
        >
          <div>
            <input
              type="text"
              onChange={(e) =>
                setTodoItem((p) => ({ ...p, title: e.target.value }))
              }
              value={todoItem.title}
            />
            <button onClick={onItemAdd}>등록</button>
          </div>
          {TodoListData.map((d, idx) => {
            return (
              <div key={Math.random()} style={{ display: "flex", gap: "8px" }}>
                <div>{d.id}</div>
                <div>{d.title}</div>
                <div>{d.contents}</div>
                <div>{dateToString(d.regDate)}</div>
                <input type="checkbox" defaultChecked={d.done} />
                <button onClick={onItemUpdate}>수정</button>
                <button
                  onClick={(e) => {
                    onItemDelete(idx);
                  }}
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      </Section>
    </Wrapper>
  );
};

export default TodoList;
