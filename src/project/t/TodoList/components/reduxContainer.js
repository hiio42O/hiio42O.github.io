import { combineReducers } from "redux";
import { dummy } from "../data";
export const toggle = (idx) => {
  return {
    type: "TOGGLE",
    idx: idx,
  };
};

const initialState = dummy;
export const TodoListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE":
      const prev = initialState[action.idx].done;
      console.log(prev);
      initialState[action.idx].done = !prev;
      return [...initialState];
    default:
      return initialState;
  }
};

const rootReducer = combineReducers({
  TodoListReducer,
});

export default rootReducer;
