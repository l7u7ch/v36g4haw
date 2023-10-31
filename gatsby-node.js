// https://www.gatsbyjs.com/docs/how-to/routing/mdx/

const path = require("path");
const blogPost = path.resolve("./src/templates/blog-post.js");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          slug
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }

  const posts = result.data.allMdx.nodes;

  posts.forEach((node) => {
    createPage({
      path: node.slug,
      component: blogPost,
      context: { id: node.id },
    });
  });
};
