import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./index";
import {
  KeplerAvatarComponentQuery,
  KeplerBannerBackgroundData,
  KeplerNavbarData,
  KeplerBaseLayoutData,
  KeplerIndexPageData
} from "../__mockData__";
import deepMerge from "deepmerge";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object =>
    deepMerge.all([
      KeplerBannerBackgroundData,
      KeplerAvatarComponentQuery,
      KeplerNavbarData,
      KeplerBaseLayoutData
    ])
  );
});

describe("Index Page", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(<Page location={{ pathname: "" }} data={KeplerIndexPageData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
