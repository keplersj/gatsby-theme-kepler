import { SocialLinksQuery } from "../components/SocialLinks";

export const KeplerSocialLinksQuery: SocialLinksQuery = {
  site: {
    siteMetadata: {
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
