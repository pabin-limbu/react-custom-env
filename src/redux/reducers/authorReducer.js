import * as types from "../actions/actionTypes";
import initState from "./initialState";

export default function authorReducer(state = initState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHOR_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}
