import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./404";
import {
  KeplerBannerBackgroundData,
  KeplerBaseLayoutData
} from "../__mockData__";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object => ({
    ...KeplerBannerBackgroundData,
    ...KeplerBaseLayoutData
  }));
});

describe("404 Page", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer.create(<Page />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
