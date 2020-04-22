import * as React from "react";
import styled from "@emotion/styled";
import BaseLayout from "../components/BaseLayout";
import { Avatar } from "../components/Avatar";
import { SocialLinks } from "../components/SocialLinks";
import { PageRendererProps, graphql } from "gatsby";
import { useLocalJsonForm } from "gatsby-tinacms-json";
import { useLocalRemarkForm } from "gatsby-tinacms-remark";
import {
  SimpleRemarkSection,
  KeplerSimpleRemarkSection,
} from "../components/SimpleRemarkSection";
import {
  FrontmatterDateRange,
  KeplerFrontmatterDateRange,
} from "../components/DateRange";

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

interface ExperienceProps {
  // remarkNode: {
  //   frontmatter: {
  //     position: string;
  //     organization: string;
  //     startDate: string;
  //     startDateISO: string;
  //     endDate?: string;
  //     endDateISO?: string;
  //   };
  //   html: string;
  // };
  remarkNode: object;
}

const Experience = ({
  remarkNode,
}: ExperienceProps): React.ReactElement<ExperienceProps> => {
  const [data] = useLocalRemarkForm(remarkNode);

  return (
    <article>
      {data!.frontmatter.position ? (
        <>
          <h2>{data!.frontmatter.position}</h2>
          <Detail>{data!.frontmatter.title}</Detail>
        </>
      ) : (
        <h2>{data!.frontmatter.title}</h2>
      )}
      <Detail>
        <FrontmatterDateRange frontmatter={data!.frontmatter} />
      </Detail>
      <section
        dangerouslySetInnerHTML={{
          __html: data!.html,
        }}
      />
    </article>
  );
};

interface EducationProps {
  remarkNode: object;
}

const Education = ({
  remarkNode,
}: EducationProps): React.ReactElement<EducationProps> => {
  const [data] = useLocalRemarkForm(remarkNode);

  return (
    <article>
      <h2>{data!.frontmatter.title}</h2>
      {data!.frontmatter.degree && <Detail>{data!.frontmatter.degree}</Detail>}
      <Detail>
        <FrontmatterDateRange frontmatter={data!.frontmatter} />
      </Detail>
      <section
        dangerouslySetInnerHTML={{
          __html: data!.html,
        }}
      />
    </article>
  );
};

interface PageProps extends PageRendererProps {
  data: AboutPageQuery;
}

const AboutPage = (properties: PageProps): React.ReactElement => {
  const [info] = useLocalJsonForm(properties.data.info, {
    label: "Information",
    fields: [
      {
        name: "rawJson.name",
        label: "Name",
        component: "text",
        description: "Name of the person featured on this page.",
      },
      {
        name: "rawJson.location",
        label: "Location",
        component: "text",
        description: "Geographic location of the person featured on this page.",
      },
    ],
  });

  return (
    <BaseLayout location={properties.location}>
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
          <SimpleRemarkSection
            label="Biography"
            remarkNode={properties.data.biography.childMarkdownRemark}
          />
          <div>
            <h1>Experience</h1>
            {properties.data.experience.edges.map(({ node }) => (
              <Experience key={node.id} remarkNode={node.childMarkdownRemark} />
            ))}
          </div>
          <div>
            <h1>Education</h1>
            {properties.data.education.edges.map(({ node }) => (
              <Education key={node.id} remarkNode={node.childMarkdownRemark} />
            ))}
          </div>
          <SimpleRemarkSection
            label="Skills"
            remarkNode={properties.data.skills.childMarkdownRemark}
          />
        </ExperienceContainer>
      </AboutContainer>
    </BaseLayout>
  );
};

export default AboutPage;

interface AboutPageQuery {
  info: {
    name: string;
    location: string;

    // Needed for TinaCMS
    id: string;
    rawJson: string;
    fileRelativePath: string;
  };

  biography: KeplerSimpleRemarkSection;

  experience: {
    edges: {
      node: {
        id: string;
        childMarkdownRemark: {
          html: string;
          frontmatter: {
            title: string;
            position?: string;
          } & KeplerFrontmatterDateRange;
        };
      };
    }[];
  };

  education: {
    edges: {
      node: {
        id: string;
        childMarkdownRemark: {
          html: string;
          frontmatter: {
            title: string;
            degree?: string;
          } & KeplerFrontmatterDateRange;
        };
      };
    }[];
  };

  skills: KeplerSimpleRemarkSection;
}

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
      ...KeplerSimpleRemarkSection
    }

    experience: allFile(
      filter: { sourceInstanceName: { eq: "experience" } }
      sort: { order: DESC, fields: relativePath }
    ) {
      edges {
        node {
          id
          childMarkdownRemark {
            html
            frontmatter {
              title
              position
              ...KeplerFrontmatterDateRange
            }
            ...TinaRemark
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
            html
            frontmatter {
              title
              degree
              ...KeplerFrontmatterDateRange
            }
            ...TinaRemark
          }
        }
      }
    }

    skills: file(
      sourceInstanceName: { eq: "about" }
      relativePath: { eq: "skills.md" }
    ) {
      ...KeplerSimpleRemarkSection
    }
  }
`;
