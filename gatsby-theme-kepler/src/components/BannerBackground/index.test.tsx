import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { KeplerBannerBackgroundData } from "../../__mockData__";
import { BannerBackground } from ".";

beforeEach(() => {
  (useStaticQuery as jest.Mock).mockImplementation(
    () => KeplerBannerBackgroundData
  );
});

describe("BannerBackground Component", () => {
  it("renders as expected", () => {
    const tree = renderer.create(<BannerBackground />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
