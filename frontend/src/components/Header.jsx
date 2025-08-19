import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../auth/FirebaseConfig/Firebase";
import Cookies from "js-cookie";
import { Cookie } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Cookies.remove("authToken");
        Cookies.remove('userId');
        Cookies.remove("UserDetails");
        navigate('/login')
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };
  return (
    <div className="flex justify-between items-center bg-white p-4 shadow-md w-full px-10 sticky left-0">
      <div>
        <h1 className="text-3xl font-bold font-serif text-sky-500 ">Todo</h1>
      </div>
      <div className="flex gap-4">
        <p>Home</p>
        <p>about</p>
        <button
          className="bg-red-500 text-white w-20 h-8 rounded-2xl font-medium font-serif text-shadow-slate-950 shadow-md hover:bg-red-600 cursor-pointer border border-slate-900"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
