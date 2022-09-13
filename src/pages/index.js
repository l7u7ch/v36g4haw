import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { Link, graphql } from "gatsby";

const IndexPage = ({ data: { allContentfulBlogPost } }) => {
  return (
    <Layout>
      <div className="p-8">
        <ul className="list-inside list-disc">
          {allContentfulBlogPost.nodes.map((node) => (
            <li>
              <Link to={node.id}>{node.title}</Link>
            </li>
          ))}
        </ul>
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
    allContentfulBlogPost {
      nodes {
        id
        title
      }
    }
  }
`;
