import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { Navbar } from ".";
import { KeplerBannerBackgroundData } from "../../__mockData__";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object => ({
    site: {
      siteMetadata: {
        title: "Kepler Sticka-Jones",
        nav: [
          {
            name: "Blog",
            url: "/blog"
          },
          {
            name: "Projects",
            url: "/projects"
          },
          {
            name: "About",
            url: "/about"
          }
        ]
      }
    },
    ...KeplerBannerBackgroundData
  }));
});

describe("Navbar", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
