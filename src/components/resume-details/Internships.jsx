import React, { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import useUser from "../../hooks/useUser";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useResume from "../../hooks/useResume";
import DeleteConfirmation from "../ui/DeleteConfirmation";
import { PulseLoader } from "react-spinners";
import InternshipCard from "../ui/InternshipCard";
import Button from "../ui/Button";

const Internships = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [preLoadData, setPreLoadData] = useState(null);
  const [editing, setEditing] = useState({
    value: false,
    currentIndex: -1,
  });
  const { data: user } = useUser();
  const { data: allResume } = useResume();
  const { templateId, resumeId, resumeName } = useParams();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { ...preLoadData },
  });
  useEffect(() => {
    console.log(preLoadData);
    reset(preLoadData);
  }, [preLoadData]);
  const currentResume = allResume?.find((resume) => resume.id === resumeId);
  
  async function submitHandler(data) {
    setModal(false);
    const docRef = doc(db, `users/${user.uid}/resumeCollection/${resumeId}`);
    const docData = await getDoc(docRef);
    const existingData = docData.data() || [];
    if (editing.value) {
      const internshipData = [...existingData.InternshipDetails];
      internshipData[editing.currentIndex] = data;
      await updateDoc(docRef, { InternshipDetails: internshipData });
      toast.success("Modified Successfully", {
        containerId: "education-saved",
      });
    } else {
      const updatedData = existingData.InternshipDetails
        ? [...existingData.InternshipDetails, data]
        : [data];
      if (docData.exists()) {
        await updateDoc(docRef, { InternshipDetails: updatedData });
        toast.success("Saved successfully", {
          containerId: "education-saved",
        });
      } else {
        await setDoc(docRef, {
          templateId,
          resumeName,
          InternshipDetails: updatedData,
        });
        toast.success("Saved successfully", {
          containerId: "education-saved",
        });
      }
    }
    queryClient.invalidateQueries(["users,resumes"]);
    setEditing({ value: false, currentIndex: -1 });
    setPreLoadData({});
  }

  async function deleteEducation(index) {
    const docRef = doc(db, `users/${user.uid}/resumeCollection/${resumeId}`);
    const docData = await getDoc(docRef);
    const existingData = docData.data();
    const updatedData = existingData.InternshipDetails.filter(
      (edu, ind) => ind !== index
    );
    await updateDoc(docRef, { InternshipDetails: updatedData });
    queryClient.invalidateQueries(["users,resumes"]);
    setDeleteModal(false);
    toast.success("Deleted Successfully", {
      containerId: "deleted",
    });
  }

  function handleEdit(index) {
    setEditing({ value: true, currentIndex: index });
    setPreLoadData(currentResume.resumeData.InternshipDetails[index]);
    setModal(true);
  }

  function handleClose() {
    setEditing({ value: false, currentIndex: -1 });
    setModal(false);
    setPreLoadData({});
  }
  function handleOpen() {
    setModal(true);
    reset({});
  }
  return (
    <motion.section
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
      }}
      initial="hidden"
      animate="visible"
      className="h-full flex flex-col gap-4 justify-start items-center py-10"
    >
      <div className="flex flex-col gap-3 justify-center items-center mb-3">
        <motion.button
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 },
          }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={handleOpen}
          className="bg-violet-500 text-2xl font-bold text-white h-20 w-20 rounded-full p-4 flex justify-center items-center"
        >
          +
        </motion.button>
        <h1 className="text-xl font-semibold">Add Internship</h1>
        <Button
            disabled={isSubmitting}
            name={isSubmitting ? "Saving..." : "Save and next"}
            onClick = {()=>{
              navigate(`/templates/${templateId}/${resumeId}/${resumeName}/build/experience`)
            }}
            classname={`bg-violet-500 disabled:bg-gray-500 text-white row-start-12 col-start-3 md:col-start-10 col-span-8 md:col-span-2`}
          />
      </div>
      {isSubmitting ? (
        <div>
          <PulseLoader />
        </div>
      ) : (
        currentResume &&
        currentResume.resumeData.InternshipDetails?.map((internship, index) => {
          return (
            <InternshipCard
              key={index}
              internship={internship}
              index={index}
              onDelete={() => {
                setDeleteModal(true);
                setDeleteIndex(index);
              }}
              onEdit={handleEdit}
              transition={{ delay: 0.1 * index }}
            />
          );
        })
      )}
      <AnimatePresence>
        {deleteModal && (
          <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)}>
            <DeleteConfirmation
              index={deleteIndex}
              onConfirm={deleteEducation}
              onClose={() => setDeleteModal(false)}
            />
          </Modal>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {modal && (
          <Modal isOpen={modal} onClose={handleClose}>
            <motion.form
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
              }}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-12 gap-2 px-10 py-10 h-auto lg:w-[800px]"
              onSubmit={handleSubmit(submitHandler)}
            >
              <Input
                label="Company/Organisation"
                error={errors.company}
                placeholder="Company name"
                col="col-span-12"
                isRequired="true"
                {...register("company", {
                  required: {
                    value: true,
                    message: "Company name is required",
                  },
                })}
              />

              <Input
                label="Role"
                placeholder="eg: Frontend developer"
                error={errors.role}
                col="col-span-12"
                isRequired="true"
                {...register("role", {
                  required: {
                    value: true,
                    message: "role is required",
                  },
                })}
              />
              <div className="col-span-6 lg:col-span-3 flex flex-col">
                <label>from</label>
                <input
                className="w-full py-4 px-4 outline-none focus:border-slate-400 border-2 border-gray-200 rounded-md"
                  type="date"
                  {...register("from", {
                    required: {
                      value: true,
                      message: "starting date is required",
                    },
                  })}
                />
              </div>
              <div className="col-span-6 lg:col-span-3 flex flex-col">
                <label>to</label>
                <input
                className="w-full py-4 px-4 outline-none focus:border-slate-400 border-2 border-gray-200 rounded-md"
                  type="date"
                  {...register("to", {
                    required: {
                      value: true,
                      message: "ending date is required",
                    },
                  })}
                />
              </div>
              <Input
                label="Certificate Link"
                placeholder="Link"
                error={errors.certificate}
                col="col-span-12 lg:col-span-6"
                {...register("certificate")}
              />
              <label>Description</label>
              <textarea
                className="w-full col-span-12 py-4 px-4 outline-none focus:border-slate-400 border-2 border-gray-200 rounded-md"
                placeholder="Enter points seperated by a fullstop ."
                {...register("description")}
              />
              <p className="col-span-12 text-gray-500 text-xs">
                <strong>Note : </strong>The ending of a sentence with fullstop
                will result to a new bulleted point in resume
              </p>
              <button
                disabled={isSubmitting}
                className="bg-violet-500 disabled:bg-violet-950 px-4 py-2 rounded-md col-start-10 col-span-3 text-white"
              >
                {editing.value && !isSubmitting
                  ? "Save changes"
                  : editing.value && isSubmitting
                  ? "Saving"
                  : isSubmitting
                  ? "Adding"
                  : "ADD"}
              </button>
            </motion.form>
          </Modal>
        )}
      </AnimatePresence>
      <ToastContainer containerId="education-saved" autoClose={1000} />
      <ToastContainer containerId="deleted" autoClose={1000} />
    </motion.section>
  );
};

export default Internships;
