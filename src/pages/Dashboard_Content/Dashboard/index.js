import React from 'react';
import Dashboard_Content from '..';
import CardsSection from './cardsSection';
import PatientAppointment from './patientAppointmentSection';
import { actionCreator } from '../../../reducers/actionCreator';
import { store } from '../../../reducers/configureStore';
import { connect } from 'react-redux';
import { Col, Row } from 'antd';
import Graphs from './chart';
const Dashboard_Dashboard = () => {

    const Dashboard = () => {
    return (
      <div className="dashboard">
         <div>
           <h5> STATS  {' '} <i class="fas fa-chart-bar pl2"/> </h5> 
          </div>
        <Row>
 
          <Col xl={12}>
          <div className="chartBlock">

          <Graphs/>
          </div>

          </Col>

          <Col xl={12}>
            <div className="countBlock">
          <CardsSection />
          </div>
          </Col>

        </Row>

        <div>
          
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
