import React from 'react';
import Dashboard_Content from '..';
import CardsSection from './cardsSection';
import PatientAppointment from './patentAppointmentSection';
const Dashboard_Dashboard = () => {

    const Dashboard = () => {
    return (
      <div className="dashboard">
        <div>
          <CardsSection />
        </div>
        <div>
            <h3>Patient Appointment</h3>
            <PatientAppointment/>
        </div>
      </div>
    );
  };
  return <Dashboard_Content content={Dashboard()} />;
};

export default Dashboard_Dashboard;
