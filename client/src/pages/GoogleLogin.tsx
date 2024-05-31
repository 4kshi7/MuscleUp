import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";

const GoogleLogin: React.FC = () => {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full bg-red-500 text-white py-2 rounded mt-4"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLogin;
