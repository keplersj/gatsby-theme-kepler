import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./about";
import {
  KeplerAvatarComponentQuery,
  KeplerBannerBackgroundData,
  KeplerNavbarData,
  KeplerBaseLayoutData,
  KeplerSocialLinksQuery,
  KeplerAboutPageQuery
} from "../__mockData__";
import deepMerge from "deepmerge";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object =>
    deepMerge.all([
      KeplerBannerBackgroundData,
      KeplerAvatarComponentQuery,
      KeplerNavbarData,
      KeplerBaseLayoutData,
      KeplerSocialLinksQuery
    ])
  );
});

describe("About Page", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(
        <Page location={{ pathname: "/about/" }} data={KeplerAboutPageQuery} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
