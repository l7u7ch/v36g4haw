/*
 * Reference: https://github.com/contentful/starter-gatsby-blog/blob/master/gatsby-node.js
 */

const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPost = path.resolve("./src/templates/blog-post.js");

  const result = await graphql(`
    {
      allContentfulBlogPost {
        nodes {
          id
          body {
            childMdx {
              body
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`There was an error loading your Contentful posts`, result.errors);
    return;
  }

  const posts = result.data.allContentfulBlogPost.nodes;

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug;
      const nextPostSlug = index === posts.length - 1 ? null : posts[index + 1].slug;

      createPage({
        path: post.id,
        component: blogPost,
        context: {
          id: post.id,
          previousPostSlug,
          nextPostSlug,
        },
      });
    });
  }
};
