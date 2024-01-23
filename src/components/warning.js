import * as React from "react";
import { FaTriangleExclamation } from "react-icons/fa6";

const WarningComponent = ({ updatedAt }) => {
  const lapsedYears = Math.floor((new Date() - new Date(updatedAt)) / (1000 * 60 * 60 * 24 * 30 * 12));
  return 0 < lapsedYears ? (
    <>
      <div className="rounded-lg bg-slate-800 p-4 text-center">
        <FaTriangleExclamation className="inline" />
        {" 本記事は、最終更新日から"}
        <br />
        {lapsedYears}
        {" 年以上が経過しています。"}
      </div>
      <br />
    </>
  ) : (
    ""
  );
};

export default WarningComponent;
