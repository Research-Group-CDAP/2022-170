import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExperimentReport from "./ExperimentReport";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: "#424242",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function ExperimentsAccordion(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <h4>Experiments - Random pod kill</h4>
      {props.experimentList.slice(-20).map((experiment, index) => {
        return (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            className={classes.root}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Typography className={classes.heading}>
                {moment(experiment.start).format("YYYY/MM/DD hh:mm")}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {experiment.status}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ExperimentReport report={experiment} />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
