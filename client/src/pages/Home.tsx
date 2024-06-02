import React from "react";
import Navbar from "../components/Navbar";
import GymInputs from "../components/GymInputs";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="px-5 md:px-10 lg:px-20 h-screen">
      <div className="absolute top-36 -left-10 md:left-20 md:w-[72vh] md:h-[72vh] w-[30vh] h-[30vh] bg-purple-300 rounded-full opacity-20 mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        <GymInputs />
      </div>
    </div>
  );
};

export default Home;
