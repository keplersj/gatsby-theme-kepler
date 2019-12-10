import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { Navbar } from ".";
import {
  KeplerBannerBackgroundData,
  KeplerNavbarData
} from "../../__mockData__";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object => ({
    ...KeplerNavbarData,
    ...KeplerBannerBackgroundData
  }));
});

describe("Navbar", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
