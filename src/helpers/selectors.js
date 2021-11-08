//... returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  //filters the days and checks to see if current day is equal to the day that it is being passed
  const filteredDay = state.days.find((currentDay) => currentDay.name === day);

  //if 0th index is not equal return empty array
  if (!filteredDay) {
    return [];
  }

  //map through the filteredDay appointment and return the state.appointments appointmentid
  const dailyAppointments = filteredDay.appointments.map((appointmentid) => {
    return state.appointments[appointmentid];
  });

  return dailyAppointments;
}

// { student: "Archie Cohen", interviewer: 2 }

// {
//   id: 2,
//   name: "Tori Malcolm",
//   avatar: "https://i.imgur.com/Nmx0Qxo.png"
// }

// { student: "Archie Cohen", interviewer: {
//   id: 2,
//   name: "Tori Malcolm",
//   avatar: "https://i.imgur.com/Nmx0Qxo.png"
// } }

//copies the original object and returns it with the interviewer object
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];

  return { ...interview, interviewer };
}

//... returns an array of interviews for that day
export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find((currentDay) => currentDay.name === day);

  if (!filteredDay) {
    return [];
  }

  const dailyAppointments = filteredDay.interviewers.map((appointmentid) => {
    return state.interviewers[appointmentid];
  });

  return dailyAppointments;
}
