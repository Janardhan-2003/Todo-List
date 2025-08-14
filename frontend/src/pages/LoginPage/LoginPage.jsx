import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { auth, provider } from "../../auth/FirebaseConfig/Firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    const token = Cookies.get("authToken");
    if(token){
      navigate("/");
    }
  },[])


    const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token=await user.getIdToken();
      console.log("User Details:", user);
      Cookies.set('authToken',token,{expires:7})
      Cookies.set("UserDetails", JSON.stringify({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }), { expires: 7 });
      navigate("/");
     
    } catch (error) {
      let userMessage = "Google sign-in failed.";

      switch (error.code) {
        case "auth/popup-closed-by-user":
          userMessage = "Popup closed before sign-in.";
          break;
        case "auth/cancelled-popup-request":
          userMessage = "Another popup was already open.";
          break;
        case "auth/popup-blocked":
          userMessage = "Popup was blocked by the browser.";
          break;
        default:
          userMessage = error.message;
      }

      
      setMessage(userMessage);
    }
  };



  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
    <div className="mx-auto bg-[#ffffff] flex flex-col justify-center items-center h-86 py-6 w-80 gap-8 shadow-xl rounded-xl">
      <h1 className="text-black">SignIn or SignUp</h1>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-fit bg-slate-950 h-10 rounded-xl drop-shadow-2xl hover:bg-slate-800 flex justify-between items-center gap-2 text-white px-10 cursor-pointer focus:outline-none"
      >
        Continue with
        <div className="text-2xl">
          <FcGoogle />
        </div>
      </button>
      {message && <p className="text-red-600">*{message}</p>}
    </div>
    </div>
  );
};

export default LoginPage;
