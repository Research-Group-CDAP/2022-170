import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        backgroundColor: "#424242",
    },
    card: {
        backgroundColor: "#2D2D2D",
    }
}));

const ExperimentReport = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div>
                <h1>Chaos Engineering Report</h1>
            </div>
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <p>chaoslib-version : {props.report["chaoslib-version"]}</p>
                            <p>deviated : {props.report.deviated ? true : false}</p>
                            <p>duration : {props.report.duration}</p>
                            <p>start : {props.report.start}</p>
                            <p>end : {props.report.end}</p>
                            <p>status : {props.report.status}</p></CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <p>description : {props.report.experiment?.description}</p>
                            <p>method : {props.report.experiment?.method[0].name}</p>
                            <p>name_pattern : {props.report.experiment?.method[0].provider.arguments.name_pattern}</p>
                            <p>module : {props.report.experiment?.method[0].provider.module}</p>
                            <p>steady-state-hypothesis : {props.report.experiment["steady-state-hypothesis"].title}</p></CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </div>
    );
};

export default ExperimentReport;
