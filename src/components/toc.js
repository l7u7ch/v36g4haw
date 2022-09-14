import * as React from "react";
import Toc from "../components/toc";

const TocComponent = ({ props }) => {
  return (
    <ul className="pl-4">
      {props.map((item) => (
        <>
          {item.items ? (
            <>
              <a href={item.url}>
                <li className="rounded-lg px-4 py-2 duration-500 hover:bg-slate-700">{item.title}</li>
              </a>
              <Toc props={item.items} />
            </>
          ) : (
            <a href={item.url}>
              <li className="rounded-lg px-4 py-2 duration-500 hover:bg-slate-700">{item.title}</li>
            </a>
          )}
        </>
      ))}
    </ul>
  );
};

export default TocComponent;
