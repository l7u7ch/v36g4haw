import * as React from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import Toc from "../components/toc";
import Metadata from "../components/metadata";
import Author from "../components/author";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { MDXProvider } from "@mdx-js/react";

/*
 * MDXProvider
 * Reference: https://www.gatsbyjs.com/docs/how-to/routing/customizing-components/
 */

const components = {
  h2: (props) => <h2 className="rounded-lg bg-slate-700 p-4 text-2xl" {...props} />,
  h3: (props) => <h3 className="text-2xl" {...props} />,
  h4: (props) => <h4 className="text-xl" {...props} />,
  blockquote: (props) => <blockquote className="my-4 border-l-8 border-slate-600 px-4 py-2" {...props} />,
  ul: (props) => <ul className="ml-6 list-disc" {...props} />,
  ol: (props) => <ol className="ml-6 list-decimal" {...props} />,
  table: (props) => <table className=" w-full rounded-lg bg-slate-700" {...props} />,
  tr: (props) => <tr className="border-b-2 border-slate-600 p-4 last:border-b-0" {...props} />,
  td: (props) => <td className="p-4" {...props} />,
  th: (props) => <th className="border-b-2 border-slate-600 p-4" {...props} />,
  a: (props) => <a className="text-sky-500 hover:underline" {...props} />,
  img: (props) => <img className="w-full rounded-lg" {...props} />,
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
          {contentfulBlogPost.title ? <h1 className="text-2xl font-bold">{contentfulBlogPost.title}</h1> : ""}
          <br />
          {/* 1.2. ヒーローイメージ */}
          <div>
            <GatsbyImage image={contentfulBlogPost.heroImage.gatsbyImageData} className={"rounded-lg"} />
          </div>
          <br />
          {/* 1.3. ボディー (MDX) */}
          <div id="mdx">
            <MDXProvider components={components}>
              {contentfulBlogPost.body ? <MDXRenderer>{contentfulBlogPost.body.childMdx.body}</MDXRenderer> : ""}
            </MDXProvider>
          </div>
        </div>
        {/* 2. サイドブロック */}
        <div className="hidden w-full max-w-xs lg:inline-block">
          {/*  */}
          {/* 2.1. Author */}
          <Author />
          <br />
          {/* 2.2. メタデータ */}
          <Metadata
            createdAt={contentfulBlogPost.createdAt}
            updatedAt={contentfulBlogPost.updatedAt}
            word={contentfulBlogPost.body ? contentfulBlogPost.body.childMdx.rawBody.length : 0}
            tags={contentfulBlogPost.tags ? contentfulBlogPost.tags : []}
          />
          <br />
          <div className="sticky top-6">
            {/* 2.3. TOC */}
            {contentfulBlogPost.body && contentfulBlogPost.body.childMdx.tableOfContents.items ? (
              <div className="rounded-lg bg-slate-800 py-4 pr-4">
                <Toc props={contentfulBlogPost.body.childMdx.tableOfContents.items} />
              </div>
            ) : (
              ""
            )}
          </div>
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
      tags
      title
      createdAt(formatString: "YYYY-MM-DD")
      updatedAt(formatString: "YYYY-MM-DD")
      heroImage {
        gatsbyImageData
        url
      }
      body {
        childMdx {
          body
          excerpt(pruneLength: 160)
          rawBody
          tableOfContents(maxDepth: 3)
        }
      }
    }
  }
`;
