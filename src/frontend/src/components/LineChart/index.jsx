import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      color: "white",
      fontSize: 40,
    },
  },
  scales: {
    yAxes: {
      ticks: {
        beginAtZero: true,
        color: "white",
        fontSize: 12,
      },
    },
    xAxes: {
      ticks: {
        beginAtZero: true,
        color: "white",
        fontSize: 12,
      },
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: [50, 60, 40, 70, 50, 40, 70, 50],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      textColor: "#ffffff",
    },
  ],
};

const LineChart = (props) => {
  return <Line options={options} data={data} />;
};

export default LineChart;
