
import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";



import "./styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDITING";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



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

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }




  //transitions to DELETING, calls cancelInterview with props.id and then transitions to EMPTY
  function deleteInterview() {

    transition(DELETING, true)

    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(e => transition(ERROR_DELETE, true))

  }


  return (
    <article className="appointment">

      <Header time={props.time} />


      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview && props.interview.student}
          interviewer={props.interview && props.interview.interviewer}
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
          onCancel={back}
          message={"Are you sure you want to Delete?"}

        />
      )}

      {mode === DELETING && (
        <Status
          message={"Deleting"}
        />

      )}

      {mode === ERROR_SAVE && (
        <Error
          message='Could not Cancel Appointment'
          onClose={back}

        />)}

      {mode === ERROR_DELETE && (
        <Error
          message='Could not Cancel Appointment'
          onClose={back}
        />)}


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

