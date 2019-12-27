import { AboutPageQuery } from "../pages/about";

export const KeplerAboutPageQuery: AboutPageQuery = {
  info: {
    name: "Example Name",
    location: "Example Location",
    id: "",
    rawJson: "",
    fileRelativePath: ""
  },
  biography: {
    childMarkdownRemark: {
      frontmatter: {
        title: "Biography"
      },
      html: "<p>This is a test biography</p>"
    }
  },
  experience: {
    edges: [
      {
        node: {
          id: "prior-example-experience-listing",
          childMarkdownRemark: {
            id: "prior-example-experience-listing-mdx",
            html: "<p>This is an example prior experience listing.</p>",
            frontmatter: {
              title: "Test Workplace",
              /* eslint-disable @typescript-eslint/camelcase */
              rawEnd: "2018-12-18",
              end_date: "Dec 2018",
              rawStart: "2017-12-18",
              start_date: "Dec 2017"
              /* eslint-enable @typescript-eslint/camelcase */
            }
          }
        }
      },
      {
        node: {
          id: "current-example-experience-listing",
          childMarkdownRemark: {
            id: "current-example-experience-listing-mdx",
            html: "<p>This is an example current experience listing.</p>",
            frontmatter: {
              title: "Example Workplace",
              position: "Sample Position",
              /* eslint-disable @typescript-eslint/camelcase */
              rawStart: "2018-12-18",
              start_date: "Dec 2018"
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
          childMarkdownRemark: {
            id: "example-education-listing-mdx",
            html:
              "<p>This is an example summary of an education experience</p>",
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
    childMarkdownRemark: {
      frontmatter: {
        title: "Skills"
      },
      html:
        "<p>This is an example summary of someone's professional skills.</p>"
    }
  }
};
