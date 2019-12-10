import { SocialLinksQuery } from "../components/SocialLinks";

export const KeplerSocialLinksQuery: SocialLinksQuery = {
  site: {
    siteMetadata: {
      social: [
        {
          name: "Email",
          id: "test@example.dev",
          url: "mailto:test@example.dev"
        },
        {
          name: "PGP",
          id: "XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX",
          url: "https://example.dev/pub.asc"
        },
        {
          name: "GitHub",
          id: "test",
          url: "https://github.dev/test"
        },
        {
          name: "Twitter",
          id: "@test",
          url: "https://twitter.dev/test"
        },
        {
          name: "LinkedIn",
          id: "test",
          url: "https://linkedin.dev/in/test"
        },
        {
          name: "Keybase",
          id: "test",
          url: "https://keybase.dev/test"
        },
        {
          name: "Instagram",
          id: "@test",
          url: "https://instagram.dev/test"
        },
        {
          name: "Unknown Platform of the Future",
          id: "test",
          url: "https://🤷🏼‍♂️.dev/test"
        }
      ]
    }
  }
};
