import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

const FooterComponent = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulPerson {
        name
      }
    }
  `);

  return (
    <footer className="bg-slate-800 p-2 text-center">
      © {new Date().getFullYear()} {data.contentfulPerson.name}
    </footer>
  );
};

export default FooterComponent;
