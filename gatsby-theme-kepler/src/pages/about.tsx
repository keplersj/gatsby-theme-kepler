import * as React from "react";
import styled from "@emotion/styled";
import BaseLayout from "../components/BaseLayout";
import { Avatar } from "../components/Avatar";
import { SocialLinks } from "../components/SocialLinks";
import { PageRendererProps, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

// This is approximately the horizontal pixel measurement where the page begins to feel crampt,
//  and more vainly and subjectively when the hyphen in my last name wraps to a second line :D
const MobileBreakPoint = "839px";

const AboutContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 1em;

  @media (max-width: ${MobileBreakPoint}) {
    flex-direction: column;
  }
`;

const ProfileContainer = styled.header`
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 33vw;

  @media (max-width: ${MobileBreakPoint}) {
    min-width: inherit;
  }
`;

const ExperienceContainer = styled.main`
  margin: 1em;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  font-size: 2em;
`;

const Location = styled.span`
  font-size: 1em;
`;

const Detail = styled.span`
  :not(:last-of-type) {
    ::after {
      content: " · ";
    }
  }
`;

interface Props extends PageRendererProps {
  data: {
    biography: {
      childMdx: {
        body: string;
        frontmatter: {
          title: string;
        };
      };
    };

    experience: {
      edges: {
        node: {
          id: string;
          childMdx: {
            id: string;
            body: string;
            frontmatter: {
              title: string;
              position: string;
              rawEnd?: string;
              end_date?: string;
              rawStart: string;
              start_date: string;
            };
          };
        };
      }[];
    };

    education: {
      edges: {
        node: {
          id: string;
          childMdx: {
            id: string;
            body: string;
            frontmatter: {
              title: string;
              degree?: string;
              rawEnd?: string;
              end_date?: string;
              rawStart: string;
              start_date: string;
            };
          };
        };
      }[];
    };

    skills: {
      childMdx: {
        body: string;
        frontmatter: {
          title: string;
        };
      };
    };
  };
}

const AboutPage = (props: Props): React.ReactElement => (
  <BaseLayout location={props.location}>
    <AboutContainer role="region">
      <ProfileContainer>
        <Avatar />
        <Name role="heading" aria-level={1} title="Name">
          Kepler Sticka-Jones
        </Name>
        <Location role="heading" aria-level={2} title="Location">
          Salt Lake City, UT, USA
        </Location>
        <SocialLinks id="contact" />
      </ProfileContainer>
      <ExperienceContainer>
        <div>
          <h1>{props.data.biography.childMdx.frontmatter.title}</h1>
          <MDXRenderer>{props.data.biography.childMdx.body}</MDXRenderer>
        </div>
        <div>
          <h1>Experience</h1>
          {props.data.experience.edges.map(({ node }) => (
            <article key={node.id}>
              {node.childMdx.frontmatter.position ? (
                <>
                  <h2>{node.childMdx.frontmatter.position}</h2>
                  <Detail>{node.childMdx.frontmatter.title}</Detail>
                </>
              ) : (
                <h2>{node.childMdx.frontmatter.title}</h2>
              )}
              <Detail>
                <time dateTime={node.childMdx.frontmatter.rawStart}>
                  {node.childMdx.frontmatter.start_date}
                </time>
                {" - "}
                {node.childMdx.frontmatter.end_date &&
                node.childMdx.frontmatter.rawEnd ? (
                  <time dateTime={node.childMdx.frontmatter.rawEnd}>
                    {node.childMdx.frontmatter.end_date}
                  </time>
                ) : (
                  // Assume if there is no end date, that we're still there
                  "Present"
                )}
              </Detail>
              <MDXRenderer>{node.childMdx.body}</MDXRenderer>
            </article>
          ))}
        </div>
        <div>
          <h1>Education</h1>
          {props.data.education.edges.map(({ node }) => (
            <article key={node.id}>
              <h2>{node.childMdx.frontmatter.title}</h2>
              {node.childMdx.frontmatter.degree && (
                <Detail>{node.childMdx.frontmatter.degree}</Detail>
              )}
              <Detail>
                <time dateTime={node.childMdx.frontmatter.rawStart}>
                  {node.childMdx.frontmatter.start_date}
                </time>
                {node.childMdx.frontmatter.end_date &&
                  node.childMdx.frontmatter.rawEnd && (
                    <>
                      {" - "}
                      <time dateTime={node.childMdx.frontmatter.rawEnd}>
                        {node.childMdx.frontmatter.end_date}
                      </time>
                    </>
                  )}
              </Detail>
              <MDXRenderer>{node.childMdx.body}</MDXRenderer>
            </article>
          ))}
        </div>
        <div>
          <h1>{props.data.skills.childMdx.frontmatter.title}</h1>
          <MDXRenderer>{props.data.skills.childMdx.body}</MDXRenderer>
        </div>
      </ExperienceContainer>
    </AboutContainer>
  </BaseLayout>
);

export default AboutPage;

export const query = graphql`
  query AboutPageQuery {
    biography: file(
      sourceInstanceName: { eq: "about" }
      relativePath: { eq: "biography.md" }
    ) {
      childMdx {
        body
        frontmatter {
          title
        }
      }
    }

    experience: allFile(
      filter: { sourceInstanceName: { eq: "experience" } }
      sort: { order: DESC, fields: relativePath }
    ) {
      edges {
        node {
          id
          childMdx {
            id
            body
            frontmatter {
              title
              position
              rawEnd: end_date
              end_date(formatString: "MMM YYYY")
              rawStart: start_date
              start_date(formatString: "MMM YYYY")
            }
          }
        }
      }
    }

    education: allFile(
      filter: { sourceInstanceName: { eq: "education" } }
      sort: { order: DESC, fields: relativePath }
    ) {
      edges {
        node {
          id
          childMdx {
            id
            body
            frontmatter {
              title
              degree
              rawEnd: end_date
              end_date(formatString: "MMM YYYY")
              rawStart: start_date
              start_date(formatString: "MMM YYYY")
            }
          }
        }
      }
    }

    skills: file(
      sourceInstanceName: { eq: "about" }
      relativePath: { eq: "skills.md" }
    ) {
      childMdx {
        body
        frontmatter {
          title
        }
      }
    }
  }
`;
