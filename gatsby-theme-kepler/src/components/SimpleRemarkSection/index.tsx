import * as React from "react";
import { useLocalRemarkForm } from "gatsby-tinacms-remark";
import { graphql } from "gatsby";

interface Props {
  label: string;
  remarkNode: {
    fileRelativePath: string;
    rawFrontmatter: string;
    rawMarkdownBody: string;
    frontmatter?: any;
  };
  headerTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const SimpleRemarkSection: React.FunctionComponent<Props> = (
  properties: Props
): React.ReactElement<Props> => {
  const [data] = useLocalRemarkForm(properties.remarkNode, {
    label: properties.label,
    fields: [
      {
        label: "Title",
        name: "rawFrontmatter.title",
        component: "text",
      },
      {
        label: "Body",
        name: "rawMarkdownBody",
        component: "markdown",
      },
    ],
  });

  const Header = properties.headerTag!;

  return (
    <div>
      <Header>{data!.frontmatter.title}</Header>
      <section
        dangerouslySetInnerHTML={{
          __html: data!.html,
        }}
      />
    </div>
  );
};

SimpleRemarkSection.defaultProps = {
  headerTag: "h1",
};

export const fragment = graphql`
  fragment KeplerSimpleRemarkSection on File {
    childMarkdownRemark {
      html
      frontmatter {
        title
      }
      ...TinaRemark
    }
  }
`;

export interface KeplerSimpleRemarkSection {
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
}
