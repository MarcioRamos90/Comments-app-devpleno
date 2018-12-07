import React from "react";
import { shallow } from "enzyme";
import NewComment from "./newComment";

describe("<NewComment />", () => {
  it("shold handle changes in textarea", () => {
    const wrapper = shallow(<NewComment />);
    const event = {
      target: { value: "test" }
    };
    wrapper.find("textarea").simulate("change", event);
    expect(wrapper.state().newComment).toBe("test");
  });
  it("shol(d call sendComment on button click", () => {
    const sendComment = jest.fn();
    const wrapper = shallow(<NewComment sendComment={sendComment} />);
    const event = {
      target: { value: "new value" }
    };
    wrapper.find("textarea").simulate("change", event);
    wrapper.find("button").simulate("click");
    expect(sendComment).toBeCalledWith("new value");

    expect(wrapper.state().newComment).toBe("");
  });
});
