const Deployment = require("../models/deployment.model");
const k8s = require("@kubernetes/client-node");

const kc = new k8s.KubeConfig();
kc.loadFromDefault();

const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const appsApi = kc.makeApiClient(k8s.AppsV1Api);

const makeDeployment = async () => {
  try {
    const waitingDeployment = await Deployment.findOne({ status: "Waiting" });
    appsApi.createNamespacedDeployment("default");
  } catch (error) {}
};
