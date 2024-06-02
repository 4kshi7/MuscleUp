import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center px-5 md:px-10 lg:px-20 py-2 border-b-[0.5px] h-18">
      <Link to={user? "/dashboard" : "/"}>
        <div className="text-xl font-medium text-gray-500 hover:text-black duration-150">MuscleUp💪</div>
      </Link>
      <div className="flex items-center space-x-4">
        {user ? (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="flex items-center space-x-2 cursor-pointer focus:outline-none">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User Profile"
                className="w-10 h-10 rounded-full"
              />
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="bg-white text-black rounded shadow-md p-2 mt-2 w-30 absolute right-0">
              <DropdownMenu.Item
                onClick={handleLogout}
                className="cursor-pointer p-2 hover:scale-105 duration-150 rounded"
              >
                Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        ) : (
          <Link to="/login">
            <button className="text-black hover:scale-105 duration-150">Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
