import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  BackgroundImage,
  BackgroundImageObject
} from "gatsby-background-image-lite";

export interface BannerData {
  desktop: {
    childImageSharp: {
      fluid: BackgroundImageObject;
    };
  };
  desktopDark: {
    childImageSharp: {
      fluid: BackgroundImageObject;
    };
  };
  backdrop: {
    childImageSharp: {
      fluid: BackgroundImageObject;
    };
  };
  backdropDark: {
    childImageSharp: {
      fluid: BackgroundImageObject;
    };
  };
}

interface Props {
  highQuality?: boolean;
}

export const BannerBackground = (
  props: React.PropsWithChildren<Props>
): React.ReactElement => {
  const data = useStaticQuery<BannerData>(graphql`
    query KeplerBannerBackgroundData {
      desktop: file(
        relativePath: { eq: "banner.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 4608) {
            ...GatsbyBackgroundImageSharpFluid
          }
        }
      }

      desktopDark: file(
        relativePath: { eq: "banner_dark.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 4608) {
            ...GatsbyBackgroundImageSharpFluid
          }
        }
      }

      backdrop: file(
        relativePath: { eq: "banner.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          fluid(quality: 10, maxWidth: 4608) {
            ...GatsbyBackgroundImageSharpFluid
          }
        }
      }

      backdropDark: file(
        relativePath: { eq: "banner_dark.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          fluid(quality: 10, maxWidth: 4608) {
            ...GatsbyBackgroundImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <BackgroundImage
      {...props}
      image={[
        props.highQuality === true
          ? data.desktop.childImageSharp.fluid
          : data.backdrop.childImageSharp.fluid,
        {
          ...(props.highQuality === true
            ? data.desktopDark.childImageSharp.fluid
            : data.backdropDark.childImageSharp.fluid),
          media: "screen and (prefers-color-scheme: dark)"
        }
      ]}
    >
      {props.children}
    </BackgroundImage>
  );
};
