/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
const path = require("path");

const gatsbyRemarkPlugins = [
  "gatsby-remark-smartypants",
  {
    resolve: "gatsby-remark-vscode",
    options: {
      extensionDataDirectory: path.resolve(__dirname, "vendor/vscode"),
      languageAliases: {
        shell: "bash"
      },
      colorTheme: {
        defaultTheme: "Atom One Light",
        prefersDarkTheme: "Atom One Dark"
      },
      extensions: [
        {
          identifier: "akamud.vscode-theme-onedark",
          version: "2.1.0"
        },
        {
          identifier: "akamud.vscode-theme-onelight",
          version: "2.1.0"
        }
      ]
    }
  },
  "gatsby-remark-autolink-headers",
  // gatsby-remark-relative-images must
  // go before gatsby-remark-images
  "gatsby-remark-relative-images",
  {
    resolve: "gatsby-remark-images",
    options: {
      // It's important to specify the maxWidth (in pixels) of
      // the content container as this plugin uses this as the
      // base for generating different widths of each image.
      maxWidth: 590
    }
  }
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = pluginOptions => ({
  plugins: [
    "gatsby-tinacms-json",
    {
      resolve: "gatsby-plugin-tinacms",
      options: {
        sidebar: {
          hidden: process.env.NODE_ENV === "production",
          position: "displace"
        },
        plugins: ["gatsby-tinacms-git", "gatsby-tinacms-json"]
      }
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: "./content/assets"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "about",
        path: "./content/about"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "experience",
        path: "./content/experience"
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "education",
        path: "./content/education"
      }
    },
    "gatsby-transformer-json",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx", ".md"],
        defaultLayouts: {
          default: require.resolve("./src/components/BaseLayout/index.tsx")
        },
        gatsbyRemarkPlugins
      }
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: gatsbyRemarkPlugins
      }
    },
    {
      resolve: "gatsby-theme-early-bird",
      options: {
        basePath: "/blog/",
        remark: false
      }
    },
    {
      resolve: "gatsby-theme-curiousity",
      options: {
        basePath: "/portfolio/",
        remark: false
      }
    },
    "gatsby-plugin-react-helmet-async",
    "gatsby-plugin-emotion",
    "gatsby-plugin-typescript"
  ]
});
