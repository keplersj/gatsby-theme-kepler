import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./404";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object => ({
    desktop: {
      childImageSharp: {
        fluid: {
          base64: "",
          aspectRatio: 1.333,
          src: "",
          srcSet: "",
          srcWebp: "",
          srcSetWebp: "",
          sizes: ""
        }
      }
    },
    desktopDark: {
      childImageSharp: {
        fluid: {
          base64: "",
          aspectRatio: 1.333,
          src: "",
          srcSet: "",
          srcWebp: "",
          srcSetWebp: "",
          sizes: ""
        }
      }
    },
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
    site: {
      siteMetadata: {
        title: "",
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
        ]
      }
    }
  }));
});

describe("404 Page", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer.create(<Page />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
