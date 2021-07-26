import React from "react";
import { shallow } from "enzyme";
import Counter from "./Counter";

describe("renders counter", () => {
  const wrapper = shallow(<Counter />);
  //make sure we have all the elements
  test("count is not null", () => {
    let countResult = wrapper.find("[data-test='count']");
    expect(countResult.text()).toBe("0");
  });

  test("counterDisplay is not null", () => {
    let countResult = wrapper.find("[data-test='counter']");
    expect(countResult.length).toBe(1);
  });

  test("increment button displays correctly", () => {
    let countResult = wrapper.find("[data-test='increment-button']");
    expect(countResult.length).toBe(1);
  });

  test("decrement button displays correctly", () => {
    let countResult = wrapper.find("[data-test='decrement-button']");
    expect(countResult.length).toBe(1);
  });
});

describe("user actions", () => {
    
  test("increment button", () => {
    const wrapper = shallow(<Counter />);
    let count = wrapper.find("[data-test='count']");
    //find button and click
    let incrementButton = wrapper.find("[data-test='increment-button']");
    expect(count.text()).toContain("0");
    incrementButton.simulate("click");
    
    wrapper.update();
    let count2 = wrapper.find("[data-test='count']");
    expect(count2.text()).toContain("1");
  });

  test("decrement button", () => {
    const wrapper = shallow(<Counter />);
    let count = wrapper.find("[data-test='count']");
    //find button and click
    let decrementButton = wrapper.find("[data-test='decrement-button']");
    expect(count.text()).toContain("0");
    decrementButton.simulate("click");
    
    wrapper.update();
    let count2 = wrapper.find("[data-test='count']");
    expect(count2.text()).toContain("-1");
  });
});
