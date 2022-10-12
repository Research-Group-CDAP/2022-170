const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
// const connectDB = require("./config/db");

const app = express();
//Connect Database
// connectDB();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Monitoring Server Running"));

app.get("/experiment", (req, res) => {
    exec(
        `chaos run experimentTemplates/randompodterm.yaml`,
        (error, stdout, stderr) => {
          if (error) {
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        }
    );
});

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`Metrics Server started on port ${PORT}`));
