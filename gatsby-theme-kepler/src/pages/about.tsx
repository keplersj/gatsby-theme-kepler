import * as React from "react";
import styled from "@emotion/styled";
import BaseLayout from "../components/BaseLayout";
import { Avatar } from "../components/Avatar";
import { SocialLinks } from "../components/SocialLinks";
import { PageRendererProps, graphql } from "gatsby";
import { useLocalJsonForm } from "gatsby-tinacms-json";
import { useLocalRemarkForm } from "gatsby-tinacms-remark";

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

export interface AboutPageQuery {
  info: {
    name: string;
    location: string;

    // Needed for TinaCMS
    id: string;
    rawJson: string;
    fileRelativePath: string;
  };

  biography: {
    childMarkdownRemark: {
      html: string;
      frontmatter: {
        title: string;
      };
      // Needed for TinaCMS
      id: string;
      fileRelativePath: string;
      rawFrontmatter: string;
      rawMarkdownBody: string;
    };
  };

  experience: {
    edges: {
      node: {
        id: string;
        childMarkdownRemark: {
          id: string;
          html: string;
          frontmatter: {
            title: string;
            position?: string;
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
        childMarkdownRemark: {
          id: string;
          html: string;
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
    childMarkdownRemark: {
      html: string;
      frontmatter: {
        title: string;
      };
    };
  };
}

interface Props extends PageRendererProps {
  data: AboutPageQuery;
}

const AboutPage = (props: Props): React.ReactElement => {
  const [info] = useLocalJsonForm(props.data.info, {
    label: "Information",
    fields: [
      {
        name: "rawJson.name",
        label: "Name",
        component: "text",
        description: "Name of the person featured on this page."
      },
      {
        name: "rawJson.location",
        label: "Location",
        component: "text",
        description: "Geographic location of the person featured on this page."
      }
    ]
  });
  const [biography] = useLocalRemarkForm(
    props.data.biography.childMarkdownRemark,
    {
      label: "Biography",
      fields: [
        {
          label: "Title",
          name: "rawFrontmatter.title",
          component: "text"
        },
        {
          label: "Body",
          name: "rawMarkdownBody",
          component: "markdown"
        }
      ]
    }
  );

  return (
    <BaseLayout location={props.location}>
      <AboutContainer role="region">
        <ProfileContainer>
          <Avatar />
          <Name role="heading" aria-level={1} title="Name">
            {info?.name}
          </Name>
          <Location role="heading" aria-level={2} title="Location">
            {info?.location}
          </Location>
          <SocialLinks id="contact" />
        </ProfileContainer>
        <ExperienceContainer>
          <div>
            <h1>{biography!.frontmatter.title}</h1>
            <section
              dangerouslySetInnerHTML={{
                __html: biography!.html
              }}
            />
          </div>
          <div>
            <h1>Experience</h1>
            {props.data.experience.edges.map(({ node }) => (
              <article key={node.id}>
                {node.childMarkdownRemark.frontmatter.position ? (
                  <>
                    <h2>{node.childMarkdownRemark.frontmatter.position}</h2>
                    <Detail>
                      {node.childMarkdownRemark.frontmatter.title}
                    </Detail>
                  </>
                ) : (
                  <h2>{node.childMarkdownRemark.frontmatter.title}</h2>
                )}
                <Detail>
                  <time
                    dateTime={node.childMarkdownRemark.frontmatter.rawStart}
                  >
                    {node.childMarkdownRemark.frontmatter.start_date}
                  </time>
                  {" - "}
                  {node.childMarkdownRemark.frontmatter.end_date &&
                  node.childMarkdownRemark.frontmatter.rawEnd ? (
                    <time
                      dateTime={node.childMarkdownRemark.frontmatter.rawEnd}
                    >
                      {node.childMarkdownRemark.frontmatter.end_date}
                    </time>
                  ) : (
                    // Assume if there is no end date, that we're still there
                    "Present"
                  )}
                </Detail>
                <section
                  dangerouslySetInnerHTML={{
                    __html: node.childMarkdownRemark.html
                  }}
                />
              </article>
            ))}
          </div>
          <div>
            <h1>Education</h1>
            {props.data.education.edges.map(({ node }) => (
              <article key={node.id}>
                <h2>{node.childMarkdownRemark.frontmatter.title}</h2>
                {node.childMarkdownRemark.frontmatter.degree && (
                  <Detail>{node.childMarkdownRemark.frontmatter.degree}</Detail>
                )}
                <Detail>
                  <time
                    dateTime={node.childMarkdownRemark.frontmatter.rawStart}
                  >
                    {node.childMarkdownRemark.frontmatter.start_date}
                  </time>
                  {node.childMarkdownRemark.frontmatter.end_date &&
                    node.childMarkdownRemark.frontmatter.rawEnd && (
                      <>
                        {" - "}
                        <time
                          dateTime={node.childMarkdownRemark.frontmatter.rawEnd}
                        >
                          {node.childMarkdownRemark.frontmatter.end_date}
                        </time>
                      </>
                    )}
                </Detail>
                <section
                  dangerouslySetInnerHTML={{
                    __html: node.childMarkdownRemark.html
                  }}
                />
              </article>
            ))}
          </div>
          <div>
            <h1>{props.data.skills.childMarkdownRemark.frontmatter.title}</h1>
            <section
              dangerouslySetInnerHTML={{
                __html: props.data.skills.childMarkdownRemark.html
              }}
            />
          </div>
        </ExperienceContainer>
      </AboutContainer>
    </BaseLayout>
  );
};

export default AboutPage;

export const query = graphql`
  query KeplerAboutPageQuery {
    info: aboutJson {
      name
      location

      # Needed for TinaCMS
      id
      rawJson
      fileRelativePath
    }

    biography: file(
      sourceInstanceName: { eq: "about" }
      relativePath: { eq: "biography.md" }
    ) {
      childMarkdownRemark {
        html
        frontmatter {
          title
        }
        ...TinaRemark
      }
    }

    experience: allFile(
      filter: { sourceInstanceName: { eq: "experience" } }
      sort: { order: DESC, fields: relativePath }
    ) {
      edges {
        node {
          id
          childMarkdownRemark {
            id
            html
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
          childMarkdownRemark {
            id
            html
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
      childMarkdownRemark {
        html
        frontmatter {
          title
        }
      }
    }
  }
`;
