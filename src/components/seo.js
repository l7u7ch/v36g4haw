/*
 * Reference: https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/src/components/seo.js
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const SeoComponent = ({ postId, title, description, image, type, locale }) => {
  const {
    file,
    site: { siteMetadata },
  } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "default-hero-image.png" }) {
        publicURL
      }
      site {
        siteMetadata {
          title
          siteUrl
          description
          author {
            social {
              twitter
            }
          }
        }
      }
    }
  `);

  // 初期化処理
  const URL = postId ? `${siteMetadata.siteUrl}/${postId}` : siteMetadata.siteUrl;
  const TITLE = title ? `${title} | ${siteMetadata.title}` : siteMetadata.title;
  const DESCRIPTION = description || siteMetadata.description;
  const IMAGE = image || `${siteMetadata.siteUrl}/${file.publicURL}`;
  const TYPE = type || "website";
  const LOCALE = locale || "ja-JP";
  const TWITTER = siteMetadata.author.social.twitter || "";

  return (
    <>
      <title>{TITLE}</title>
      <meta name="description" content={DESCRIPTION} />
      {/* OGP: https://developers.facebook.com/docs/sharing/webmasters/ */}
      <meta property="og:url" content={URL} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:image" content={IMAGE} />
      <meta property="og:type" content={TYPE} />
      <meta property="og:locale" content={LOCALE} />
      {/* Twitter Card: https://developer.twitter.com/ja/docs/tweets/optimize-with-cards/guides/getting-started */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER} />
      <meta name="twitter:creator" content={TWITTER} />
      {/* Google AdSense */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2369270801912255"
        crossorigin="anonymous"
      />
    </>
  );
};

export default SeoComponent;
