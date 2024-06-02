// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfig";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import { RecoilRoot } from "recoil";
import Advice from "./pages/Advice";
import { Landing } from "./pages/Landing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <RecoilRoot>
      <ToastContainer />

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/sign-up"
            element={user ? <Navigate to="/dashboard" /> : <SignUp />}
          />
          <Route
            path="/dashboard"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/advice" element={<Advice />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
