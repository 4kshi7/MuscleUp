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
      <div className="overflow-hidden"> 
      </div>
      <div className="px-5 md:px-10 lg:px-20 max-w-6xl h-screen mt-2 mb-20 mx-auto">
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
