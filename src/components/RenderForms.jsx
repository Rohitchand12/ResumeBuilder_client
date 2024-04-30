import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import BasicDetails from "./resume-details/BasicDetails";
import Education from "./resume-details/Education";
import Internships from "./resume-details/Internships";
import Experience from "./resume-details/Experience";
import Projects from "./resume-details/Projects";
import Skills from "./resume-details/Skills";
import Achievments from "./resume-details/Achievments";
import { GiHamburgerMenu } from "react-icons/gi";

function RenderForms() {
  const { detail } = useParams();
  const [expand, setExpand] = useOutletContext();
  return (
    <section className="col-span-12 md:col-span-10 overflow-y-scroll">
      <GiHamburgerMenu onClick = {()=>setExpand(true)} className="ml-8 lg:hidden"/>
      {detail === "basicdetails" ? (
        <BasicDetails />
      ) : detail === "education" ? (
        <Education />
      ) : detail === "internships" ? (
        <Internships />
      ) : detail === "experience" ? (
        <Experience />
      ) : detail === "projects" ? (
        <Projects />
      ) : detail === "skills" ? (
        <Skills />
      ) : detail === "achievements" ? (
        <Achievments />
      ) : null}
    </section>
  );
}

export default RenderForms;
