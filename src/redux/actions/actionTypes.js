// ACTION CONSTRAINtS

export const CREATE_COURSE = "CREATE_COURSE";
export const LOAD_COURSES_SUCCESS = "LOAD_COURSES_SUCCESS";
export const LOAD_AUTHOR_SUCCESS = "LOAD_AUTHOR_SUCCESS";
export const CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS";
export const UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS";
export const BEGIN_API_CALL = "BEGIN_API_CALL";
export const API_CALL_ERROR = "API_CALL_ERROR";

/*
By convention, action that ends in _SUCCESS are assumed to have been the result of a completed API call. But since we are doing optimistic delete
we are hiding loading state. so the action name deliberately ommits _SUCCESS suffix. if it had one our apiCallInProgress counter would be decremented
below zero because we are not incrementing the number of apiCallInProgress when the delete request begin.
*/

export const DELETE_COURSE_OPTIMISTIC = "DELETE_COURSE_OPTIMISTIC";

