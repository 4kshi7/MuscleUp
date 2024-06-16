import React from "react";
import Navbar from "../components/Navbar";
import GymInputs from "../components/GymInputs";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
    
    >
      <Navbar />
      <div className="absolute top-36 -right-30 md:right-20 md:w-[72vh] md:h-[72vh] w-[30vh] h-[30vh] bg-purple-200 rounded-full opacity-20 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      <div className="px-5 md:px-10 lg:px-20 flex justify-center items-center h-[88vh]">
        <GymInputs />
      </div>
    </div>
  );
};

export default Home;
