import React,{useEffect} from "react";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
  signInWithPopup,
} from "firebase/auth";
import {useQueryClient} from "@tanstack/react-query"
import { auth } from "../firebase/firebaseConfig";


const AuthenticationButtons = ({ text, Icon, provider }) => {
  const queryClient = useQueryClient();

  const googleAuthProvider = new GoogleAuthProvider();
  const gitAuthProvider = new GithubAuthProvider();

  const handleSignIn = async () => {
    if (provider === "GoogleAuthProvider") {
      await signInWithPopup(auth, googleAuthProvider)
        .then(() => {
          console.log("signed in");
          queryClient.invalidateQueries(['users'])
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (provider === "GithubAuthProvider") {
        await signInWithPopup(auth, gitAuthProvider)
        .then((user) => {
          console.log("github user : " ,user);
          queryClient.invalidateQueries(['users'])
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <button
      onClick={handleSignIn}
      className="px-5 py-2 bg-transparent border border-violet-600 rounded-md flex justify-center items-center gap-3 text-sm w-[80%] hover:bg-violet-600 hover:text-white duration-75 active:scale-90"
    >
      <Icon />
      {text}
    </button>
  );
};

export default AuthenticationButtons;
