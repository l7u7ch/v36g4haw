/*
 * Reference: https://github.com/gatsbyjs/gatsby-starter-blog/blob/master/src/components/seo.js
 */

import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const SeoComponent = ({ postId, title, description, image, type, locale }) => {
  const {
    site: { siteMetadata },
    contentfulPerson,
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
            description
          }
        }
        contentfulPerson {
          twitter
        }
      }
    `
  );

  // Metadata Content
  const mcUrl = postId ? `${siteMetadata.siteUrl}/${postId}` : siteMetadata.siteUrl;
  const mcTitle = title ? `${title} | ${siteMetadata.title}` : siteMetadata.title;
  const mcDescription = description || siteMetadata.description;
  const mcImage = image || "";
  const mcType = type || "website";
  const mcLocale = locale || "ja-JP";
  const mcTwitter = contentfulPerson.twitter || "";

  return (
    <>
      <title>{mcTitle}</title>
      <meta name="description" content={mcDescription} />
      {/* OGP: https://developers.facebook.com/docs/sharing/webmasters/ */}
      <meta property="og:url" content={mcUrl} />
      <meta property="og:title" content={mcTitle} />
      <meta property="og:description" content={mcDescription} />
      <meta property="og:image" content={mcImage} />
      <meta property="og:type" content={mcType} />
      <meta property="og:locale" content={mcLocale} />
      {/* Twitter Card: https://developer.twitter.com/ja/docs/tweets/optimize-with-cards/guides/getting-started */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={mcTwitter} />
      <meta name="twitter:creator" content={mcTwitter} />
    </>
  );
};

export default SeoComponent;
