import React from 'react'
import { useParams } from 'react-router-dom';
import BasicDetails from './resume-details/BasicDetails';
import Education from './resume-details/Education';
import Internships from './resume-details/Internships'
import Experience from './resume-details/Experience';
import Projects from './resume-details/Projects';
import Skills from './resume-details/Skills';
import Achievments from './resume-details/Achievments';

function RenderForms() {
    const {detail} = useParams();

  return (
     <section className='col-span-12 md:col-span-10 overflow-y-scroll'>
        {
            detail === 'basicdetails' ? <BasicDetails/>
            : detail === 'education' ? <Education/>
            : detail === 'internships' ? <Internships/>
            : detail === 'experience' ? <Experience/>
            : detail === 'projects' ? <Projects/>
            : detail === 'skills' ? <Skills/>
            : detail === 'achievements' ? <Achievments/>
            : null
        }
     </section>
  )
}

export default RenderForms