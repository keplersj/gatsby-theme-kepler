import { AboutPageQuery } from "../pages/about";

export const KeplerAboutPageQuery: AboutPageQuery = {
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
};
