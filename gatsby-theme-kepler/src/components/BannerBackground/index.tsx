import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import {
  BackgroundImage,
  BackgroundImageObject
} from "gatsby-background-image-lite";

export interface BannerData {
  banner: {
    childImageSharp: {
      sqip: { dataURI: string };
      highQuality: BackgroundImageObject;
      lowQuality: BackgroundImageObject;
    };
  };
  bannerDark: {
    childImageSharp: {
      sqip: { dataURI: string };
      highQuality: BackgroundImageObject;
      lowQuality: BackgroundImageObject;
    };
  };
}

interface Props {
  highQuality?: boolean;
}

export const BannerBackground = (
  properties: React.PropsWithChildren<Props>
): React.ReactElement => {
  const data = useStaticQuery<BannerData>(graphql`
    query KeplerBannerBackgroundData {
      banner: file(
        relativePath: { eq: "banner.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          sqip(numberOfPrimitives: 100, blur: 0) {
            dataURI
          }
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
          sqip(numberOfPrimitives: 100, blur: 0) {
            dataURI
          }
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
      {...properties}
      image={[
        {
          ...(properties.highQuality === true
            ? data.banner.childImageSharp.highQuality
            : data.banner.childImageSharp.lowQuality),
          base64: data.banner.childImageSharp.sqip.dataURI
        },
        {
          ...(properties.highQuality === true
            ? data.bannerDark.childImageSharp.highQuality
            : data.bannerDark.childImageSharp.lowQuality),
          base64: data.bannerDark.childImageSharp.sqip.dataURI,
          media: "screen and (prefers-color-scheme: dark)"
        }
      ]}
    >
      {properties.children}
    </BackgroundImage>
  );
};
