import React from "react";


export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day

  //filters the days and checks to see if current day is equal to the day that it is being passed
  const filteredDay = state.days.find(currentDay => (currentDay.name === day));

  //if 0th index is not equal return empty array
  if (!filteredDay) {
    return [];
  }

  //map through the 0th indexed filteredDay appointment and return the state.appointments appointmentid
  const dailyAppointments = filteredDay.appointments.map(appointmentid => {
    return state.appointments[appointmentid];

  });

  return dailyAppointments;

}