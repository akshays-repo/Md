import React from 'react';
import Dashboard_Content from '..';
import CardsSection from './cardsSection';
import PatientAppointment from './patientAppointmentSection';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
const Dashboard_Dashboard = () => {

    const Dashboard = () => {
    return (
      <div className="dashboard">
        <div>
          <CardsSection />
        </div>
        <div className="table-content-box">
            <h2>Patient Appointment</h2>
            <PatientAppointment/>
        </div>
      </div>
    );
  };
  return <Dashboard_Content content={Dashboard()} />;
};

export default Dashboard_Dashboard;
