import React, { forwardRef } from "react";
import { motion } from "framer-motion";
const Input = ({ label, classname, isRequired, col, error, ...props }, ref) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={`mb-2 lg:mb-8 text-sm ${col}`}
    >
      <label htmlFor={label} className="font-semibold">
        {label}
        {isRequired && <span className="text-red-500">*</span>}
      </label>

      <input
        ref={ref}
        id={label}
        className={`w-full py-4 px-4 outline-none focus:border-slate-400 border-2 border-gray-200 rounded-md ${classname}`}
        {...props}
      />

      {error && <p className="text-xs text-red-500">{error?.message}</p>}
    </motion.div>
  );
};

export default forwardRef(Input);
