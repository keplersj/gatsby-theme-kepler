import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./index";
import { KeplerAvatarComponentQuery } from "../__mockData__/KeplerAvatarComponentQuery";

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
    ...KeplerAvatarComponentQuery,
    backdrop: {
      childImageSharp: {
        fluid: {
          base64: "",
          aspectRatio: "",
          src: "",
          srcSet: "",
          srcWebp: "",
          srcSetWebp: "",
          sizes: ""
        }
      }
    },
    site: {
      siteMetadata: {
        title: "",
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
        ]
      }
    }
  }));
});

describe("Index Page", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(
        <Page
          location={{ pathname: "" }}
          data={{
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
            },
            biography: {
              childMdx: {
                frontmatter: {
                  title: "Biography"
                },
                body:
                  "I am a computer programmer and college student based out of Salt Lake City, with experience in entrepreneurship, student leadership, and open source software development."
              }
            },
            metadataImage: {
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
            blogPosts: {
              edges: [
                {
                  node: {
                    id: "",
                    title: "",
                    slug: "",
                    date: "",
                    rawDate: "",
                    excerpt: ""
                  }
                }
              ]
            }
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
