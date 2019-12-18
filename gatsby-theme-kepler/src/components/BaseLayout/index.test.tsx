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
import { HelmetProvider } from "react-helmet-async";

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
    const context: { helmet?: object } = {};
    const tree = renderer
      .create(
        <HelmetProvider context={context}>
          <Layout location={{ pathname: "/nested/test/" }} title="Test">
            <span>Test</span>
          </Layout>
        </HelmetProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(context.helmet).toMatchSnapshot();
  });
});
