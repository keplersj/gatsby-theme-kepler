import * as React from "react";
import { useLocalRemarkForm, RemarkNode } from "gatsby-tinacms-remark";
import { graphql } from "gatsby";

interface Props {
  label: string;
  remarkNode: {
    fileRelativePath: string;
    rawFrontmatter: string;
    rawMarkdownBody: string;
    frontmatter?: any;
  };
}

export const SimpleRemarkSection = (
  props: Props
): React.ReactElement<Props> => {
  const [data] = useLocalRemarkForm(props.remarkNode, {
    label: props.label,
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
  });

  return (
    <div>
      <h1>{data!.frontmatter.title}</h1>
      <section
        dangerouslySetInnerHTML={{
          __html: data!.html
        }}
      />
    </div>
  );
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
