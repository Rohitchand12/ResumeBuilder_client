// import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, onSnapshot, setDoc } from "firebase/firestore";

export const getUserDetails = () => {
  const promise = new Promise((resolve, reject) => {
     const unsubAuth = auth.onAuthStateChanged((user)=>{
      if(user)
      {
        const userData = user.providerData[0];
        const userDocRef = doc(db,"users",userData?.uid);

        const unsubSnapshot = onSnapshot(userDocRef,(docInfo)=>{
          if(docInfo.exists())
          {
            resolve(docInfo.data());
          }
          else
          {
            setDoc(userDocRef,userData).then(()=>{
              resolve(userData);
            })
          }
        })
        return unsubSnapshot;
        
      }
      else{
        reject( new Error("error"));
      }
     })
     return unsubAuth
  });

  return promise;
};
