import { createContext, useState , useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc , collection, getDocs } from "firebase/firestore";
import useUser from "../hooks/useUser";
export const ResumeContext = createContext({
    userResumes:[],
    selectedResumeId : -1,
    updateUserResumes:()=>{},
    updateSelectedResumeId : ()=>{}
});

const ResumeContextProvider = ({children})=>{
    
    const [selectedResumeId , setSelectedResumeId] = useState(-1);
    const [userResumes,setUserResumes] = useState([]);
   
    const updateSelectedResumeId = (id)=>{
        setSelectedResumeId(id);
    }
    const updateUserResumes = (id)=>{
        setUserResumes(prev=>{
            return [...prev,id];
        })
    }
    const ctx = {
        userResumes,
        selectedResumeId,
        updateUserResumes,
        updateSelectedResumeId
    }
    return <ResumeContext.Provider value = {ctx}>
        {children}
    </ResumeContext.Provider>
}

export default ResumeContextProvider;