import React from "react";
import Navbar from "../components/Navbar";
import GymInputs from "../components/GymInputs";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="px-5 md:px-10 lg:px-20 h-screen">
        <GymInputs />
      </div>
    </div>
  );
};

export default Home;
