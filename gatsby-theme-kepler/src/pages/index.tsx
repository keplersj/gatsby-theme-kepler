import * as React from "react";
import { graphql, Link, PageRendererProps } from "gatsby";
import { FixedObject, FluidObject } from "gatsby-image";
import styled from "@emotion/styled";
import { Hyperbutton, Card } from "starstuff-components";
import { WebSite, BlogPosting, Blog } from "schema-dts";
import { JsonLd } from "react-schemaorg";
import { usePlugin } from "tinacms";
import { useLocalJsonForm } from "gatsby-tinacms-json";
import { CreatePostPlugin } from "gatsby-theme-early-bird/src/lib/tinacms-creator-plugin";
import BaseLayout from "../components/BaseLayout";
import { Avatar } from "../components/Avatar";
import { BannerBackground } from "../components/BannerBackground";
import {
  SimpleRemarkSection,
  KeplerSimpleRemarkSection
} from "../components/SimpleRemarkSection";
import { NavigationLinksForm } from "../lib/NavigationLinksForm";
import { ImageLD } from "../components/GatsbyImageWithLD";

const HeroBackground = styled(BannerBackground)`
  min-height: 66vh;
`;

const Hero = styled.section`
  min-height: 66vh;
  backdrop-filter: blur(20px);
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Centered = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.125;
  margin-bottom: 1.5rem;
`;

const Container = styled.div`
  text-align: center !important;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0 auto;
  position: relative;
  width: auto;

  @media screen and (min-width: 1024px) {
    max-width: 960px;
  }

  @media screen and (min-width: 1216px) {
    max-width: 1152px;
  }
`;

const HeroBody = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  padding: 3rem 1.5rem;
  color: #fff;
`;

const Columns = styled.div`
  align-items: center;
  margin-left: -0.75rem;
  margin-right: -0.75rem;
  margin-top: -0.75rem;

  :last-child {
    margin-bottom: -0.75rem;
  }
`;

const CenteredColumn = styled(Centered)`
  display: block;
  padding: 0.75rem;
  flex: none;
  width: 66.6666%;
`;

const FeaturedContentContainer = styled.section`
  padding: 1em;

  @media screen and (min-width: 512px) {
    padding: 1em 2.5em;
  }

  @media screen and (min-width: 1024px) {
    padding: 1em 5em;
  }
`;

const ContentCarousel = styled.div`
  display: flex;
  overflow: scroll;
`;

const Featured = styled(Card)`
  min-width: 20em;
  max-width: 25vw;
`;

const FeaturedImage = styled(ImageLD)`
  .gatsby-image-wrapper {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
`;

const FeaturedContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
`;

const FlexReadMoreLink = styled(Link)`
  align-self: flex-end;
`;

const LocalButton = Hyperbutton.withComponent(Link);

const StyledLocalButton = styled(LocalButton)`
  color: #fff;
`;

export interface IndexPageData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      siteUrl: string;
      social: {
        name: string;
        id: string;
        url: string;
        isProfile?: boolean;
      }[];
    };
  };

  settingsJson: {
    navLinks: {
      name: string;
      url: string;
    }[];
    id: string;
    rawJson: string;
    fileRelativePath: string;
  };

  biography: KeplerSimpleRemarkSection;

  metadataImage: {
    childImageSharp: {
      fixed: FixedObject;
    };
  };

  blogPosts: {
    edges: {
      node: {
        id: string;
        title: string;
        slug: string;
        date: string;
        rawDate: string;
        excerpt: string;
        featuredImage?: {
          childImageSharp: {
            sqip: { dataURI: string };
            fluid: FluidObject;
          };
        };
      };
    }[];
  };
}

interface Props extends PageRendererProps {
  data: IndexPageData;
}

const IndexPage = ({ data, location }: Props): React.ReactElement<Props> => {
  const [nav] = useLocalJsonForm(data.settingsJson as any, NavigationLinksForm);
  usePlugin(CreatePostPlugin);

  const email = data.site.siteMetadata.social.find(
    (social): boolean => social.name === "Email"
  );

  return (
    <BaseLayout hideNavbar location={location}>
      <JsonLd<WebSite>
        item={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: data.site.siteMetadata.title,
          description: data.site.siteMetadata.description,
          url: data.site.siteMetadata.siteUrl,
          about: {
            "@type": "Person",
            name: data.site.siteMetadata.title,
            description: data.site.siteMetadata.description,
            url: data.site.siteMetadata.siteUrl,
            email: email?.id,
            sameAs: data.site.siteMetadata.social
              .filter((platform): boolean => platform.isProfile === true)
              .map((platform): string => platform.url),
            image: data.metadataImage.childImageSharp.fixed.src
          }
        }}
      />

      <HeroBackground highQuality>
        <Hero>
          <HeroBody>
            <Container>
              <Columns>
                <CenteredColumn>
                  <Avatar />
                  <Name>{data.site.siteMetadata.title}</Name>
                  <Centered>
                    {nav.navLinks.map(
                      (link): React.ReactElement => (
                        <StyledLocalButton to={link.url} key={link.name}>
                          {link.name}
                        </StyledLocalButton>
                      )
                    )}
                  </Centered>
                </CenteredColumn>
              </Columns>
            </Container>
          </HeroBody>
        </Hero>
      </HeroBackground>
      <FeaturedContentContainer>
        <SimpleRemarkSection
          label="Biography"
          headerTag="h2"
          remarkNode={data.biography.childMarkdownRemark}
        />
        <Link to="/about">Read More...</Link>
      </FeaturedContentContainer>
      <FeaturedContentContainer>
        <JsonLd<Blog>
          item={{
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${data.site.siteMetadata.siteUrl}/blog`,
            url: `${data.site.siteMetadata.siteUrl}/blog`,
            mainEntityOfPage: `${data.site.siteMetadata.siteUrl}/blog`,
            blogPost: data.blogPosts.edges.map(
              ({ node: post }): BlogPosting => ({
                "@type": "BlogPosting",
                "@id": `${data.site.siteMetadata.siteUrl}${post.slug}`
              })
            )
          }}
        />
        <h2>Blog Posts</h2>
        <ContentCarousel>
          {data.blogPosts.edges.map(({ node: post }) => (
            <Featured key={post.id}>
              <JsonLd<BlogPosting>
                item={{
                  "@context": "https://schema.org",
                  "@type": "BlogPosting",
                  "@id": `${data.site.siteMetadata.siteUrl}${post.slug}`,
                  datePublished: post.rawDate,
                  headline: post.title,
                  name: post.title,
                  url: `${data.site.siteMetadata.siteUrl}${post.slug}`,
                  mainEntityOfPage: `${data.site.siteMetadata.siteUrl}${post.slug}`,
                  image: post.featuredImage && {
                    "@type": "ImageObject",
                    "@id": `${data.site.siteMetadata.siteUrl}${post.featuredImage.childImageSharp.fluid.src}`
                  }
                }}
              />
              {post.featuredImage && (
                <Link to={post.slug}>
                  <FeaturedImage
                    fluid={{
                      ...post.featuredImage.childImageSharp.fluid,
                      base64: post.featuredImage.childImageSharp.sqip.dataURI
                    }}
                  />
                </Link>
              )}
              <FeaturedContent>
                <Link to={post.slug}>
                  <h3>{post.title}</h3>
                </Link>
                <time dateTime={post.rawDate}>{post.date}</time>
                <p>{post.excerpt}</p>
                <FlexReadMoreLink to={post.slug}>Read More...</FlexReadMoreLink>
              </FeaturedContent>
            </Featured>
          ))}
        </ContentCarousel>
      </FeaturedContentContainer>
    </BaseLayout>
  );
};

export default IndexPage;

export const query = graphql`
  query KeplerIndexPageData {
    site {
      siteMetadata {
        title
        description
        siteUrl
        social {
          name
          id
          url
          isProfile
        }
      }
    }

    settingsJson {
      navLinks {
        url
        name
      }
      id
      rawJson
      fileRelativePath
    }

    metadataImage: file(
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

    biography: file(
      sourceInstanceName: { eq: "about" }
      relativePath: { eq: "biography.md" }
    ) {
      ...KeplerSimpleRemarkSection
    }

    blogPosts: allBlogPost(sort: { order: DESC, fields: date }) {
      edges {
        node {
          id
          title
          slug
          date(formatString: "MMMM DD, YYYY")
          rawDate: date
          ... on RemarkBlogPost {
            excerpt(pruneLength: 140)
          }
          featuredImage {
            childImageSharp {
              sqip(numberOfPrimitives: 100, blur: 0) {
                dataURI
              }
              # Generate Picture up to 8K 4:3 ratio, crop and cover as appropriate
              fluid(
                maxWidth: 7680
                maxHeight: 5760
                cropFocus: CENTER
                fit: COVER
                srcSetBreakpoints: [
                  256
                  512
                  768
                  1024
                  # 720p
                  1280
                  # 1080p
                  1920
                  # 4k
                  3840
                  # 5k
                  5120
                  # 8k
                  7680
                ]
              ) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`;
