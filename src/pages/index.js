import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { FaRotate } from "react-icons/fa6";
import dayjs from "dayjs";

const IndexPage = ({ data: { file, allMdx } }) => {
  return (
    <Layout>
      <div className="grid grid-cols-1 items-start gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {allMdx.nodes.map((mdx) => (
          <Link className="rounded-lg bg-slate-800 duration-500 hover:scale-105" to={mdx.slug}>
            {/* 1. ヒーローイメージ */}
            <GatsbyImage
              image={mdx.frontmatter.heroImage?.childImageSharp.gatsbyImageData || file.childImageSharp.gatsbyImageData}
              className={"rounded-t-lg"}
            />
            <div className="p-4">
              {/* 2. タイトル */}
              <div className="mb-3">{mdx.frontmatter.title || "UNTITLED"}</div>
              {/* 3.更新日 */}
              <div className="flex items-center justify-end">
                <FaRotate /> &nbsp; {dayjs(mdx.frontmatter.updatedAt).format(`YYYY-MM-DD`)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => {
  return <Seo />;
};

export const pageQuery = graphql`
  query {
    file(relativePath: { eq: "default-hero-image.png" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    allMdx(sort: { frontmatter: { updatedAt: DESC } }) {
      nodes {
        frontmatter {
          heroImage {
            childImageSharp {
              gatsbyImageData
            }
          }
          title
          updatedAt
        }
        slug
      }
    }
  }
`;

// allContentfulBlogPost(sort: { updatedAt: DESC }) {
//   nodes {
//     id
//     title
//     heroImage {
//       gatsbyImageData
//     }
//     updatedAt
//   }
// }
