//enzyme mount - Dom is created in memory via jsdom , child component are rendered.
import React from "react";
import Header from "./Header"
import { mount, shallow } from "enzyme";
import { MemoryRouter } from "react-router-dom";

// we are using memory router because header component expects to be run as a child component of react router and thus receive react router props.

//Note how with shallow render you search for the React component tag.
// with shallow render we can search for the component tag
it("contain 3 navLinks via shallow", () => {
    const numLinks = shallow(<Header />).find("NavLink").length;
    expect(numLinks).toEqual(3);
})

// MOUNT
//with mount we can search for the final rendered html since it generates final dom.
// also we need to pull in react router memoryRouter for testing since the header component  expect react router props passed in.

it("contains 3 anchors tag via mount", () => {
    const numAnchors = mount(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    ).find("a").length;
    // const pabin = mount(
    //     <MemoryRouter>
    //         <Header />
    //     </MemoryRouter>
    // );
    // console.log(pabin.debug())

    expect(numAnchors).toEqual(3);
})