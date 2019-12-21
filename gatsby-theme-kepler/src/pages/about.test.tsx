import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { useLocalJsonForm } from "gatsby-tinacms-json";
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
import { HelmetProvider } from "react-helmet-async";

jest.mock("gatsby-tinacms-json", () => ({
  useLocalJsonForm: jest.fn()
}));

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

  (useLocalJsonForm as jest.Mock).mockImplementationOnce(() => [
    { name: "Example Name", location: "Example Location" }
  ]);
});

describe("About Page", (): void => {
  it("renders correctly", (): void => {
    const context: { helmet?: object } = {};
    const tree = renderer
      .create(
        <HelmetProvider context={context}>
          <Page
            location={{ pathname: "/about/" }}
            data={KeplerAboutPageQuery}
          />
        </HelmetProvider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(context.helmet).toMatchSnapshot();
  });
});
