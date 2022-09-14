require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "XENEXE",
    siteUrl: "https://xenexe.info/",
    description: "XENEXE は，『暗黙知を形式知に』をコンセプトに運営している Tech 系のブログサイトです。",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-postcss",
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-twitter",
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://www.example.com`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        gatsbyRemarkPlugins: [
          "gatsby-remark-code-titles",
          "gatsby-remark-embed-youtube",
          {
            resolve: "gatsby-remark-autolink-headers",
            options: { icon: false },
          },
          {
            resolve: "gatsby-remark-external-links",
          },
          {
            resolve: "gatsby-remark-prismjs",
            options: { showLineNumbers: true },
          },
        ],
        remarkPlugins: [require("remark-math")],
        rehypePlugins: [require("rehype-katex")],
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
  ],
};
