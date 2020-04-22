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
        isProfile: true,
      },
    ],
  },
  plugins: [
    {
      resolve: "gatsby-plugin-tinacms",
      options: {
        plugins: [
          {
            resolve: "gatsby-tinacms-git",
            options: {
              sidebar: {
                hidden: process.env.NODE_ENV === "production",
                position: "displace",
              },
              pathToRepo: REPO_ABSOLUTE_PATH,
              pathToContent: "example",
            },
          },
        ],
      },
    },
    "gatsby-theme-kepler",
  ],
};
