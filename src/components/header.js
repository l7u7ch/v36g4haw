import * as React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";

const HeaderComponent = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <header className="bg-slate-800 p-4">
      <Link className="text-2xl font-bold" to="/">
        {data.site.siteMetadata.title}
      </Link>
    </header>
  );
};

export default HeaderComponent;
