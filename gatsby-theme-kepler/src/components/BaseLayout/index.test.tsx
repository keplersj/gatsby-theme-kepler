import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Layout from ".";
import { KeplerBannerBackgroundData } from "../../__mockData__";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object => ({
    file: {
      childImageSharp: {
        fixed: {
          base64: "",
          width: 100,
          height: 100,
          src: "",
          srcSet: ""
        }
      }
    },
    ...KeplerBannerBackgroundData,
    site: {
      siteMetadata: {
        title: "Kepler Sticka-Jones",
        description: "",
        siteUrl: "",
        social: [
          {
            name: "Twitter",
            id: "@test",
            url: "https://twitter.com/test",
            isProfile: true
          },
          {
            name: "GitHub",
            id: "test",
            url: "https://github.com/test",
            isProfile: true
          }
        ],
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
    }
  }));
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
