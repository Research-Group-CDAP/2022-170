const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
var cron = require("node-cron");
const axios = require("axios");
const app = express();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Monitoring Main Backend Api Running"));

app.post("/restartmonitoringserver", (req, res) => {
  exec(`pm2 restart monitoring-server`, (error, stdout, stderr) => {
    if (error) {
      response.json({ connected: false });
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      res.json({ restart: true });
    }
  });
});

// cron.schedule("*/55 * * * *", async () => {
//   console.log("Running a cron job every 2 minutes | Timestamp : " + new Date());
//   cronJobforExperiments();
// });

app.post("/cronJobforExperiments/:userId", (req, res) => {
  console.log("------------cronJobforExperiments------------");
  axios
    .post("http://localhost:4004/experiment/executeRandomPodExperiment")
    .then((response) => {
      if (response.data.executed) {
        console.log("------------JSON Report Generated------------");
        axios
          .post("http://localhost:4004/experiment/saveToDatabase/" + req.params.userId)
          .then(() => {
            console.log("------------Save Experiment Results to Database------------");
            exec(
              `pm2 restart monitoring-server-cron-job`,
              (error, stdout, stderr) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(
                    "------------Restart Application Success------------"
                  );
                  res.json("Experiment Executed at " + new Date());
                }
              }
            );
          })
          .catch((error) => {
            console.log(error);
            res.json(error);
          });
      } else {
        console.log("Error");
        res.json(error);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

const cronJobforExperiments = async () => {
  console.log("------------cronJobforExperiments------------");
  axios
    .post("http://localhost:4004/experiment/executeRandomPodExperiment")
    .then((response) => {
      if (response.data.executed) {
        console.log("------------JSON Report Generated------------");
        axios
          .post("http://localhost:4004/experiment/saveToDatabase")
          .then(() => {
            console.log("------------Save Experiment Results to Database------------");
            exec(
              `pm2 restart monitoring-server-cron-job`,
              (error, stdout, stderr) => {
                if (error) {
                  console.log(error);
                } else {
                  console.log(
                    "------------Restart Application Success------------"
                  );
                }
              }
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("Error");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
