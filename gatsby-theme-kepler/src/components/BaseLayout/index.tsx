import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useStaticQuery, graphql } from "gatsby";
import { SkipNavLink, SkipNavContent } from "@reach/skip-nav";
import { FixedObject } from "gatsby-image";
import "modern-normalize";
import "starstuff-style";
import "@reach/skip-nav/styles.css";
import { Navbar } from "../Navbar";
import "./styles.css";
import { BreadcrumbList, ListItem } from "schema-dts";
import { WindowLocation } from "@reach/router";

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
  props: React.PropsWithChildren<Props>
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
        title={props.title}
        titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        defaultTitle={data.site.siteMetadata.title}
      >
        <html lang="en" />
        <meta
          name="description"
          content={props.description || data.site.siteMetadata.description}
        />
        {/* Assume the page is the canonical page, for now */}
        {props.location && (
          <link
            rel="canonical"
            href={`${data.site.siteMetadata.siteUrl}${props.location.pathname}`}
          />
        )}

        <meta property="og:site_name" content={data.site.siteMetadata.title} />
        <meta
          property="og:title"
          content={props.title || data.site.siteMetadata.title}
        />
        {props.location && (
          <meta
            property="og:url"
            content={`${data.site.siteMetadata.siteUrl}${props.location.pathname}`}
          />
        )}
        <meta
          property="og:description"
          content={props.description || data.site.siteMetadata.description}
        />

        <meta name="twitter:card" content="summary" />
        {twitter && <meta name="twitter:site" content={twitter.id} />}
        {twitter && <meta name="twitter:creator" content={twitter.id} />}

        {props.location && (
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "BreadcrumbList",
              itemListElement: props.location.pathname
                // Remove Trailing Slash
                .substr(0, props.location.pathname.length - 1)
                // Break the path down to its (assumed hiearchy)
                .split("/")
                // Assuming every part of the path is a page, create all of the paths
                .reduce((accumulator, value, currentIndex, array) => {
                  if (accumulator.length === 0) {
                    accumulator.push(["/", data.site.siteMetadata.title]);
                  } else {
                    accumulator.push([
                      `${accumulator[accumulator.length - 1][0]}${value}/`,
                      // If we're on the last crumb in the trail and there is a page title, use it. Otherwise...
                      currentIndex === array.length - 1 && props.title
                        ? props.title
                        : // Take the value we have and capitalize it
                          `${value[0].toUpperCase()}${value.slice(1)}`
                    ]);
                  }
                  return accumulator;
                }, [] as [string, string][])
                // Make the path a schema.org ListItem
                .map(
                  ([part, name], index): ListItem => ({
                    "@type": "ListItem",
                    position: index + 1,
                    item: {
                      "@id": `${data.site.siteMetadata.siteUrl}${part}`,
                      "@type": "WebPage",
                      name
                    }
                  })
                )
            } as BreadcrumbList)}
          </script>
        )}
      </Helmet>

      {!props.hideNavbar && (
        <>
          <SkipNavLink />
          <Navbar />
          <SkipNavContent />
        </>
      )}

      {props.children}
    </>
  );
};

export default BaseLayout;
