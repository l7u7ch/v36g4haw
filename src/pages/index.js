import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Link, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate } from "@fortawesome/free-solid-svg-icons";

const IndexPage = ({ data: { allContentfulBlogPost } }) => {
  return (
    <Layout>
      <div className="grid grid-cols-1 items-start gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allContentfulBlogPost.nodes.map((node) => (
          <Link className="rounded-lg bg-slate-800 duration-500 hover:scale-105" to={node.id}>
            <GatsbyImage image={node.heroImage.gatsbyImageData} className={"rounded-t-lg"} />
            <div className="p-4">
              <div className="mb-2">{node.title}</div>
              <div className="text-right">
                <FontAwesomeIcon className="" icon={faRotate} fixedWidth /> {node.updatedAt}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;

export const Head = ({ data }) => {
  return <Seo />;
};

export const pageQuery = graphql`
  query {
    allContentfulBlogPost(sort: { fields: updatedAt, order: DESC }) {
      nodes {
        id
        title
        heroImage {
          gatsbyImageData
        }
        updatedAt(formatString: "YYYY-MM-DD")
      }
    }
  }
`;
