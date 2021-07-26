import { shallow } from "enzyme";
import TierlistView from ".";

describe("renders without crashing", () => {
  test("renders component properly", () => {
    let wrapper = shallow(<TierlistView />);
    let tierlistview = wrapper.find("[data-test='tierlistwindow']");
    expect(tierlistview.length).toBe(1);
  });
});
