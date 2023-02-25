import { combineReducers } from "redux";
import courseReducer from "./courseReducer";
import authorReducer from "./authorReducer";
import apiCallStatusreducer from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses: courseReducer,
  authors: authorReducer,
  apiCallsInProgress: apiCallStatusreducer,
});

export default rootReducer;
