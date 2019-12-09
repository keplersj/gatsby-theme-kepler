import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./about";

jest.mock("gatsby-plugin-mdx", () => {
  const MDXRenderer = ({ children }: any) => <p>{children}</p>;

  return {
    MDXRenderer
  };
});

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object => ({
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
    },
    image: {
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
            name: "Portfolio",
            url: "/portfolio"
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

describe("About Page", (): void => {
  it("renders correctly", (): void => {
    const tree = renderer
      .create(
        <Page
          location={{ pathname: "/about/" }}
          data={{
            biography: {
              childMdx: {
                frontmatter: {
                  title: "Biography"
                },
                body: ""
              }
            },
            experience: {
              edges: [
                {
                  node: {
                    id: "example-experience-listing",
                    childMdx: {
                      id: "example-experience-listing-mdx",
                      body: "",
                      frontmatter: {
                        title: "Example Workplace",
                        position: "Sample Position",
                        /* eslint-disable @typescript-eslint/camelcase */
                        rawEnd: "2018-12-18",
                        end_date: "Dec 2018",
                        rawStart: "2017-12-18",
                        start_date: "Dec 2017"
                        /* eslint-enable @typescript-eslint/camelcase */
                      }
                    }
                  }
                }
              ]
            },
            education: {
              edges: [
                {
                  node: {
                    id: "example-education-listing",
                    childMdx: {
                      id: "example-education-listing-mdx",
                      body: "",
                      frontmatter: {
                        title: "Example Institution",
                        degree: "Sample Degree",
                        /* eslint-disable @typescript-eslint/camelcase */
                        rawEnd: "2018-12-18",
                        end_date: "Dec 2018",
                        rawStart: "2017-12-18",
                        start_date: "Dec 2017"
                        /* eslint-enable @typescript-eslint/camelcase */
                      }
                    }
                  }
                }
              ]
            },
            skills: {
              childMdx: {
                frontmatter: {
                  title: "Skills"
                },
                body: ""
              }
            }
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
