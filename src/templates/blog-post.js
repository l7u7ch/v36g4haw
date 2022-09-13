import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

/*
 * MDXProvider
 * Reference: https://www.gatsbyjs.com/docs/how-to/routing/customizing-components/
 */

const components = {
  h2: (props) => <h2 className=" rounded-lg bg-slate-700 p-4 text-2xl" {...props} />,
  h3: (props) => <h3 className=" text-2xl" {...props} />,
  blockquote: (props) => <blockquote {...props} />,
  ul: (props) => <ul className="ml-6 list-disc" {...props} />,
  ol: (props) => <ol className="ml-6 list-decimal" {...props} />,
  table: (props) => <table className=" w-full rounded-lg bg-slate-700" {...props} />,
  tr: (props) => <tr className="border-b p-4 last:border-b-0" {...props} />,
  td: (props) => <td className="p-4" {...props} />,
  th: (props) => <th className="border-b p-4" {...props} />,
  a: (props) => <a className="text-sky-500 hover:underline" {...props} />,
  sup: (props) => <sup className="text-sky-500" {...props} />,
  iframe: (props) => <iframe className="aspect-video w-full" {...props} />,
};

const BlogPostTemplate = ({ data: { contentfulBlogPost } }) => {
  return (
    <Layout>
      <div className="flex justify-center gap-6">
        {/* 1. メインブロック */}
        <div className="w-full max-w-3xl rounded-lg bg-slate-800 p-8">
          {/* 1.1. タイトル */}
          <h1 className="text-2xl font-bold">{contentfulBlogPost.title}</h1>
          <br />
          {/* 1.2. ヒーローイメージ */}
          <div>
            <GatsbyImage image={contentfulBlogPost.heroImage.gatsbyImageData} className={"rounded-lg"} />
          </div>
          <br />
          {/* 1.3. ボディー (MDX) */}
          <div id="mdx">
            <MDXProvider components={components}>
              <MDXRenderer>{contentfulBlogPost.body.childMdx.body}</MDXRenderer>
            </MDXProvider>
          </div>
        </div>
        {/* 2. サイドブロック */}
        <div class="hidden w-full max-w-xs lg:inline-block">
          <div className=" rounded-lg bg-slate-800 py-32 text-center">準備中</div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head = ({ data: { contentfulBlogPost } }) => {
  return (
    <Seo
      postId={contentfulBlogPost.id}
      title={contentfulBlogPost.title}
      description={contentfulBlogPost.body.childMdx.excerpt}
      image={contentfulBlogPost.heroImage.url}
      type="article"
      locale="ja-JP"
    />
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    contentfulBlogPost(id: { eq: $id }) {
      id
      title
      heroImage {
        gatsbyImageData
        url
      }
      body {
        childMdx {
          body
          excerpt(pruneLength: 160)
        }
      }
    }
  }
`;
