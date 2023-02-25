import React, { Component } from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
import * as authorAction from "../../redux/actions/authorAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";
class CoursesPage extends Component {
  /*
  state = {
    course: { title: "" },
    pabin: { name: "" },
  };

  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props);
    // this.props.dispatch(courseAction.createCourse(this.state.course)); // since createcourse will be now received in props as we mentioned it in mapDispatchToprops
    this.props.actions.createCourse(this.state.course);
    // window.alert(this.state.course.title);
  };
  */
  state = {
    redirectToAddCoursePage: false,
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    // load courses data
    if (courses.length === 0) {
      actions
        .loadCourses()
        .catch((error) => alert("loading courses failed." + error));
    }

    //load authors data
    if (authors.length === 0) {
      actions
        .loadAuthors()
        .catch((error) => alert("loading authors failed." + error));
    }
  }

  //handle delete
  handleDeleteCourse = async (course) => {
    toast.success("course deleted");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="./course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: "20px" }}
              className="btn btn-primary add-course"
              onClick={() => {
                this.setState({ redirectToAddCoursePage: true });
              }}
            >
              Add course
            </button>
            <CourseList
              onDeleteClick={this.handleDeleteCourse}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

// adding linting rule for prop type to accept dispatch as function in its props.
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  // dispatch: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  // be specific require only data that your component need.
  // if all store is exposed the omponent will re render if any data in store changes.
  //ownProps - lets access to props that are attatch to this component.
  // the state mention in this params is the state returned from root reducer. so this mapState function can exactily extract specific states from root reducer.
  //NOTE : when the store is updated the mapStoretoprops will be called again since new data will be available there.

  // before setting courses to component props also map the relavalnt courses with its author.
  // state here is the state of redx store.

  // console.log("i am rendering");
  // console.log(state);
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => {
            return {
              ...course,
              authorName: state.authors.find(
                (author) => author.id === course.authorId
              ).name,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

function mapDispatchToProps(dispatch) {
  // this is an optional params lets us decide which action to expose . if omitted our component get mapDispatchToProps injected automatically.
  //this function determines what actions are available on props in our component.
  return {
    actions: {
      loadCourses: bindActionCreators(courseAction.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseAction.deleteCourse, dispatch),
    },
    // can pass singel action or as a whole.
    // createCourse: (course) => dispatch(courseAction.createCourse(course)),
  };
  // NOTE: action creators must be called by dispatch.
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage); //this is like calling conect function first and with return function immideately calling it again with course page parameter.
