import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./404";
import {
  KeplerBannerBackgroundData,
  KeplerBaseLayoutData
} from "../__mockData__";
import { HelmetProvider } from "react-helmet-async";

// HelmetProvider.canUseDom = false;

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object => ({
    ...KeplerBannerBackgroundData,
    ...KeplerBaseLayoutData
  }));
});

describe("404 Page", (): void => {
  it("renders correctly", (): void => {
    const context: { helmet?: object } = {};
    const tree = renderer
      .create(
        <HelmetProvider context={context}>
          <Page />
        </HelmetProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(context.helmet).toMatchSnapshot();
  });
});
