import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
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

const LineChart = (props) => {
  const [labelData, setLabelData] = useState([]);
  const [datasetData, setDatasetData] = useState([]);
  const [predictDatasetData, setPredictDatasetData] = useState([]);

  useEffect(() => {
    let tempLabelData = [];
    let tempDatasetData = [];

    props.timeSeriesData.slice(-20).forEach((singleData, index) => {
      tempLabelData.push(singleData.timestamp);
    });
    props.predictedValues.slice(-20).forEach((singleData) => {
      tempDatasetData.push(singleData);
    });
    setLabelData(tempLabelData);
    setPredictDatasetData(tempDatasetData);
  }, [props.predictedValues]);

  useEffect(() => {
    let tempLabelData = [];
    let tempDatasetData = [];

    props.timeSeriesData.slice(-13).forEach((singleData, index) => {
      tempLabelData.push(singleData.timestamp);
      tempDatasetData.push(singleData.value);
    });

    setLabelData(tempLabelData);
    setDatasetData(tempDatasetData);
  }, [props.timeSeriesData]);

  const labels = labelData;

  const data = {
    labels,
    datasets: [
      {
        label: props.titlePredicted,
        data: predictDatasetData,
        borderColor: "#008558",
        backgroundColor: "#008558",
        textColor: "#ffffff",
      },
      {
        label: props.title,
        data: datasetData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        textColor: "#ffffff",
      },
    ],
  };
  return (
    <div>
      <Line options={options} data={data} /> <br />{" "}
      {!predictDatasetData.length && (
        <div>
           Analyzing On Progress{" "}
          <LinearProgress />
        </div>
      )}{" "}
    </div>
  );
};

export default LineChart;
