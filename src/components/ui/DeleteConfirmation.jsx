import React from "react";
import { motion } from "framer-motion";
const DeleteConfirmation = ({ onConfirm, onClose, index }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5 w-[500px]">
      <h1>Are you sure ?</h1>
      <div className="flex gap-5">
        <motion.button
          whileHover={{ backgroundColor: "#5b21b6" }}
          transition={{ duration: 0.2 }}
          className="bg-violet-500 px-4 py-2 text-white rounded-md"
          onClick={onClose}
        >
          No
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: "#5b21b6" }}
          transition={{ duration: 0.2 }}
          className="bg-violet-500 px-4 py-2 text-white rounded-md"
          onClick={() => onConfirm(index)}
        >
          Yes
        </motion.button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
