import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Layout from ".";
import {
  KeplerBannerBackgroundData,
  KeplerBaseLayoutData,
  KeplerNavbarData
} from "../../__mockData__";
import deepMerge from "deepmerge";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object =>
    deepMerge.all([
      KeplerBannerBackgroundData,
      KeplerNavbarData,
      KeplerBaseLayoutData
    ])
  );
});

describe("Base Layout", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(
        <Layout>
          <span>Test</span>
        </Layout>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
