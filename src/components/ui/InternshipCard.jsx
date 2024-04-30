import React from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { formatDate } from "../../utils/helpers";
import { splitSentences } from "../../utils/helpers";
function InternshipCard({ internship, index, onDelete, onEdit, ...props }) {
    console.log(splitSentences(internship.description));
  return (
    <motion.div
      {...props}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      className="grid grid-cols-12 rounded-lg px-5 py-5 w-[90%] lg:w-[80%] shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
    >
      <div className="flex flex-col col-span-9 gap-3 ">
        <h1 className="text-xl lg:text-2xl font-extrabold text-violet-600">
          {internship.company}
        </h1>
        <h2 className="text-base lg:text-xl font-semibold">{`${internship.role}`}</h2>
        <h2 className="text-sm font-semibold text-blue-500">
          <a
            href={internship.certificate}
            target="_blank"
          >certificate</a>
        </h2>
        <div className="block lg:hidden text-sm place-items-center">{`${formatDate(
          internship.from
        )} to ${formatDate(internship.to)}`}</div>
        <ul className="hidden lg:block list-disc list-inside pl-[10px]">
          {internship.description &&
            splitSentences(internship.description).map((desc, index) => (
              <li key={index}>{desc}</li>
            ))}
        </ul>
      </div>
      <div className="grid col-span-3 gap-5">
        <div className="hidden lg:grid text-sm place-items-center">{`${formatDate(
          internship.from
        )} to ${formatDate(internship.to)}`}</div>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5">
          <button
            onClick={() => onEdit(index)}
            className="text-xl text-violet-500 h-10 w-10 rounded-full flex items-center justify-center bg-gray-200"
          >
            <MdEdit />
          </button>
          <button
            onClick={() => onDelete(index)}
            className="text-red-500 text-xl h-10 w-10 rounded-full flex items-center justify-center bg-gray-200"
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default InternshipCard;
