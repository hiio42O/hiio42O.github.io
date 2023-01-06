// src\Redux\TodoList\index.js

const CREATE = "todolist/ADD";
const READ = "todolist/READ";
const UPDATE = "todolist/UPDATE";
const DELETE = "todolist/DELETE";

export const onCreate = (todoItem) => {
  return {
    type: CREATE,
    item: todoItem,
  };
};
export const onRead = () => {
  return {
    type: READ,
  };
};
export const onUpdate = () => {
  return {
    type: UPDATE,
  };
};
export const onDelete = (idx) => {
  return {
    type: DELETE,
    idx: idx,
  };
};

const initialState = [
  {
    id: 1,
    title: "블로그 작성",
    contents: "리액트 블로그 작성하기",
    done: false,
    regDate: new Date(2022, 8, 10, 11, 12, 24),
  },
  {
    id: 2,
    title: "스터디 참가",
    contents: "리액트 스터디 참가",
    done: true,
    regDate: new Date(2022, 8, 10, 11, 13, 24),
  },
  {
    id: 3,
    title: "이메일 보내기",
    contents: "고객사에게 이메일 보내기",
    done: false,
    regDate: new Date(2022, 8, 10, 11, 14, 24),
  },
];

export const TodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE:
      action.item = {
        ...action.item,
        regDate: new Date(),
        id: state.length + 1,
      };
      return [...state, action.item];
    case READ:
      console.log("READ");
      return state;
    case UPDATE:
      console.log("UPDATE");
      return state;
    case DELETE:
      state = state.filter((s, i) => i !== action.idx);
      return state;
    default:
      return state;
  }
};
