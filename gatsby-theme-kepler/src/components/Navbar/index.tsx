import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { BannerBackground } from "../BannerBackground";
import { useGlobalJsonForm } from "gatsby-tinacms-json";
import { NavigationLinksForm } from "../../lib/NavigationLinksForm";

const Background = styled(BannerBackground)`
  width: 100vw;
  height: 3rem;
  margin-bottom: 1em;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100vw;
  height: 3rem;
  padding-right: 1rem;
  padding-left: 1rem;

  backdrop-filter: blur(5px);
`;

const LeftContent = styled.div`
  max-width: 50%;

  text-align: start;
`;

const RightContent = styled.div`
  max-width: 50%;

  text-align: end;

  & > :not(:last-child) {
    margin-right: 1em;
  }
`;

const StyledLink = styled(Link)`
  color: #141414;
  font-weight: 600;
  text-decoration: none;

  :hover,
  :focus {
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

export interface NavbarData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  settingsJson: {
    navLinks: {
      name: string;
      url: string;
    }[];
    id: string;
    rawJson: string;
    fileRelativePath: string;
  };
}

export const Navbar = (): React.ReactElement<{}> => {
  const data = useStaticQuery<NavbarData>(graphql`
    query KeplerNavbarData {
      site {
        siteMetadata {
          title
        }
      }
      settingsJson {
        navLinks {
          url
          name
        }
        id
        rawJson
        fileRelativePath
      }
    }
  `);
  const [nav] = useGlobalJsonForm(
    data.settingsJson as any,
    NavigationLinksForm
  );

  return (
    <Background Tag="nav">
      <ContentContainer>
        <LeftContent>
          <StyledLink to="/">{data.site.siteMetadata.title}</StyledLink>
        </LeftContent>
        <RightContent>
          {nav.navLinks.map(
            (link): React.ReactElement => (
              <StyledLink to={link.url} key={link.name}>
                {link.name}
              </StyledLink>
            )
          )}
        </RightContent>
      </ContentContainer>
    </Background>
  );
};
