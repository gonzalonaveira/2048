import { combineReducers } from "redux";
import gameReducer from "./gameSlice";

export default combineReducers({
  game: gameReducer,
});
