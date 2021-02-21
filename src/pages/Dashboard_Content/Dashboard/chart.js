import React from 'react'
import { Line } from 'react-chartjs-2'

const data = {
  labels:[ 
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
],
  datasets: [
    {
        label: 'No of Patients',
        data: [12, 14, 5, 6, 3, ,8 ],
        fill: false,
        backgroundColor: 'rgb(95, 213, 237)',
        borderColor: 'rgba(95, 213, 237, 0.2)',
      },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const Graphs = () => (
  <>
    <Line data={data} options={options} />
  </>
)

export default Graphs
