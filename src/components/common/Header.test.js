//enzyme mount - Dom is created in memory via jsdom , child component are rendered.
import React from "react";
import Header from "./Header"
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

// we are using memory router because header component expects to be run as a child component of react router and thus receive react router props.

//Note how with shallow render you search for the React component tag.
it("contain 3 navLinks via shallow", () => {
    const numLinks = shallow(<Header />).find("NavLink").length;
    expect(numLinks).toEqual(3);
})

