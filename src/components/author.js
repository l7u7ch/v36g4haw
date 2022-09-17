import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

const AuthorComponent = () => {
  const { file, site } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "author-image.png" }) {
        childImageSharp {
          gatsbyImageData
        }
      }
      site {
        siteMetadata {
          author {
            name
            bio
            social {
              mail
              twitter
              github
            }
          }
        }
      }
    }
  `);

  return (
    <div className="rounded-lg bg-slate-800 p-6 text-center">
      {/* 1. Author Image */}
      <GatsbyImage image={file.childImageSharp.gatsbyImageData} className={"mb-4 w-1/3"} />
      {/* 2. Author Name */}
      <div className="mb-4 text-center text-xl font-bold">{site.siteMetadata.author.name}</div>
      {/* 3. Author Bio */}
      <div className="mb-6">{site.siteMetadata.author.bio}</div>
      {/* 4. Social Button */}
      <div className="flex justify-center gap-6">
        {/* 4.1. Mail */}
        <a
          aria-label="mail"
          className="btn-primary border-emerald-500 bg-emerald-500 hover:bg-slate-800 hover:text-emerald-500"
          href={`mailto:${site.siteMetadata.author.social.mail}`}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faEnvelope} fixedWidth />
        </a>
        {/* 4.2. Twitter */}
        <a
          aria-label="twitter"
          className="btn-primary border-twitter bg-twitter hover:bg-slate-800 hover:text-twitter"
          href={`https://twitter.com/${site.siteMetadata.author.social.twitter}`}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faTwitter} fixedWidth />
        </a>
        {/* 4.3. Github */}
        <a
          aria-label="github"
          className="btn-primary border-white bg-white text-2xl text-slate-800 hover:bg-slate-800 hover:text-white"
          href={`https://github.com/${site.siteMetadata.author.social.github}`}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} fixedWidth />
        </a>
      </div>
    </div>
  );
};

export default AuthorComponent;
