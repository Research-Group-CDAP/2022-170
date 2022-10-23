const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

//Using Cors
app.use(cors());

//Init Middleware( include  bodyparser through express)
app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("Clutser Service Backend Api Running"));

app.post("/install/istio", (req, res) => {
    exec(
        `istioctl install --set profile=demo -y`,
        (error, stdout, stderr) => {
            if (error) {
                response.json({ installed: false });
            } else {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                res.json({ installed: true });
            }
        }
    );
});

app.post("/uninstall/istio", (req, res) => {
    exec(
        `istioctl uninstall --purge`,
        (error, stdout, stderr) => {
            if (error) {
                console.log(error);
                res.json({ uninstalled: false });
            } else {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                res.json({ uninstalled: true });
            }
        }
    );
});

app.post("/services/clusteripsandloadbalancer", (req, res) => {
    exec(
        `kubectl get services -o JSON`,
        (error, stdout, stderr) => {
            if (error) {
                response.json({ installed: false });
            } else {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                res.json({ list: JSON.parse(stdout).items });
            }
        }
    );
});

app.post("/configure/prometheus", (req, res) => {
    exec(
        `kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.15/samples/addons/prometheus.yaml`,
        (error, stdout, stderr) => {
            if (error) {
                res.json({ configured: false });
            } else {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                res.json({ configured: true });
            }
        }
    );
});

app.post("/active/prometheus", (req, res) => {
    exec(
        `istioctl dashboard prometheus`,
        (error, stdout, stderr) => {
            if (error) {
                res.json({ active: false });
            } else {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                res.json({ active: true });
            }
        }
    );
});

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));