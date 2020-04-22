import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import { SocialLink } from "../SocialLink";

const ProfileLinksContainer = styled.address`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export interface SocialLinksQuery {
  site: {
    siteMetadata: {
      social: {
        name: string;
        id: string;
        url: string;
      }[];
    };
  };
}

export const SocialLinks = (
  properties: React.ComponentProps<"section">
): React.ReactElement => {
  const {
    site: {
      siteMetadata: { social },
    },
  } = useStaticQuery<SocialLinksQuery>(graphql`
    query KeplerSocialLinksQuery {
      site {
        siteMetadata {
          social {
            name
            id
            url
          }
        }
      }
    }
  `);

  return (
    <ProfileLinksContainer role="list" {...properties}>
      {social.map(
        (platform): React.ReactElement => (
          <SocialLink
            role="listitem"
            key={`${platform.name}__${platform.id}__${platform.url}`}
            name={platform.name}
            id={platform.id}
            url={platform.url}
          />
        )
      )}
    </ProfileLinksContainer>
  );
};
