import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = (props) => {
  const data = {
    labels: ["Running", "Inactive"],
    datasets: [
      {
        label: "# of Votes",
        data: [props.active,props.inactive],
        backgroundColor: [
          "#009614",
          "#403f3f",
        ],
        borderColor: [
          "#009614",
          "#403f3f",
        ],
        borderWidth: 0,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DoughnutChart;
