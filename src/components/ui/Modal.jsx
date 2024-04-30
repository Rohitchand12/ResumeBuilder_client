import React, {useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Modal = ({ children,isOpen,onClose }) => {
  const dialog = useRef();
  useEffect(()=>{
    if(isOpen)
    {
      dialog.current.showModal();
    }
    else{
      dialog.current.close()
    }
  },[isOpen])
  return createPortal(
    <motion.dialog
      key="modal-dialog"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{duration:0.2 , type:'spring'}}
      exit={{opacity:0,y:50}}
      ref={dialog}
      className="backdrop:bg-[rgba(0,0,0,0.6)] relative rounded-md font-mooli"
    >
      {children}
      <form onSubmit={onClose} method="dialog" className="absolute top-0 right-0">
        <button  className="px-4 py-2 rounded-full m-2 flex justify-center items-center bg-red-500 hover:bg-red-600 text-white">
          X
        </button>
      </form>
    </motion.dialog>,
    document.getElementById("modal-div")
  );
};

export default Modal;
