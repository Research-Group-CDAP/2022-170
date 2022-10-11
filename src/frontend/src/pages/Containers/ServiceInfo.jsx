import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Typography,
} from "@material-ui/core";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import moment from "moment";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  maxBarThickness: 40,
  maintainAspectRatio: true,
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

const labels = [""];

const ServiceInfo = (props) => {
  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Typography variant="h6" style={{ fontWeight: "bolder" }}>
        Container Information{" "}
        <Chip
          variant="outlined"
          size="small"
          label={props.service._id ? props.service._id.toUpperCase() : ""}
        />
      </Typography>
      <Divider />
      <Typography variant="subtitle1">
        Container Name:{" "}
        {props.service.serviceName ? props.service.serviceName : ""}
      </Typography>

      {props.service.status ? (
        <Typography variant="subtitle1">
          Status:{" "}
          <span
            style={{
              color:
                props.service.status === "Building" ||
                props.service.status === "Waiting"
                  ? "#ffa000"
                  : props.service.status === "In-Progress"
                  ? "#29b6f6"
                  : props.service.status === "Pushing"
                  ? "#dce775"
                  : props.service.status === "Release-Completed"
                  ? "#4caf50"
                  : props.service.status === "Push-Completed"
                  ? "#8bc34a"
                  : props.service.status === "Failed"
                  ? "#ff3d00"
                  : "white",
            }}
          >
            {props.service.status}
          </span>
        </Typography>
      ) : (
        ""
      )}
      <Typography variant="subtitle1">
        Latest Tag:{" "}
        {props.service.latestTag ? (
          <Chip
            size="small"
            variant="outlined"
            label={<strong>{props.service.latestTag}</strong>}
          />
        ) : (
          ""
        )}
      </Typography>
      <Typography variant="subtitle1">
        Created At:{" "}
        {props.service.createdAt ? (
          <>{moment(props.service.createdAt).format("llll")}</>
        ) : (
          ""
        )}
      </Typography>
      <Typography variant="subtitle1">
        Updated At:{" "}
        {props.service.updatedAt ? (
          <>{moment(props.service.updatedAt).format("llll")}</>
        ) : (
          ""
        )}
      </Typography>
      <Typography variant="subtitle1">
        Description:{" "}
        {props.service.moreInformation ? (
          <>{props.service.moreInformation}</>
        ) : (
          ""
        )}
      </Typography>
      <Divider style={{ marginBottom: 10 }} />
      {props.service.releases &&
        props.service.releases.length > 0 &&
        props.service.releases.map((release, index) => (
          <Accordion
            expanded={expanded === release._id}
            onChange={handleChange(release._id)}
            elevation={5}
            style={{ width: "100%" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Icon icon="octicon:container-24" width={23} />
              <Typography style={{ marginLeft: 5 }}>
                {props.service.serviceName}
              </Typography>
              <Chip
                size="small"
                variant="outlined"
                style={{ marginLeft: 20, marginRight: 10 }}
                label={<strong>{release.version}</strong>}
              />
              <Chip
                icon={<AccessTimeIcon style={{ width: 16 }} />}
                size="small"
                variant="default"
                style={{ marginRight: 20 }}
                label={
                  moment(release.releaseDateTime).format("L") +
                  " " +
                  moment(release.releaseDateTime).format("LT")
                }
              />
              {props.service.latestTag === release.version && (
                <RocketLaunchIcon color="success" />
              )}
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ width: "100%" }}>
                <Typography variant="subtitle2">
                  Build Start Time:{" "}
                  {moment(release.buildStartTime).format("LTS")}
                </Typography>
                <Typography variant="subtitle2">
                  Build End Time: {moment(release.buildEndTime).format("LTS")}
                </Typography>
                <Typography variant="subtitle2">
                  Push Start Time: {moment(release.pushStartTime).format("LTS")}
                </Typography>
                <Typography variant="subtitle2">
                  Push End Time: {moment(release.pushEndTime).format("LTS")}
                </Typography>
                <Bar
                  options={options}
                  data={{
                    labels,
                    datasets: [
                      {
                        label: "Push Time (milli seconds)",
                        data: [
                          moment(release.pushEndTime).diff(
                            release.pushStartTime,
                            "milliseconds"
                          ),
                        ],
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                      },
                      {
                        label: "Build Time (seconds)",
                        data: [
                          moment(release.buildEndTime).diff(
                            release.buildStartTime,
                            "seconds"
                          ),
                        ],
                        borderColor: "rgb(53, 162, 235)",
                        backgroundColor: "rgba(53, 162, 235, 0.5)",
                      },
                    ],
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                >
                  <Button
                    autoFocus
                    // onClick={props.handleClose}
                    variant="contained"
                    color="primary"
                    size="small"
                    disableElevation
                    style={{ marginRight: 10, marginTop: 10 }}
                    endIcon={<RocketLaunchIcon />}
                  >
                    Make a new release
                  </Button>
                </Box>
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
    </>
  );
};

export default ServiceInfo;
