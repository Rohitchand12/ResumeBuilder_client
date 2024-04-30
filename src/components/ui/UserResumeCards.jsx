import React from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import useUser from "../../hooks/useUser";
import {useQueryClient} from '@tanstack/react-query'
import {useNavigate} from 'react-router-dom'
const UserResumeCards = ({ Title, id, owner,templateId ,...props}) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate();
  const {data:user,isLoading} = useUser();
  const handleDelete = async() => {
    console.log('clicked');
    const docRef = doc(db,`users/${user.uid}/resumeCollection/${id}`)
    await deleteDoc(docRef)
    queryClient.invalidateQueries(['users','resumes']);
  }
  return (
    <motion.div
    {...props}
    className="grid grid-cols-12 col-span-12 md:col-span-6 w-[90%] lg:w-full md:h-[30vh] lg:col-span-4  rounded-md px-4 py-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <div className="flex flex-col p-5 gap-3 col-span-10">
        <h1 className="text-xl font-bold">{Title}</h1>
        <p className="text-blue-500 text-xs">{id}</p>
        <p>Resume for : {owner}</p>
      </div>
        <div className="flex flex-col col-span-2 pt-4 gap-2">
            <button onClick={()=>navigate(`/${templateId}/${id}/preview`)} className="text-blue-500 hover:bg-gray-300 flex justify-center items-center h-10 w-10 bg-gray-200 rounded-full">
            <FaEye/>
            </button>
            <button onClick = {()=>navigate(`/templates/${templateId}/${id}/${Title}/build/basicdetails`)} className="text-black hover:bg-gray-300 flex bg-gray-200 justify-center items-center  h-10 w-10 rounded-full">
            <MdEdit/>
            </button>
            <button onClick={handleDelete} className="text-red-500 hover:bg-gray-300 flex justify-center items-center  bg-gray-200 h-10 w-10 rounded-full">
            <MdDelete/>
            </button>
        </div>

    </motion.div>
  );
};

export default UserResumeCards;
