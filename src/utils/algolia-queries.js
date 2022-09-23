const pageQuery = `{
  allContentfulBlogPost {
    nodes {
      id
      title
      tags
      heroImage {
        url
        gatsbyImageData
      }
    }
  }
}`;

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) =>
      data.allContentfulBlogPost.nodes.map(({ id, title, tags, heroImage }) => ({
        objectID: id,
        title,
        tags,
        heroImage: heroImage ? heroImage.gatsbyImageData : "",
      })),
  },
];

module.exports = queries;
