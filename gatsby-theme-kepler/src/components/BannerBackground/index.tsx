import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  BackgroundImage,
  BackgroundImageObject
} from "gatsby-background-image-lite";

export interface BannerData {
  banner: {
    childImageSharp: {
      highQuality: BackgroundImageObject;
      lowQuality: BackgroundImageObject;
    };
  };
  bannerDark: {
    childImageSharp: {
      highQuality: BackgroundImageObject;
      lowQuality: BackgroundImageObject;
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
      banner: file(
        relativePath: { eq: "banner.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          highQuality: fluid(quality: 90, maxWidth: 4608) {
            ...GatsbyBackgroundImageSharpFluid
          }

          lowQuality: fluid(quality: 10, maxWidth: 4608) {
            ...GatsbyBackgroundImageSharpFluid
          }
        }
      }

      bannerDark: file(
        relativePath: { eq: "banner_dark.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          highQuality: fluid(quality: 90, maxWidth: 4608) {
            ...GatsbyBackgroundImageSharpFluid
          }

          lowQuality: fluid(quality: 10, maxWidth: 4608) {
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
          ? data.banner.childImageSharp.highQuality
          : data.banner.childImageSharp.lowQuality,
        {
          ...(props.highQuality === true
            ? data.bannerDark.childImageSharp.highQuality
            : data.bannerDark.childImageSharp.lowQuality),
          media: "screen and (prefers-color-scheme: dark)"
        }
      ]}
    >
      {props.children}
    </BackgroundImage>
  );
};
