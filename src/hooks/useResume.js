import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import useUser from "./useUser";


const useResume = () => {
  const { data: user } = useUser();
  // const {userResumes,updateUserResumes} = useContext(ResumeContext);
  const { data, isLoading } = useQuery({
    queryKey: ["users", "resumes"],
    queryFn: async () => {
      try {
        const resumeColRef = collection(
          db,
          `users/${user.uid}/resumeCollection`
        );
        const docSnap = await getDocs(resumeColRef);
        const allResumes = docSnap.docs.map((doc) => {
          const docData = {...doc.data()};
          return {
            id: doc.id,
            resumeData : docData
          }
        });
        return allResumes;
      } catch (err) {
        throw err;
      }
    },
  });
  return {data,isLoading};
};
export default useResume;
