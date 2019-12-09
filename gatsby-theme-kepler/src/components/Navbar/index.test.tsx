import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import { Navbar } from ".";

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
    backdrop: {
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
    backdropDark: {
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
    }
  }));
});

describe("Navbar", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer.create(<Navbar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
