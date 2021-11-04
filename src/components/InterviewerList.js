import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types';
import "components/InterviewerList.scss"


export default function InterviewerList({ interviewers, setInterviewer, interviewer }) {

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

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};