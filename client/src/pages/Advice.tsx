import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useRecoilValue } from "recoil";
import { responseDataAtom } from "../atoms/recoil";
import Navbar from "../components/Navbar";

const Advice: React.FC = () => {
  const data = useRecoilValue(responseDataAtom);
  useEffect(() => {
      localStorage.setItem('responseData', JSON.stringify(data));
    }, [data]);
    const markdownData = JSON.stringify(data);

  return (
    <div>
      <Navbar />
      <ReactMarkdown>{markdownData}</ReactMarkdown>
    </div>
  );
};

export default Advice;
