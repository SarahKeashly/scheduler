
import { useEffect, useState } from "react";
import axios from "axios";

const useApplicationData = function() {

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


  function newDays(days, appointments) {
    console.log("DAYS/APP", days, appointments)
    // Considering the following day:
    // {
    //   id: 1,
    //   name: "Monday",
    //   appointments: [1,2,3,4,5]
    //   spots: 2
    // }

    // // Considering those appointments:
    // {
    //   1:{"id": 1, "time": "12pm", "interview": { ... }
    //   2:{"id": 2, "time": "1pm", "interview": null
    //   3:{"id": 3, "time": "2pm", "interview": { ... }
    //   4:{"id": 4, "time": "3pm", "interview": null
    //   5:{"id": 5, "time": "4pm", "interview": { ... }
    // }


    //if interview.interviewer = null then minus 1 from available spots (appointments length)
    return days.map((day) => {
      //day.interviews === [1,2,3,4,5]
      //appointments (line 43 to 50)

      let newSpots = 0;

      for (let i = 0; i < day.appointments.length; i++) {
        const appointmentsID = day.appointments[i]

        if (appointments[appointmentsID].interview === null) {
          newSpots++;
        }
      }

      return { ...day, spots: newSpots }

    }
    )

  }





  //makes an axios put call and adds in the interview form 
  function bookInterview(id, interview) {

    return axios.put(`/api/appointments/${id}`, { interview }).then((response) => {

      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      console.log("APP", appointment);

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      console.log("interview", interview.interviewer);
      console.log("appointments", appointments);
      console.log("NEWDAYS", newDays(state.days, appointments));


      setState({
        ...state,
        appointments,
        days: newDays(state.days, appointments)

      });

    })
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
        appointments,
        days: newDays(state.days, appointments)
      });


    })


  }
  return { state, setDay, bookInterview, cancelInterview }
}

export default useApplicationData;