import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { BackgroundImage } from "../GatsbyBackgroundImageLite";
import { FluidObject } from "gatsby-image";

export interface BannerData {
  desktop: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  desktopDark: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  backdrop: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  backdropDark: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
}

export const BannerBackground = (
  props: React.PropsWithChildren<any>
): React.ReactElement => {
  const data = useStaticQuery<BannerData>(graphql`
    query KeplerBannerBackgroundData {
      desktop: file(
        relativePath: { eq: "banner.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 4608) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }

      desktopDark: file(
        relativePath: { eq: "banner_dark.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          fluid(quality: 90, maxWidth: 4608) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }

      backdrop: file(
        relativePath: { eq: "banner.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          fluid(quality: 10, maxWidth: 4608) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }

      backdropDark: file(
        relativePath: { eq: "banner_dark.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          fluid(quality: 10, maxWidth: 4608) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `);

  return (
    <BackgroundImage
      {...props}
      fluid={[
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
