import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { GrMail } from "react-icons/gr";
import { PiGithubLogoFill } from "react-icons/pi";
import { SiMisskey } from "react-icons/si";

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
              github
              mail
              misskeyId
              misskeyServer
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
          className="btn-primary border-0 bg-sky-600 hover:bg-slate-700"
          href={`mailto:${site.siteMetadata.author.social.mail}`}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <GrMail />
        </a>
        {/* 4.2. Misskey */}
        <a
          aria-label="misskey"
          className="btn-primary border-0 bg-teal-600 hover:bg-slate-700"
          href={`https://${site.siteMetadata.author.social.misskeyServer}/@${site.siteMetadata.author.social.misskeyId}`}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <SiMisskey />
        </a>
        {/* 4.3. Github */}
        <a
          aria-label="github"
          className="btn-primary border-0 bg-slate-600 hover:bg-black"
          href={`https://github.com/${site.siteMetadata.author.social.github}`}
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <PiGithubLogoFill />
        </a>
      </div>
    </div>
  );
};

export default AuthorComponent;
