//action and action creator.
import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { apiCallError, beginApiCall } from "./apiStatusActions";

export function loadAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHOR_SUCCESS, authors };
}

//creating thunk
export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((authors) => {
        dispatch({ type: types.LOAD_AUTHOR_SUCCESS, authors });
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
