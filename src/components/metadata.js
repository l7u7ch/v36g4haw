import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faCalendarDays, faFileLines, faRotate } from "@fortawesome/free-solid-svg-icons";

const MetadataComponent = ({ createdAt, updatedAt, word }) => {
  return (
    <div className="rounded-lg bg-slate-800">
      {/* 1. 投稿日 */}
      <div className="flex justify-between border-b-2 border-slate-700 px-6 py-4">
        <span>
          <FontAwesomeIcon icon={faCalendarDays} fixedWidth /> 投稿日
        </span>
        {createdAt}
      </div>
      {/* 2. 更新日 */}
      <div className="flex justify-between border-b-2 border-slate-700 px-6 py-4">
        <span>
          <FontAwesomeIcon icon={faRotate} fixedWidth /> 更新日
        </span>
        {updatedAt}
      </div>
      {/* 3. 文字数 */}
      <div className="flex justify-between border-b-2 border-slate-700 px-6 py-4">
        <span>
          <FontAwesomeIcon icon={faFileLines} fixedWidth /> 文字数
        </span>
        {word} 文字
      </div>
      {/* 4. 読了時間 */}
      <div className="flex justify-between px-6 py-4">
        <span>
          <FontAwesomeIcon icon={faBookOpen} fixedWidth /> 読了時間
        </span>
        約 {parseInt(word / 400)} 分
      </div>
    </div>
  );
};

export default MetadataComponent;
