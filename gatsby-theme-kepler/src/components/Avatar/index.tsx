import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import Image, { FixedObject } from "gatsby-image";
import styled from "@emotion/styled";

const RoundedImage = styled(Image)`
  margin-bottom: 10px;
  border-radius: 140px;
`;

interface AvatarComponentQuery {
  image: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

export const Avatar = (): React.ReactElement => {
  const data = useStaticQuery<AvatarComponentQuery>(graphql`
    query KeplerAvatarComponentQuery {
      image: file(
        relativePath: { eq: "avatar.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 200, height: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  return (
    <div role="img" aria-label="Avatar">
      <RoundedImage alt="Avatar" fixed={data.image.childImageSharp.fixed} />
    </div>
  );
};
