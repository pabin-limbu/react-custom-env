import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CourseList({ courses, onDeleteClick }) {
  // courses.map((course) => console.log(course));
  return (
    <table className="table">
      <thead>
        <tr>
          <th></th>
          <th>title</th>
          <th>Author</th>
          <th>Category</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => {
          return (
            <tr key={course.id}>
              <td>
                <a href={"https://pluralsight.com/courses/" + course.slug}>
                  watch
                </a>
              </td>
              <td>
                <Link to={"/course/" + course.slug}>{course.title}</Link>
              </td>
              <td>{course.authorName}</td>
              <td>{course.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => {
                    onDeleteClick(course);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
