import { IndexPageData } from "../pages/index";

export const KeplerIndexPageData: IndexPageData = {
  site: {
    siteMetadata: {
      title: "Kepler Sticka-Jones",
      description: "",
      siteUrl: "",
      social: [
        {
          name: "Twitter",
          id: "@test",
          url: "https://twitter.com/test",
          isProfile: true
        },
        {
          name: "GitHub",
          id: "test",
          url: "https://github.com/test",
          isProfile: true
        }
      ],
      nav: [
        {
          name: "Blog",
          url: "/blog"
        },
        {
          name: "Projects",
          url: "/projects"
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
          id: "",
          title: "",
          slug: "",
          date: "",
          rawDate: "",
          excerpt: ""
        }
      }
    ]
  }
};
