import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorAction";
import PropTypes from "prop-types";
import courseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // load courses data
    if (courses.length === 0) {
      loadCourses().catch((error) => alert("loading courses failed." + error));
    } else {
      setCourse({ ...props.course });
    }

    //load authors data
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("loading authors failed." + error));
    }
  }, [props.course]);

  //function
  function handleChange(event) {
    const { name, value } = event.target; // this destructuring avoid being garbage collected so that it is available within the nested setCourse callback.
    // this is required because the synthatic event is no longer defined in the async function.

    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  //client side validation.
  function formIsValid() {
    const { title, authorId, category } = course;
    const error = {};

    if (!title) error.title = "title is required";
    if (!authorId) error.author = "Author is required";
    if (!category) error.category = "Category is required";

    setErrors(error);

    //form is valid if error object has no properties.

    return Object.keys(error).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();

    if (!formIsValid()) return;

    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug || null);
}

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug; // slug is in the second params in react route that we defined.
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
}

const mapDispatchToProps = {
  // using object form to map dispatch to props.
  loadCourses,
  loadAuthors,
  saveCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
