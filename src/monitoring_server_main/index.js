const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
var cron = require("node-cron");
const axios = require('axios');
const app = express();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Monitoring Main Backend Api Running"));

app.post("/restartmonitoringserver", (req, res) => {
    exec(
        `pm2 restart monitoring-server`,
        (error, stdout, stderr) => {
          if (error) {
            response.json({ connected: false });
          } else {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            res.json({ restart: true });
          }
        }
      );
});

cron.schedule("*/1 * * * *", async () => {
  console.log("Running a cron job every 1 minutes | Timestamp : " + new Date());
});

const cronJobforExperiments = async () => {
  console.log("------------cronJobforExperiments------------");
  axios.post('http://localhost:4001/experiment/executeRandomPodExperiment').then(()=>{

  }).catch((error)=>{
    console.log(error)
  })
};

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));