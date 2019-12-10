import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { KeplerAvatarComponentQuery } from "../../__mockData__/KeplerAvatarComponentQuery";
import { Avatar } from ".";

beforeEach(() => {
  (useStaticQuery as jest.Mock).mockImplementation(
    (): object => KeplerAvatarComponentQuery
  );
});

describe("Avatar Component", () => {
  it("renders as expected", () => {
    const tree = renderer.create(<Avatar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
