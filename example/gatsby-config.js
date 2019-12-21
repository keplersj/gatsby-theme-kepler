const path = require("path");
const REPO_ABSOLUTE_PATH = path.join(process.cwd(), "..");

module.exports = {
  siteMetadata: {
    title: "Example Site",
    siteUrl: "https://example.dev",
    description: "This is an example site built with gatsby-theme-kepler",
    social: [
      {
        id: "@test",
        name: "Twitter",
        url: "https://twitter.dev/test",
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
  },
  plugins: [
    {
      resolve: "gatsby-plugin-tinacms",
      options: {
        plugins: [
          {
            resolve: "gatsby-tinacms-git",
            options: {
              pathToRepo: REPO_ABSOLUTE_PATH,
              pathToContent: "example"
            }
          }
        ]
      }
    },
    "gatsby-theme-kepler"
  ]
};
