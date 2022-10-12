import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (props) => {
  const data = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        data: [props.active, props.inactive],
        backgroundColor: ["#90EE90", "#b5b5b5"],
        borderColor: ["#90EE90", "#b5b5b5"],
        borderWidth: 0,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DoughnutChart;
