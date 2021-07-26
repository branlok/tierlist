import baseTierlistMaker from "./baseTierlistMaker";

describe("functino outputs correct format", () => {
  test("outputs object", () => {
    expect(typeof baseTierlistMaker()).toBe("object");
  });

  test("outputs with cooresponding names", () => {
      expect(baseTierlistMaker('foo').tierlist.id).toBe('foo')
  })
});

