const k8s = require("@kubernetes/client-node");
const express = require("express");
const cors = require("cors");
const { X509Certificate } = require("crypto");
const fs = require("fs");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);

app.get("/", (_, res, next) => {
  res.status(200).json({ message: "Node JS server" });
  next();
});

app.post("/create/pv", (req, res, next) => {
  k8sApi
    .createPersistentVolume({
      apiVersion: "v1",
      metadata: {
        name: "docker-repo-pv",
      },
      spec: {
        capacity: { storage: "1Gi" },
        accessModes: ["ReadWriteOnce"],
        hostPath: { path: "/tmp/repository" },
      },
    })
    .then((data) => {
      res.status(201).json({ data: data.body, response: data.response });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

app.post("/create/pvc", (req, res, next) => {
  k8sApi
    .createNamespacedPersistentVolumeClaim("default", {
      apiVersion: "v1",
      kind: "PersistentVolumeClaim",
      metadata: {
        name: "docker-repo-pvc",
      },
      spec: {
        accessModes: ["ReadWriteOnce"],
        resources: {
          requests: { storage: "1Gi" },
        },
      },
    })
    .then((data) => {
      res.status(201).json({ data: data.body, response: data.response });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

app.get("/nodes", (req, res, next) => {
  k8sApi
    .listNode()
    .then((data) => {
      data.body.items.map((item) => {
        console.log(item.status.addresses);
      });
      res.status(200).json({ data: data.body.items });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

app.get("/pods/:namespace", (req, res, next) => {
  k8sApi
    .listNamespacedPod(req.params.namespace)
    .then(async (data) => {
      let tempArray = [];

      await data.body.items.forEach((singlePod) => {
        let tempObject = {
          name: "",
          nodeName: "",
          hostIP: "",
          podIP:"",
          containerImage:"",
          namespace:"",
          status:"",
          startTime:""
        };
        tempObject.name = singlePod.metadata.name;
        tempObject.nodeName = singlePod.spec.nodeName;
        tempObject.hostIP = singlePod.status.hostIP;
        tempObject.podIP = singlePod.status.podIP;
        tempObject.containerImage = singlePod.spec.containers[0].image;
        tempObject.namespace = singlePod.metadata.namespace;
        tempObject.status = singlePod.status.phase;
        tempObject.startTime = singlePod.status.startTime;
        tempArray.push(tempObject);
      });
      await res.status(200).json(tempArray);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

app.get("/services/:namespace", (req, res, next) => {
  k8sApi
  .listNamespacedPod(req.params.namespace)
    .then(async (data) => {
      let tempArray = [];

      await data.body.items.forEach((singleService) => {
        let tempObject = {
          name: "",
          namespace:"",
          status:"",
          startTime:""
        };
        tempObject.name = singleService.metadata.labels.app;
        tempObject.namespace = singleService.metadata.namespace;
        tempObject.status = singleService.status.phase;
        tempObject.startTime = singleService.status.startTime;
        tempArray.push(tempObject);
      });
      await res.status(200).json(tempArray);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

app.get("/replicasets/:namespace", (req, res, next) => {
  k8sApi
  .listReplicationControllerForAllNamespaces()
    .then((data) => {
       res.status(200).json(data.body);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

//Define Routes
app.use("/prediction", require("./routes/prediction.route"));

app.listen(8080, () => {
  console.log("Server started");
});
