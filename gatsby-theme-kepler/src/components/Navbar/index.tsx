import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import styled from "@emotion/styled";
import { BannerBackground } from "../BannerBackground";

const Background = styled(BannerBackground)`
  height: 3rem;
  width: 100vw;
  margin-bottom: 1em;
`;

const ContentContainer = styled.div`
  height: 3rem;
  max-width: 100vw;
  display: flex;
  backdrop-filter: blur(5px);
  align-items: center;
  padding-left: 1rem;
  padding-right: 1rem;
  justify-content: space-between;
`;

const LeftContent = styled.div`
  text-align: start;
  max-width: 50%;
`;

const RightContent = styled.div`
  text-align: end;
  max-width: 50%;

  & > :not(:last-child) {
    margin-right: 1em;
  }
`;

const StyledLink = styled(Link)`
  font-weight: 600;
  color: #141414;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    color: white;
  }
`;

interface NavbarData {
  site: {
    siteMetadata: {
      title: string;
      nav: {
        name: string;
        url: string;
      }[];
    };
  };
}

export const Navbar = (): React.ReactElement<{}> => {
  const data = useStaticQuery<NavbarData>(graphql`
    query KeplerNavbarData {
      site {
        siteMetadata {
          title
          nav {
            name
            url
          }
        }
      }
    }
  `);

  return (
    <Background Tag="nav">
      <ContentContainer>
        <LeftContent>
          <StyledLink to="/">{data.site.siteMetadata.title}</StyledLink>
        </LeftContent>
        <RightContent>
          {data.site.siteMetadata.nav.map(
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
