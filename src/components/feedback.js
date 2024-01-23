import * as React from "react";
import { FaPencil } from "react-icons/fa6";

const FeedbackComponent = ({ slug = "", fileAbsolutePath = "" }) => {
  return (
    <a
      aria-label="feedback"
      className="block rounded-lg bg-slate-800 py-4 text-center duration-500 hover:bg-slate-700"
      href={`https://github.com/l7u7ch/xenexe/tree/master/content/posts/${slug}/${fileAbsolutePath.split("/").pop()}`}
      rel="nofollow noopener noreferrer"
      target="_blank"
    >
      <FaPencil className="inline" />
      {" この記事にフィードバックする"}
    </a>
  );
};

export default FeedbackComponent;
