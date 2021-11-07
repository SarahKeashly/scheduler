
import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewerid, setInterviewerid] = useState(props.interviewer || null);
  const [error, setError] = useState("");


  function validate() {

    if (interviewerid === null) {
      setError("Interviewer name cannot be blank");
      return;
    }

    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(student, interviewerid);



  }


  const reset = () => {
    setStudent(props.student || "");

    setError("");
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
            placeholder="Enter Student Name"

            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"

          />

          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          setInterviewer={(id) => setInterviewerid(id)}
          interviewers={interviewers}
          interviewer={interviewerid}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>

  )


}
