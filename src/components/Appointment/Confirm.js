import React from "react";
import { Button } from "components/Button"


export default function Confirm(props) {


  return (

    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <button danger onClick={props.onCancel} >Cancel</button>
        <button danger onClick={props.onConfirm} >Confirm</button>
      </section>
    </main>

  )

}