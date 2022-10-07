import { Chip, Divider, Typography } from "@material-ui/core";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineSeparator,
} from "@mui/lab";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";

import moment from "moment";
import React from "react";

const ServiceInfo = (props) => {
  return (
    <>
      <Typography variant="h6">
        Container Information{" "}
        <Chip
          variant="outlined"
          size="small"
          label={props.service._id ? props.service._id.toUpperCase() : ""}
        />
      </Typography>
      <Divider />
      <Typography variant="body2">
        Container Name: {props.service.serviceName ? props.service.serviceName : ""}
      </Typography>

      {props.service.status ? (
        <Typography variant="body2">
          Status:{" "}
          <span
            style={{
              color:
                props.service.status === "Building" || props.service.status === "Waiting"
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
      <Typography variant="body2">
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
      <Typography variant="body2">
        Created At:{" "}
        {props.service.createdAt ? <>{moment(props.service.createdAt).format("llll")}</> : ""}
      </Typography>
      <Typography variant="body2">
        Updated At:{" "}
        {props.service.updatedAt ? <>{moment(props.service.updatedAt).format("llll")}</> : ""}
      </Typography>
      <Typography variant="body2">
        Description: {props.service.moreInformation ? <>{props.service.moreInformation}</> : ""}
      </Typography>
      <Divider />
      <Typography variant="body1">Releases</Typography>
      <Timeline
        position="right"
        sx={{
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {props.service.releases &&
          props.service.releases.length > 0 &&
          props.service.releases.map((item) => (
            <TimelineItem key={item._id}>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot>
                  <RocketLaunchIcon />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Typography variant="body2">Version: {item.version}</Typography>
                <Typography variant="body2">Image Name: {item.imageName}</Typography>
                <Typography variant="body2">
                  Relase Date: {moment(item.releaseDateTime).format("YYYY-MM-DD")}
                </Typography>
                <Typography variant="body2">
                  Build Time: {moment(item.buildEndTime).diff(item.buildStartTime, "seconds")}s
                </Typography>
                <Typography variant="body2">
                  Push Time: {moment(item.pushEndTime).diff(item.pushStartTime, "milliseconds")}ms
                </Typography>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
      <code style={{ color: "#fff" }}>
        <pre>{JSON.stringify(props.service.deploymentInfo, null, 2)}</pre>
      </code>
    </>
  );
};

export default ServiceInfo;
