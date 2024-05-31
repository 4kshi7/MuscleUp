import React from "react";
import { useRecoilValue } from "recoil";
import { responseDataAtom } from "../atoms/recoil";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";

const Advice: React.FC = () => {
  const content = useRecoilValue(responseDataAtom);
  console.log(content.data);

  return (
    <>
      <Navbar />
      <div className="px-5 md:px-10 lg:px-20 max-w-3xl h-screen mt-2 mx-auto">
        <div className="summary_box prose sm:prose-sm lg:prose-lg xl:prose-xl 2xl:prose-2xl max-w-[1000px] text-left text-gray-700">
          <ReactMarkdown>{content.data}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default Advice;
