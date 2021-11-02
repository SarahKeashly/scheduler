
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "hooks/useVisualMode";



import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDITING";



export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //adds the interview info, transitions to SAVING then takes in bookInterview function and transitions it to SHOW - data persists 
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id, interview)

      .then(() => {
        transition(SHOW);
      })

    transition(EDIT);

  };






  //transitions to DELETING, calls cancelInterview with props.id and then transitions to EMPTY
  function deleteInterview() {

    transition(DELETING)
    props.cancelInterview(props.id)

      .then(() => {
        console.log("delete working");
        transition(EMPTY);
      })

  }




  return (
    <article className="appointment">

      <Header time={props.time} />


      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}


        />
      )}
      {mode === SAVING && (
        <Status
          onAdd={() => transition(SAVING)}
          message={"Saving"}
        />

      )}
      {mode === CONFIRM && (
        <Confirm
          onConfirm={deleteInterview}

        />
      )}

      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />

      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />

      )}


    </article>
  );


};

