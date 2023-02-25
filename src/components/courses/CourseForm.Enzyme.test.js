//Enzyme test.
import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

// helper function that takes args as props and has default props, when component get its
//actal props as args it blend ars and default props and pass it down to component.
function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it("render form and header", () => {
  const wrapper = renderCourseForm();
  //   expect(wrapper.find("form").length.toBe(1));
  //   expect(wrapper.find("h2").text().toEqual("Add Course"));
  expect(wrapper.find("form").length).toBe(1);
});
