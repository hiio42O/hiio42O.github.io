import { combineReducers } from "redux";
import { TodoListReducer } from "@Redux/TodoList";

const rootReducer = combineReducers({
  TodoListReducer,
});

export default rootReducer;
