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
      let tempArray = [];
      data.body.items.map((item) => {
        let tempObject = {
          name: "",
          os: "",
          cluster:"",
          region:""
        };
        tempObject.name = item.metadata.labels["kubernetes.io/hostname"];
        tempObject.os = item.metadata.labels["beta.kubernetes.io/os"];
        tempObject.cluster = item.metadata.labels["kubernetes.azure.com/cluster"];
        tempObject.region = item.metadata.labels["topology.kubernetes.io/region"];
        tempArray.push(tempObject)
      });
      res.status(200).json(tempArray);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

app.get("/pod/:pod", (req, res, next) => {
  k8sApi
    // .readNamespacedPodLog(req.params.pod, "default", "server")
    // .readNamespacedPodEphemeralcontainers(req.params.pod, "default")
    .readNamespacedPodStatus(req.params.pod, "default")
    .then((data) => {
      console.log(JSON.parse(JSON.stringify(data.body)));
      res.status(200).json(JSON.parse(JSON.stringify(data.body.status)));
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: JSON.stringify(err) });
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
          podIP: "",
          containerImage: "",
          namespace: "",
          status: "",
          startTime: "",
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
          startTime:"",
          cpu:"",
          memory:"",
          podHash:"",
          node:"",
          kind:"",
          apiVersion:"",
          uid:"",
          resourceVersion:"",
          dnsPolicy:""
        };
        tempObject.name = singleService.metadata.labels.app;
        tempObject.namespace = singleService.metadata.namespace;
        tempObject.status = singleService.status.phase;
        tempObject.startTime = singleService.status.startTime;
        tempObject.cpu = singleService.spec.containers[0].resources.requests.cpu;
        tempObject.memory = singleService.spec.containers[0].resources.requests.memory;
        tempObject.podHash = singleService.metadata.labels["pod-template-hash"];
        tempObject.node = singleService.spec.nodeName;
        tempObject.kind = singleService.metadata.ownerReferences[0].kind;
        tempObject.apiVersion = singleService.metadata.ownerReferences[0].apiVersion;
        tempObject.uid = singleService.metadata.ownerReferences[0].uid;
        tempObject.resourceVersion = singleService.metadata.resourceVersion;
        tempObject.dnsPolicy = singleService.spec.dnsPolicy;
        tempArray.push(tempObject);
      });
      await res.status(200).json(tempArray);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err: err.message });
    });
});

app.get("/dependency/:namespace", (req, res, next) => {
  k8sApi
  .listNamespacedPod(req.params.namespace)
    .then(async (data) => {
      let tempArray = [];

      await data.body.items.forEach((singleService) => {
        let tempObject = {
          service: "",
          pod:"",
          node:""
        };
        tempObject.service = singleService.metadata.labels.app;
        tempObject.pod = singleService.metadata.labels.app+"-"+singleService.metadata.labels["pod-template-hash"];
        tempObject.node = singleService.spec.nodeName;
        tempArray.push(tempObject);
      });
      await res.status(200).json(tempArray);
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
