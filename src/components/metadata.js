import * as React from "react";
import { FaCalendarDays, FaRotate, FaFileLines, FaBookOpen } from "react-icons/fa6";
import dayjs from "dayjs";

const MetadataComponent = ({ createdAt = "1999-11-11", updatedAt = "1999-11-11", words = 0, timeToRead = 0 }) => {
  return (
    <div className="rounded-lg bg-slate-800">
      {/* 1. 投稿日 */}
      <div className="flex justify-between border-slate-700 px-6 py-4">
        <span className="flex items-center">
          <FaCalendarDays /> &nbsp; 投稿日
        </span>
        {dayjs(createdAt).format(`YYYY-MM-DD`)}
      </div>
      {/* 2. 更新日 */}
      <div className="flex justify-between border-t-2 border-slate-700 px-6 py-4">
        <span className="flex items-center">
          <FaRotate /> &nbsp; 更新日
        </span>
        {dayjs(updatedAt).format(`YYYY-MM-DD`)}
      </div>
      {/* 3. 文字数 */}
      <div className="flex justify-between border-t-2 border-slate-700 px-6 py-4">
        <span className="flex items-center">
          <FaFileLines /> &nbsp; 文字数
        </span>
        {words} 文字
      </div>
      {/* 4. 読了時間 */}
      <div className="flex justify-between border-t-2 border-slate-700 px-6 py-4">
        <span className="flex items-center">
          <FaBookOpen /> &nbsp; 読了時間
        </span>
        約 {timeToRead} 分
      </div>
    </div>
  );
};

export default MetadataComponent;
