const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const app = express();

const YAML = require('json-to-pretty-yaml');
var path = require("path");
var fs = require("fs");

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Monitoring Server Running"));

//Define Routes
app.use("/experiment", require("./routes/experiment.route"));

// app.get("/experiment", (req, res) => {

//   const experiment = {
//     "version": "1.0.0",
//     "title": "Lets kill pods randomly",
//     "description": "If a random pod is killed, application should remain healthy.",
//     "tags": [
//       "k8s",
//       "pod",
//       "deployment"
//     ],
//     "steady-state-hypothesis": {
//       "title": "The app is healthy",
//       "probes": [
//         {
//           "name": "all-apps-are-healthy",
//           "type": "probe",
//           "tolerance": true,
//           "provider": {
//             "type": "python",
//             "func": "all_microservices_healthy",
//             "module": "chaosk8s.probes",
//             "arguments": {
//               "ns": "default"
//             }
//           }
//         }
//       ]
//     },
//     "method": [
//       {
//         "type": "action",
//         "name": "terminate-pod",
//         "provider": {
//           "type": "python",
//           "module": "chaosk8s.pod.actions",
//           "func": "terminate_pods",
//           "arguments": {
//             "rand": true,
//             "ns": "default"
//           }
//         },
//         "pauses": {
//           "after": 10
//         }
//       }
//     ]
//   }

//   const data = YAML.stringify(experiment);

//   var file_name = "output";
//   var file_content = data;
//   file_content = file_content.replace(/\n/g, "\r\n");
//   console.log("pathname", __dirname);
//   var stream = fs.createWriteStream(file_name + ".yaml");
//   stream.once("open", function () {
//     stream.write(file_content);
//     stream.end();
//   });

//   exec(
//     `chaos run output.yaml`,
//     (error, stdout, stderr) => {

//       if (error) {
//         res.json(error);
//       } else {
//         console.log(`stdout: ${stdout}`);
//         console.log(`stderr: ${stderr}`);
//         exec(
//           `chaos report --export-format=html5 journal.json report.html`,
//           (error, stdout, stderr) => {
//             if (error) {
//               res.json(error);
//             } else {
//               console.log(`stdout: ${stdout}`);
//               console.log(`stderr: ${stderr}`);
//               res.json("Report Generated");
//             }
//           }
//         );
//       }
//     }
//   );

// });

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => console.log(`Metrics Server started on port ${PORT}`));
