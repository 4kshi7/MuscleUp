import React from "react";
import Navbar from "../components/Navbar";
import GymInputs from "../components/GymInputs";

const Home: React.FC = () => {
  return (
    // <div className="px-5 md:px-10 lg:px-20 flex justify-center items-center h-[88vh]">

    <>
      <Navbar />
      <div className=" h-fit py-[8%] md:py-[3%] lg:py-[2%] text-gray-900 dark:text-gray-100 px-5 md:px-10 lg:px-20 flex justify-center items-center">
        <GymInputs />
      </div>
    </>
  );
};

export default Home;
