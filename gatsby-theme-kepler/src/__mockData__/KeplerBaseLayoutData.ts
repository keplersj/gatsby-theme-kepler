import { BaseLayoutData } from "../components/BaseLayout";

export const KeplerBaseLayoutData: BaseLayoutData = {
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
      title: "Kepler Sticka-Jones",
      description: "",
      siteUrl: "https://site.dev",
      social: [
        {
          name: "Twitter",
          id: "@test",
          url: "https://twitter.com/test"
        },
        {
          name: "GitHub",
          id: "test",
          url: "https://github.com/test"
        }
      ]
    }
  }
};
