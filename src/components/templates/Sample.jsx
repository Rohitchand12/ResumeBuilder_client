import React, { useEffect, useState } from "react";
import classes from "./Sample.module.css";
import useResume from "../../hooks/useResume";
import MainSpinner from "../MainSpinner";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/helpers";
import { splitSentences } from "../../utils/helpers";
import { DotLoader } from "react-spinners";
import { FaDownload } from "react-icons/fa";

function Sample() {
  const [downloading, setDownloading] = useState(false);
  const { data, isLoading } = useResume();
  const { resumeId } = useParams();
  const resumeInfo = data?.find((res) => res.id === resumeId);

  async function downloadPDF() {
    try {
      setDownloading(true);
      const response = await fetch("https://resumebuilder-server.onrender.com/generate", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(resumeInfo),
      });
      const pdf = await response.blob();
      const URL = window.URL.createObjectURL(pdf);
      const downloadLink = document.createElement("a");
      downloadLink.href = URL;
      downloadLink.setAttribute("download", "resume_file.pdf");
      document.body.appendChild(downloadLink);
      downloadLink.click();
    } catch (e) {
      console.log(e);
    } finally {
      setDownloading(false);
    }
  }
  if (isLoading) {
    return <MainSpinner pulse={true} />;
  }
  return (
    <main className={classes.main_container}>
      <div>
        <button
          disabled={downloading}
          onClick={downloadPDF}
          className="bg-violet-500 px-5 py-2 rounded-md text-white hover:bg-violet-600"
        >
          {downloading ? (
            <div className="flex gap-2 justify-center items-center">
              <DotLoader size={25}/> <span>Downloading...</span>
            </div>
          ) : (
            <div className="flex gap-2 justify-center items-center">
              <span>Download</span> <FaDownload/>
            </div>
            
          )}
        </button>
      </div>
      <section className={classes.resume_container}>
        {/* Introduction section */}
        <section className={classes.intro_section}>
          <div className={classes.left}>
            <h3 className={classes.bigger}>Rohit Chand</h3>
            <p>Computer science and engineering</p>
            <p>Graphic era hill university</p>
          </div>
          <div className={classes.right}>
            <a href="https://www.linkedin.com/in/rohit-chand-778b2921b/">
              Linkedin profile
            </a>
            <a>Github profile </a>
            <a>rohitchand490@gmail.com</a>
          </div>
        </section>

        {/* education section */}
        {resumeInfo?.resumeData?.EducationDetails ? (
          <section className={classes.education_section}>
            <div
              style={{ gridColumn: "span 12" }}
              className={classes.rule}
            ></div>
            {/* heading section  */}
            <div
              style={{ fontWeight: "bold" }}
              className={classes.education_qualification}
            >
              Qualification
            </div>
            <div
              style={{ fontWeight: "bold" }}
              className={classes.education_university}
            >
              University
            </div>
            <div
              style={{ fontWeight: "bold" }}
              className={classes.education_year}
            >
              Year
            </div>
            <div
              style={{ fontWeight: "bold" }}
              className={classes.education_grade}
            >
              CGPA/%
            </div>

            <div
              style={{ gridColumn: "span 12" }}
              className={classes.rule}
            ></div>
            {resumeInfo.resumeData.EducationDetails.map((edu, index) => {
              return (
                <>
                  <div className={classes.education_qualification}>
                    {edu.qualification}
                  </div>
                  <div className={classes.education_university}>
                    {edu.institute}
                  </div>
                  <div
                    className={classes.education_year}
                  >{`${edu.fromyear}-${edu.toyear}`}</div>
                  <div className={classes.education_grade}>{edu.grades}</div>
                </>
              );
            })}
            <div
              style={{ gridColumn: "span 12" }}
              className={classes.rule}
            ></div>
          </section>
        ) : null}

        {/* Internship section  */}
        {resumeInfo?.resumeData?.InternshipDetails ? (
          <section>
            <header>INTERNSHIPS</header>
            <div className={classes.rule}></div>
            <div>
              {resumeInfo.resumeData.InternshipDetails.map(
                (internship, index) => {
                  return (
                    <div key={index} style={{ marginTop: "10px" }}>
                      <div className={classes.experience_heading}>
                        <h1
                          style={{ fontWeight: "bold" }}
                        >{`${internship.role}, ${internship.company}`}</h1>
                        <p>
                          <i>{`${formatDate(internship.from)}-${formatDate(
                            internship.to
                          )}`}</i>
                        </p>
                      </div>
                      <ul
                        className={classes.internship_desc}
                        style={{ listStyle: "disc", paddingLeft: "10px" }}
                      >
                        {internship.description &&
                          splitSentences(internship.description).map(
                            (desc, index) => <li key={index}>{desc}</li>
                          )}
                      </ul>
                    </div>
                  );
                }
              )}
            </div>
          </section>
        ) : null}

        {/* Experience section  */}
        {resumeInfo?.resumeData?.experienceDetails ? (
          <section className={classes.experience_section}>
            <header>EXPERIENCE</header>
            <div className={classes.rule}></div>
            <div>
              {dummyInternships.map((internship, index) => {
                return (
                  <div key={index} style={{ marginTop: "10px" }}>
                    <div className={classes.experience_heading}>
                      <h1 style={{ fontWeight: "bold" }}>{internship.title}</h1>
                      <p>
                        <i>{internship.duration}</i>
                      </p>
                    </div>
                    <ul style={{ listStyle: "disc", paddingLeft: "10px" }}>
                      {internship.desc.map((data, ind) => {
                        return <li key={ind}>{data}</li>;
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}

export default Sample;
