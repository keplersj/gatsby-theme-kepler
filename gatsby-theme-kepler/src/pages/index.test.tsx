import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from ".";
import {
  KeplerAvatarComponentQuery,
  KeplerBannerBackgroundData,
  KeplerNavbarData,
  KeplerBaseLayoutData,
  KeplerIndexPageData,
} from "../__mockData__";
import deepMerge from "deepmerge";
import { HelmetProvider } from "react-helmet-async";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object =>
    deepMerge.all([
      KeplerBannerBackgroundData,
      KeplerAvatarComponentQuery,
      KeplerNavbarData,
      KeplerBaseLayoutData,
    ])
  );
});

describe("Index Page", (): void => {
  it("renders correctly", (): void => {
    const context: { helmet?: object } = {};
    const tree = renderer
      .create(
        <HelmetProvider context={context}>
          <Page location={{ pathname: "/" }} data={KeplerIndexPageData} />
        </HelmetProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(context.helmet).toMatchSnapshot();
  });
});
