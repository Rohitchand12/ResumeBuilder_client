import React, { useEffect } from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import { useForm } from "react-hook-form";
import EducationCard from "../ui/EducationCard";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import useUser from "../../hooks/useUser";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import useResume from "../../hooks/useResume";
import DeleteConfirmation from "../ui/DeleteConfirmation";
import { PulseLoader } from "react-spinners";
import Button from "../ui/Button";

const Education = () => {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
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
    reset(preLoadData);
  }, [preLoadData]);
  const currentResume = allResume?.find((resume) => resume.id === resumeId);

  async function submitHandler(data) {
    setModal(false);
    const docRef = doc(db, `users/${user.uid}/resumeCollection/${resumeId}`);
    const docData = await getDoc(docRef);
    const existingData = docData.data() || [];
    if (editing.value) {
      const educationData = [...existingData.EducationDetails];
      educationData[editing.currentIndex] = data;
      await updateDoc(docRef, { EducationDetails: educationData });
      toast.success("Modified Successfully", {
        containerId: "education-saved",
      });
    } else {
      const updatedData = existingData.EducationDetails
        ? [...existingData.EducationDetails, data]
        : [data];
      if (docData.exists()) {
        await updateDoc(docRef, { EducationDetails: updatedData });
        toast.success("Saved successfully", {
          containerId: "education-saved",
        });
      } else {
        await setDoc(docRef, {
          templateId,
          resumeName,
          EducationDetails: updatedData,
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
    const updatedData = existingData.EducationDetails.filter(
      (edu, ind) => ind !== index
    );
    await updateDoc(docRef, { EducationDetails: updatedData });
    queryClient.invalidateQueries(["users,resumes"]);
    setDeleteModal(false);
    toast.success("Deleted Successfully", {
      containerId: "deleted",
    });
  }

  function handleEdit(index) {
    setEditing({ value: true, currentIndex: index });
    setPreLoadData(currentResume.resumeData.EducationDetails[index]);
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
      className=" flex flex-col gap-4 overflow-x-hidden justify-start items-center py-10"
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
        <h1 className="text-xl font-semibold">Add Education</h1>
        <Button
        disabled={isSubmitting}
        name={isSubmitting ? "Saving..." : "Save and next"}
        onClick={() => {
          navigate(
            `/templates/${templateId}/${resumeId}/${resumeName}/build/internships`
          );
        }}
        classname={`bg-violet-500 disabled:bg-gray-500 text-white`}
      />

      </div>

      {isSubmitting ? (
        <div>
          <PulseLoader />
        </div>
      ) : (
        currentResume &&
        currentResume.resumeData.EducationDetails?.map((education, index) => {
          return (
            <EducationCard
              key={index}
              education={education}
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
              className="grid grid-cols-12 gap-2 px-10 py-10 max-h-[50vh] lg:h-auto lg:w-[800px]"
              onSubmit={handleSubmit(submitHandler)}
            >
              <Input
                label="Qualification"
                error={errors.qualification}
                placeholder="eg:Graduation"
                col="col-span-12"
                {...register("qualification", {
                  required: {
                    value: true,
                    message: "Qualification is required",
                  },
                })}
              />
              <Input
                label="Course"
                placeholder="eg: Btech"
                error={errors.course}
                col="col-span-12 lg:col-span-6"
                {...register("course", {
                  required: {
                    value: true,
                    message: "Course is required",
                  },
                })}
              />
              <Input
                label="Branch"
                placeholder="eg: Computer science"
                error={errors.branch}
                col="col-span-12 lg:col-span-6"
                {...register("branch", {
                  required: {
                    value: true,
                    message: "branch is required",
                  },
                })}
              />
              <Input
                label="Institute"
                placeholder="Institute name"
                error={errors.institute}
                col="col-span-12"
                {...register("institute", {
                  required: {
                    value: true,
                    message: "Institute is required",
                  },
                })}
              />
              <Input
                label="Grades CGPA/%"
                placeholder="grades"
                error={errors.grades}
                type="number"
                step="0.01"
                col="col-span-12 lg:col-span-4"
                {...register("grades", {
                  required: {
                    value: true,
                    message: "Grade is required",
                  },
                })}
              />
              <Input
                label="From year"
                placeholder="2018"
                error={errors.fromyear}
                type="number"
                col="col-span-6 lg:col-span-4"
                {...register("fromyear", {
                  required: {
                    value: true,
                    message: "From year is required",
                  },
                })}
              />
              <Input
                label="To year"
                placeholder="2019"
                error={errors.toyear}
                type="number"
                col="col-span-6 lg:col-span-4"
                {...register("toyear", {
                  required: {
                    value: true,
                    message: "To year is required",
                  },
                })}
              />
              <button
                disabled={isSubmitting}
                className="bg-violet-500 disabled:bg-violet-950 px-4 py-2 rounded-md lg:col-start-10 col-span-12 lg:col-span-3 text-white"
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

export default Education;
