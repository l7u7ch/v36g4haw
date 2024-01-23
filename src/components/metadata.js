import * as React from "react";
import { FaCalendarDays, FaRotate, FaFileLines, FaBookOpen } from "react-icons/fa6";
import dayjs from "dayjs";

const MetadataComponent = ({ createdAt = "1999-11-11", updatedAt = "1999-11-11", words = 0 }) => {
  return (
    <div className="rounded-lg bg-slate-800">
      {/* 1. 投稿日 */}
      <div className="flex justify-between px-6 py-4">
        <span>
          <FaCalendarDays className="inline" />
          {" 投稿日"}
        </span>
        {dayjs(createdAt).format(`YYYY-MM-DD`)}
      </div>
      <hr className="border-t-2 border-slate-700" />
      {/* 2. 更新日 */}
      <div className="flex justify-between px-6 py-4">
        <span>
          <FaRotate className="inline" />
          {" 更新日"}
        </span>
        {dayjs(updatedAt).format(`YYYY-MM-DD`)}
      </div>
      <hr className="border-t-2 border-slate-700" />
      {/* 3. 文字数 */}
      <div className="flex justify-between px-6 py-4">
        <span>
          <FaFileLines className="inline" />
          {" 文字数"}
        </span>
        {words}
        {" 文字"}
      </div>
      <hr className="border-t-2 border-slate-700" />
      {/* 4. 読了時間 */}
      <div className="flex justify-between px-6 py-4">
        <span>
          <FaBookOpen className="inline" />
          {" 読了時間"}
        </span>
        {"約 "}
        {Math.ceil(words / 400)}
        {" 分"}
      </div>
    </div>
  );
};

export default MetadataComponent;
