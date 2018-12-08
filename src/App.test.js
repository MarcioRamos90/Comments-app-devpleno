import React from "react";
import App from "./App";
import { shallow } from "enzyme";
import Comments from "./Components/Comments";
import NewComment from "./Components/newComment";
import { EventEmitter } from "events";

describe("<App />", () => {
  it("renders without crashing", () => {
    const database = {
      ref: jest.fn()
    };
    database.ref.mockReturnValue({
      on: jest.fn()
    });
    const wrapper = shallow(<App database={database} />);

    expect(wrapper.find(Comments).length).toBe(1);
    expect(wrapper.find(NewComment).length).toBe(1);
    expect(wrapper.find("p").length).toBe(1);
  });
  // Other test
  it("adds a new comment", () => {
    const database = {
      ref: jest.fn()
    };
    const child = jest.fn();
    const update = jest.fn();
    database.ref.mockReturnValue({
      on: jest.fn(),
      child,
      update
    });
    const push = jest.fn();
    child.mockReturnValue({
      push
    });
    push.mockReturnValue({
      key: "1"
    });

    const wrapper = shallow(<App database={database} />);
    wrapper.instance().sendComment("new comment");
    expect(child).toBeCalledWith("comments");
    expect(update).toBeCalledWith({
      "comments/1": { comment: "new comment" }
    });
  });
  // Other test
  it("render comments from firebase", () => {
    const database = {
      ref: jest.fn()
    };
    const eventEmitter = new EventEmitter();
    database.ref.mockReturnValue(eventEmitter);

    const wrapper = shallow(<App database={database} />);

    // nao recebeu comments
    expect(wrapper.find(Comments).length).toBe(1);
    expect(wrapper.find(NewComment).length).toBe(1);
    expect(wrapper.find("p").length).toBe(1);
    expect(wrapper.state().isLoading).toBeTruthy();

    // recebendo value
    const comments = {
      a: { comment: "comment one" },
      b: { comment: "comment two" }
    };
    const val = jest.fn();
    val.mockReturnValue(comments);
    eventEmitter.emit("value", {
      val
    });

    // testes novamente
    expect(wrapper.state().isLoading).toBeFalsy();
    expect(wrapper.state().comments).toBe(comments);
    expect(wrapper.find("p").length).toBe(0);
    expect(wrapper.find(Comments).get(0).props.comments).toBe(comments);
    expect(wrapper.find(NewComment).length).toBe(1);
  });
});
