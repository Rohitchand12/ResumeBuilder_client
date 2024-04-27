import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import { useNavigate ,useLocation} from "react-router-dom";
import MainSpinner from "./MainSpinner";

const Protected = ({ children }) => {
  const { data, isLoading } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!isLoading && !data) {
      navigate("/login" , {state :{prevPath : location.pathname}});
    }
  }, [data, isLoading]);

  return <>{isLoading ? <MainSpinner/> : children}</>;
};

export default Protected;
