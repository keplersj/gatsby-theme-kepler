import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useStaticQuery, graphql } from "gatsby";
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import { FixedObject } from "gatsby-image";
import "modern-normalize";
import "starstuff-style";
import "@reach/skip-nav/styles.css";
import { Navbar } from "../Navbar";
import { BreadcrumbList, ListItem } from "schema-dts";
import { WindowLocation } from "@reach/router";
import { breakdownURIPath } from "uri-path-breakdown";
import { JsonLd } from "react-schemaorg";

interface Props {
  title?: string;
  description?: string;
  hideNavbar?: boolean;
  location?: WindowLocation;
}

export interface BaseLayoutData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      social: {
        name: string;
        id: string;
        url: string;
      }[];
    };
  };
  file: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };
}

const BaseLayout = (
  properties: React.PropsWithChildren<Props>
): React.ReactElement<React.PropsWithChildren<Props>> => {
  const data = useStaticQuery<BaseLayoutData>(graphql`
    query KeplerBaseLayoutData {
      site {
        siteMetadata {
          title
          description
          siteUrl
          social {
            name
            id
            url
          }
        }
      }

      file(
        relativePath: { eq: "avatar.jpg" }
        sourceInstanceName: { eq: "assets" }
      ) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 480, height: 480) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const twitter = data.site.siteMetadata.social.find(
    (social): boolean => social.name === "Twitter"
  );

  return (
    <>
      <Helmet
        title={properties.title}
        titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        defaultTitle={data.site.siteMetadata.title}
      >
        <html lang="en" />
        <meta
          name="description"
          content={properties.description || data.site.siteMetadata.description}
        />
        {/* Assume the page is the canonical page, for now */}
        {properties.location && (
          <link
            rel="canonical"
            href={`${data.site.siteMetadata.siteUrl}${properties.location.pathname}`}
          />
        )}

        <meta property="og:site_name" content={data.site.siteMetadata.title} />
        <meta
          property="og:title"
          content={properties.title || data.site.siteMetadata.title}
        />
        {properties.location && (
          <meta
            property="og:url"
            content={`${data.site.siteMetadata.siteUrl}${properties.location.pathname}`}
          />
        )}
        <meta
          property="og:description"
          content={properties.description || data.site.siteMetadata.description}
        />

        <meta name="twitter:card" content="summary" />
        {twitter && <meta name="twitter:site" content={twitter.id} />}
        {twitter && <meta name="twitter:creator" content={twitter.id} />}
      </Helmet>

      {properties.location && (
        <JsonLd<BreadcrumbList>
          item={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breakdownURIPath(properties.location.pathname).map(
              (segment, index, baseArray): ListItem => {
                const getName = (): string => {
                  if (segment === "/") {
                    return data.site.siteMetadata.title;
                  } else if (
                    index === baseArray.length - 1 &&
                    properties.title
                  ) {
                    return properties.title;
                  }

                  const [splitSegment] = segment
                    .split("/")
                    .filter((value) => value != "")
                    .slice(-1);
                  return `${splitSegment[0].toUpperCase()}${splitSegment.slice(
                    1
                  )}`;
                };

                return {
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@id": `${data.site.siteMetadata.siteUrl}${segment}`,
                    "@type": "WebPage",
                    name: getName(),
                  },
                };
              }
            ),
          }}
        />
      )}

      {!properties.hideNavbar && (
        <>
          <SkipNavLink />
          <Navbar />
          <SkipNavContent />
        </>
      )}

      {properties.children}
    </>
  );
};

export default BaseLayout;
