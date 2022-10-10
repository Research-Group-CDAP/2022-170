import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Icon } from "@iconify/react";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    '&:hover': {
      background: "#787878",
      cursor: 'default'
    }
  },
  labelGreen: {
    color: "#90EE90",
  },
  labelRed: {
    color: "#ed1515",
  },
  expandRow:{
    background:"#343434"
  }
});

function createData(
  name,
  namespace,
  startTime,
  status,
  cpu,
  memory,
  podHash,
  node,
  kind,
  apiVersion,
  uid,
  resourceVersion,
  dnsPolicy
) {
  return {
    name,
    namespace,
    startTime,
    status,
    cpu,
    memory,
    podHash,
    node,
    kind,
    apiVersion,
    uid,
    resourceVersion,
    dnsPolicy,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.namespace}</TableCell>
        <TableCell align="right">{row.startTime}</TableCell>
        <TableCell align="right">
          {row.status === "Running" ? (
            <span className={classes.labelGreen}>{row.status}</span>
          ) : (
            <span className={classes.labelRed}>Failed</span>
          )}
        </TableCell>
      </TableRow>
      <TableRow className={classes.expandRow}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <p><Icon icon="carbon:cloud-service-management" width={20} /> name : {row.name}</p>
                  <p><Icon icon="ic:baseline-drive-file-rename-outline" width={20} /> namespace : {row.namespace}</p>
                  <p><Icon icon="bx:time-five" width={20} /> startTime : {row.startTime}</p>
                  <p><Icon icon="heroicons-solid:status-online" width={20} /> status : {row.status}</p>
                  <p><Icon icon="akar-icons:laptop-device" width={20} /> cpu : {row.cpu}</p>
                  <p><Icon icon="ic:baseline-memory" width={20} /> memory : {row.memory}</p>
                  <p><Icon icon="fa6-solid:circle-nodes" width={20} /> node : {row.node}</p>
                </Grid>
                <Grid item xs={6}>
                  <p><Icon icon="eos-icons:api-outlined" width={20} /> apiVersion : {row.apiVersion}</p>
                  <p><Icon icon="charm:key" width={20} /> uid : {row.uid}</p>
                  <p><Icon icon="mingcute:version-fill" width={20} /> resourceVersion : {row.resourceVersion}</p>
                  <p><Icon icon="carbon:policy" width={20} /> dnsPolicy : {row.dnsPolicy}</p>
                  <p><Icon icon="fa-brands:slack-hash" width={20} /> podHash : {row.podHash}</p>
                  <p><Icon icon="icon-park-twotone:setting-web" width={20} /> kind :{row.kind}</p>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable(props) {
  let rows = props.serviceList.map((service) => {
    return createData(
      service.name,
      service.namespace,
      service.startTime,
      service.status,
      service.cpu,
      service.memory,
      service.podHash,
      service.node,
      service.kind,
      service.apiVersion,
      service.uid,
      service.resourceVersion,
      service.dnsPolicy
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Namespace</TableCell>
            <TableCell align="right">Started</TableCell>
            <TableCell align="right">status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
