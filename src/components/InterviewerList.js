import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"


export default function InterviewerList({ interviewers, setInterviewer, interviewer }) {

  console.log("interviewers", interviewers)
  console.log("setInterviewer", setInterviewer);
  console.log("interviewer", interviewer);

  const interviewees = interviewers.map((item) => {
    return (
      <InterviewerListItem
        key={item.id}
        name={item.name}
        avatar={item.avatar}
        selected={item.id === interviewer}
        setInterviewer={() => setInterviewer(item.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewees}
      </ul>


    </section>
  )

}