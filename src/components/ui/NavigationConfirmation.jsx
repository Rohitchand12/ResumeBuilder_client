import React from "react";
import { motion } from "framer-motion";
import { PuffLoader } from "react-spinners";
function NavigationConfirmation({ onConfirm, onClose, isSubmitting}) {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5 min-h-[200px] w-[500px]">
      {isSubmitting ? (
        <PuffLoader />
      ):(
        <>
          <h1>Do you want to save the changes?</h1>
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
              onClick={onConfirm}
            >
              Yes
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

export default NavigationConfirmation;
