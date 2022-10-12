const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

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

//Define Routes

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));