import * as React from "react";
import renderer from "react-test-renderer";
import { useStaticQuery } from "gatsby";
import Page from "./about";
import {
  KeplerAvatarComponentQuery,
  KeplerBannerBackgroundData
} from "../__mockData__";

beforeEach((): void => {
  (useStaticQuery as jest.Mock).mockImplementation((): object => ({
    ...KeplerBannerBackgroundData,
    ...KeplerAvatarComponentQuery,
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
