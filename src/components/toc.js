import * as React from "react";
import Toc from "../components/toc";
import AnchorLink from "react-anchor-link-smooth-scroll";

const TocComponent = ({ props }) => {
  return (
    <div className="rounded-lg bg-slate-800 py-4 pr-4">
      <ul className="pl-4">
        {props.map((item) => (
          <>
            {item.items ? (
              <>
                <AnchorLink href={item.url}>
                  <li className="rounded-lg px-4 py-2 duration-500 hover:bg-slate-700">{item.title}</li>
                </AnchorLink>
                <Toc props={item.items} />
              </>
            ) : (
              <AnchorLink href={item.url}>
                <li className="rounded-lg px-4 py-2 duration-500 hover:bg-slate-700">{item.title}</li>
              </AnchorLink>
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default TocComponent;
