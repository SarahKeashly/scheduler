// import React from "react";
import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewerid, setInterviewerid] = useState(props.interviewer || null);


  const reset = () => {
    setStudent(props.student || "");

    setInterviewerid(props.interviewer || null);
  };

  const cancel = function() {
    reset();
    props.onCancel();
  }

  const { interviewers } = props

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={props.student}

            /*
           This must be a controlled component
           your code goes here
         */
            value={student}
            onChange={(event) => setStudent(event.target.value)}

          />
        </form>
        <InterviewerList
          /* your code goes here */
          setInterviewer={(id) => setInterviewerid(id)}
          interviewers={interviewers}
          interviewer={interviewerid}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>

  )


}