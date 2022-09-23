import * as React from "react";
import Toc from "../components/toc";
import AnchorLink from "react-anchor-link-smooth-scroll";

const TocComponent = ({ props }) => {
  return (
    <>
      {props ? (
        <div className="pl-4">
          {props.map((item) => (
            <>
              {item.items ? (
                <>
                  <AnchorLink href={item.url}>
                    <div className="rounded-lg px-4 py-2 duration-500 hover:bg-slate-700">{item.title}</div>
                  </AnchorLink>
                  <Toc props={item.items} />
                </>
              ) : (
                <AnchorLink href={item.url}>
                  <div className="rounded-lg px-4 py-2 duration-500 hover:bg-slate-700">{item.title}</div>
                </AnchorLink>
              )}
            </>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default TocComponent;

TocComponent.defaultProps = {
  // props: [],
};
