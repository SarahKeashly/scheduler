// import React from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import React, { useState } from "react";
import "components/Appointment";
import Appointment from "components/Appointment";
import axios from "axios";
import { useEffect } from "react";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview, getInterviewersForDay } from "helpers/selectors";



export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });


  useEffect(() => {
    const promise1 = axios.get('/api/days');
    const promise2 = axios.get('/api/appointments');
    const promise3 = axios.get('/api/interviewers');

    Promise.all([promise1, promise2, promise3])
      .then((all) => {
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setState(prev => ({ ...prev, days, appointments, interviewers }))
      })

  }, []);



  //makes an axios put call and adds in the interview form 
  function bookInterview(id, interview) {

    return axios.put(`/api/appointments/${id}`, { interview }).then((response) => {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      setState({
        ...state,
        appointments
      });

    })
      .catch((e) => console.log("something went wrong"))
  }

  //takes in id, sets state of interview to null, then sets state of appointments to null interview
  function cancelInterview(id) {

    return axios.delete(`/api/appointments/${id}`).then((response) => {


      const appointment = {
        ...state.appointments[id],
        interview: null
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };


      setState({
        ...state,
        appointments
      });


    })


  }



  const inteviewers = getInterviewersForDay(state, state.day);


  const appointments = getAppointmentsForDay(state, state.day);
  const listOfAppointments = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={inteviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">

        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />


      </section>
      <section className="schedule">

        <ul>{listOfAppointments}</ul>

      </section>
    </main>
  );
}
