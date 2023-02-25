import * as types from "../actions/actionTypes";
import initState from "./initialState";

export default function courseReducer(state = initState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS: {
      const newstate = state.map((course) => {
        //sabai course same return garne except update bhako course lai chai action ma ako course map garaune.
        // console.log(course);
        return course.id === action.course.id ? action.course : course;
      });

      console.log(newstate);
      return newstate;
    }

    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter((course) => course.id !== action.course.id);
    default:
      return state;
  }
}
