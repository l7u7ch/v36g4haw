import * as React from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";

function recSearch(props) {
  return (
    <div className="pl-4">
      {props.map((node) => (
        <>
          <AnchorLink href={node.url}>
            <div className="rounded-lg px-4 py-2 duration-500 hover:bg-slate-700">{node.title}</div>
          </AnchorLink>
          {node?.items ? recSearch(node.items) : ""}
        </>
      ))}
    </div>
  );
}

const TocComponent = ({ props }) => {
  return props ? <div className="rounded-lg bg-slate-800 py-4 pr-4">{recSearch(props)}</div> : undefined;
};

export default TocComponent;
