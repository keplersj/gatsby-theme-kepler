import * as React from "react";
import { default as Image, FluidObject } from "gatsby-image";
import { JsonLd } from "react-schemaorg";
import { ImageObject } from "schema-dts";
import { useStaticQuery, graphql } from "gatsby";

interface KeplerImageLD {
  site: {
    siteMetadata: {
      siteUrl: string;
    };
  };
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  fluid: FluidObject;
}

export const ImageLD = ({
  fluid,
  ...props
}: Props): React.ReactElement<Props> => {
  const data = useStaticQuery<KeplerImageLD>(graphql`
    query KeplerImageLD {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  return (
    <figure {...props}>
      <JsonLd<ImageObject>
        item={{
          "@context": "https://schema.org",
          "@type": "ImageObject",
          "@id": `${data.site.siteMetadata.siteUrl}${fluid.src}`,
          representativeOfPage: false,
          contentUrl: fluid.src,
          url: fluid.src
        }}
      />
      <Image fluid={fluid} />
    </figure>
  );
};
