import React from "react";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { Icon } from "@iconify/react";

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
                            <p>
                                <Icon
                                    icon="ic:baseline-local-offer"
                                    width={25}
                                /> chaoslib-version : {props.report["chaoslib-version"]}</p>
                            <p><Icon
                                icon="ic:baseline-device-hub"
                                width={25}
                            /> deviated : {props.report.deviated ? true : false}</p>
                            <p><Icon
                                icon="ic:baseline-mode-standby"
                                width={25}
                            /> duration : {props.report.duration}</p>
                            <p><Icon
                                icon="ic:outline-schedule"
                                width={25}
                            /> start : {props.report.start}</p>
                            <p><Icon
                                icon="ic:outline-schedule"
                                width={25}
                            /> end : {props.report.end}</p>
                            <p><Icon
                                icon="ic:baseline-mode-standby"
                                width={25}
                            /> status : {props.report.status}</p></CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <p><Icon
                                icon="ic:baseline-description"
                                width={25}
                            /> description : {props.report.experiment?.description}</p>
                            <p><Icon
                                icon="ic:baseline-drive-file-rename-outline"
                                width={25}
                            /> method : {props.report.experiment?.method[0].name}</p>
                            <p><Icon
                                icon="ic:round-shopping-bag"
                                width={25}
                            /> Effected Pod : {props.report.run[0]?.output[0]}</p>
                            <p><Icon
                                icon="ic:baseline-expand-circle-down"
                                width={25}
                            /> module : {props.report.experiment?.method[0].provider.module}</p>
                            <p><Icon
                                icon="ic:baseline-adjust"
                                width={25}
                            /> steady-state-hypothesis : {props.report.experiment["steady-state-hypothesis"].title}</p></CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <p><Icon
                                icon="ic:twotone-crop-square"
                                width={25}
                            /> node : {props.report.node}</p>
                            <p><Icon
                                icon="ic:baseline-drive-file-rename-outline"
                                width={25}
                            /> name_pattern : {props.report.experiment?.method[0].provider.arguments.name_pattern}</p>
                            <p><Icon
                                icon="ic:baseline-local-offer"
                                width={25}
                            /> platform : {props.report.platform}</p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </div>
    );
};

export default ExperimentReport;
