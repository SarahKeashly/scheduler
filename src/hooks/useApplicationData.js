import { useEffect, useState } from "react";
import axios from "axios";

const useApplicationData = function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const promise1 = axios.get("/api/days");
    const promise2 = axios.get("/api/appointments");
    const promise3 = axios.get("/api/interviewers");

    Promise.all([promise1, promise2, promise3]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  //handles spots updating in the sidebar
  function newDays(days, appointments) {
    return days.map((day) => {
      let newSpots = 0;

      for (let i = 0; i < day.appointments.length; i++) {
        const appointmentsID = day.appointments[i];

        if (appointments[appointmentsID].interview === null) {
          newSpots++;
        }
      }

      return { ...day, spots: newSpots };
    });
  }

  //makes an axios put call and adds in the interview form
  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };

        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        setState({
          ...state,
          appointments,
          days: newDays(state.days, appointments),
        });
      });
  }

  //takes in id, sets state of interview to null, then sets state of appointments to null interview
  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      setState({
        ...state,
        appointments,
        days: newDays(state.days, appointments),
      });
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
