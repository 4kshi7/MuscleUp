import React from "react";
import { useRecoilValue } from "recoil";
import { responseDataAtom } from "../atoms/recoil";
import Navbar from "../components/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "../style.css";

const Advice: React.FC = () => {
  const content = useRecoilValue(responseDataAtom) || {
    data: "No data available",
  };

  return (
    <>
      <Navbar />
      <div className="absolute top-36 -right-10 md:right-20 md:w-[72vh] md:h-[72vh] w-[70vh] h-[70vh] bg-orange-300 rounded-full opacity-20 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

      <div className="absolute top-[150%] -left-10 md:left-20 md:w-[72vh] md:h-[72vh] w-[70vh] h-[70vh] bg-purple-300 rounded-full opacity-20 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      <div className="px-5 md:px-10 lg:px-20 max-w-6xl h-screen mt-2 mx-auto">
        <div className="">
          <ReactQuill
            value={content.data}
            readOnly={true}
            theme={"bubble"}
            className="custom-quill"
          />
        </div>
      </div>
    </>
  );
};

export default Advice;
