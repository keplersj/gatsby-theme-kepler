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
  plugins: ["gatsby-theme-kepler"]
};
