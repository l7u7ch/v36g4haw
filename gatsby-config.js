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
        github: `l7u7ch`,
        misskeyId: `l7u7ch`,
        misskeyServer: `misskey.io`,
        twitter: `l7u7ch`,
      },
    },
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     indexName: process.env.ALGOLIA_INDEX_NAME,
    //     queries: require("./src/utils/algolia-queries"),
    //   },
    // },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://xenexe.info/`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-C2D1SC3BE5"],
        pluginConfig: {
          head: true,
        },
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
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: { icon: false },
          },
          `gatsby-remark-code-titles`,
          `gatsby-remark-external-links`,
          `gatsby-remark-images`,
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    `gatsby-transformer-sharp`,
  ],
};
