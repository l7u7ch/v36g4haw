import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const FooterComponent = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
          }
        }
      }
    }
  `);

  return (
    <footer className="bg-slate-800 p-2 text-center">
      © {new Date().getFullYear()} {site.siteMetadata.author.name}
    </footer>
  );
};

export default FooterComponent;
