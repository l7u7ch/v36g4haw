const pageQuery = `{
  allContentfulBlogPost {
    nodes {
      id
      title
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
      data.allContentfulBlogPost.nodes.map(({ id, title, heroImage }) => ({
        objectID: id,
        title,
        heroImage: heroImage ? heroImage.gatsbyImageData : "",
      })),
  },
];

module.exports = queries;
