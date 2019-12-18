import { IndexPageData } from "../pages/index";

export const KeplerIndexPageData: IndexPageData = {
  site: {
    siteMetadata: {
      title: "Example Site",
      description: "This is an example of a personal web site.",
      siteUrl: "https://site.dev",
      social: [
        {
          name: "Email",
          id: "test@example.dev",
          url: "mailto:test@example.dev",
          isProfile: false
        },
        {
          name: "PGP",
          id: "XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX",
          url: "https://example.dev/pub.asc",
          isProfile: false
        },
        {
          name: "GitHub",
          id: "test",
          url: "https://github.dev/test",
          isProfile: true
        },
        {
          name: "Twitter",
          id: "@test",
          url: "https://twitter.dev/test",
          isProfile: true
        },
        {
          name: "LinkedIn",
          id: "test",
          url: "https://linkedin.dev/in/test",
          isProfile: true
        },
        {
          name: "Keybase",
          id: "test",
          url: "https://keybase.dev/test",
          isProfile: true
        },
        {
          name: "Instagram",
          id: "@test",
          url: "https://instagram.dev/test",
          isProfile: true
        },
        {
          name: "Unknown Platform of the Future",
          id: "test",
          url: "https://🤷🏼‍♂️.dev/test",
          isProfile: true
        }
      ],
      nav: [
        {
          name: "Blog",
          url: "/blog"
        },
        {
          name: "Portfolio",
          url: "/portfolio"
        },
        {
          name: "About",
          url: "/about"
        }
      ]
    }
  },
  biography: {
    childMdx: {
      frontmatter: {
        title: "Biography"
      },
      body:
        "I am a computer programmer and college student based out of Salt Lake City, with experience in entrepreneurship, student leadership, and open source software development."
    }
  },
  metadataImage: {
    childImageSharp: {
      fixed: {
        base64: "",
        width: 100,
        height: 100,
        src: "",
        srcSet: ""
      }
    }
  },
  blogPosts: {
    edges: [
      {
        node: {
          id: "post-1",
          title: "Test Post (without Image)",
          slug: "/blog/01-post-without-image",
          date: "Dec 18, 2018",
          rawDate: "2018-12-18",
          excerpt: "This is an example of a blog post without a featured image."
        }
      },
      {
        node: {
          id: "post-2",
          title: "Test Post (with Image)",
          slug: "/blog/02-post-with-image",
          date: "Dec 18, 2019",
          rawDate: "2018-12-18",
          excerpt: "This is an example of a blog post with a featured image.",
          featuredImage: {
            childImageSharp: {
              fluid: {
                aspectRatio: 1.0,
                src: "/static/image-1/image.jpeg",
                srcSet: "/static/image-1/image.jpeg 1x",
                sizes: "(min-width 100px)"
              }
            }
          }
        }
      }
    ]
  }
};
