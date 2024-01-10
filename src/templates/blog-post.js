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
import { FaPencil } from "react-icons/fa6";

// MDXProvider：https://www.gatsbyjs.com/docs/how-to/routing/customizing-components/

const components = {
  h2: (props) => <h2 className="rounded-lg bg-slate-700 p-4 text-2xl" {...props} />,
  h3: (props) => <h3 className="text-2xl" {...props} />,
  h4: (props) => <h4 className="text-xl" {...props} />,
  blockquote: (props) => <blockquote className="border-l-8 border-slate-600 px-4 py-2" {...props} />,
  ul: (props) => <ul className="ml-6 list-disc leading-8" {...props} />,
  ol: (props) => <ol className="ml-6 list-decimal leading-8" {...props} />,
  table: (props) => <table className="w-full" {...props} />,
  tr: (props) => <tr className="" {...props} />,
  td: (props) => <td className="border-2 border-slate-600 p-2" {...props} />,
  th: (props) => <th className="border-2 border-slate-600 p-2" {...props} />,
  strong: (props) => <strong className="underline decoration-red-600" {...props} />,
  hr: (props) => <hr className="border-slate-700" {...props} />,
  a: (props) => <a className="text-sky-500 hover:underline" {...props} />,
  sup: (props) => <sup className="text-sky-500" {...props} />,
};

const BlogPostTemplate = ({ data: { file, mdx } }) => {
  return (
    <Layout>
      <div className="flex justify-center gap-6">
        {/* 1. メインブロック */}
        <div className="w-full max-w-3xl rounded-lg bg-slate-800 p-8">
          {/* 1.1. タイトル */}
          <h1 className="mb-8 text-4xl font-bold">{mdx.frontmatter.title || "UNTITLED"}</h1>
          {/* 1.2. ヒーローイメージ */}
          <div>
            <GatsbyImage
              image={mdx.frontmatter.heroImage?.childImageSharp.gatsbyImageData || file.childImageSharp.gatsbyImageData}
              className={"mb-8 rounded-lg"}
            />
          </div>
          {/* 1.3. ボディー (MDX) */}
          <div id="mdx">
            <MDXProvider components={components}>
              {mdx.body ? <MDXRenderer>{mdx.body}</MDXRenderer> : "UNTITLED"}
            </MDXProvider>
          </div>
        </div>
        {/* 2. サイドブロック */}
        <div className="hidden w-full max-w-xs lg:inline-block">
          {/* 2.1. Author */}
          <Author />
          <br />
          {/* 2.2. メタデータ */}
          <Metadata
            createdAt={mdx.frontmatter.createdAt}
            updatedAt={mdx.frontmatter.updatedAt}
            words={mdx.wordCount.words}
            timeToRead={mdx.timeToRead}
          />
          <br />
          <div className="sticky top-6">
            {/* 2.3. TOC */}
            <Toc props={mdx.tableOfContents.items} />
            <br />
            <a
              aria-label="github"
              className="flex items-center justify-center rounded-lg bg-slate-800 py-4 duration-500 hover:bg-slate-700"
              href={`https://github.com/l7u7ch/xenexe/tree/master/content/posts/${mdx.slug}/${mdx.fileAbsolutePath
                .split("/")
                .pop()}`}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              <FaPencil /> &nbsp; この記事にフィードバックする
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head = ({ data: { mdx } }) => {
  return (
    <Seo
      postId={mdx.id}
      title={mdx.frontmatter.title || "UNTITLED"}
      description={mdx.excerpt}
      image={mdx.frontmatter.heroImage?.publicURL}
      type="article"
    />
  );
};

export const pageQuery = graphql`
  query ($id: String!) {
    file(relativePath: { eq: "default-hero-image.png" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
    mdx(id: { eq: $id }) {
      body
      excerpt
      fileAbsolutePath
      frontmatter {
        createdAt
        heroImage {
          childImageSharp {
            gatsbyImageData
          }
          publicURL
        }
        title
        updatedAt
      }
      id
      rawBody
      slug
      tableOfContents
      timeToRead
      wordCount {
        words
      }
    }
  }
`;
