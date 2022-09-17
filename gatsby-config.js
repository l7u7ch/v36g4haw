require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `XENEXE`,
    siteUrl: `https://xenexe.info/`,
    description: `XENEXE は，『暗黙知を形式知に』をコンセプトに運営している Tech 系のブログサイトです。`,
    author: {
      name: `l7u7ch`,
      bio: `コンピュータサイエンスを専攻している大学院生です。研究の合間に，アニメを観たりブログサイトを運営しながら生きています。`,
      social: {
        mail: `ecfe76ad-8f27-4d7c-9dc4-0e4947164e54@slmail.me`,
        twitter: `l7u7ch`,
        github: `l7u7ch`,
      },
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://xenexe.info/`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `XENEXE`,
        short_name: `XENEXE`,
        start_url: `/`,
        background_color: `#0f172a`,
        theme_color: `#0f172a`,
        display: `standalone`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: { icon: false },
          },
          `gatsby-remark-code-titles`,
          `gatsby-remark-embed-youtube`,
          {
            resolve: `gatsby-remark-external-links`,
          },
          `gatsby-remark-prismjs`,
        ],
        remarkPlugins: [require(`remark-math`)],
        rehypePlugins: [require(`rehype-katex`)],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
        host: process.env.CONTENTFUL_HOST,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    `gatsby-transformer-sharp`,
  ],
};
