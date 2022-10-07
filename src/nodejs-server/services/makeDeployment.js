const Deployment = require("../models/deployment.model");
const k8s = require("@kubernetes/client-node");
const Service = require("../models/service.model");

const kubeClient = new k8s.KubeConfig();
kubeClient.loadFromDefault();

const appsApi = kubeClient.makeApiClient(k8s.AppsV1Api);

const makeDeployment = async () => {
  let deploymentId;
  try {
    console.log(
      "########## Step 00 - Fetch waiting deployment queue items at " + new Date().getMinutes()
    );
    let waitingDeployment = await Deployment.findOne({ status: "Waiting" });
    deploymentId = waitingDeployment._id;

    if (waitingDeployment) {
      await Deployment.findByIdAndUpdate(waitingDeployment._id, {
        status: "In-Progress",
        moreInformation: "Deployment is in progress",
      });

      console.log("########## Step 01 - Get the container image location");
      const imageLocation = await Service.findById(waitingDeployment.serviceId).select(
        "latestImageName"
      );

      if (imageLocation.latestImageName !== "") {
        console.log("########## Step 03 - Inject container image to the deployment");
        waitingDeployment.deploymentConfigFile.spec.template.spec.containers[0].image =
          imageLocation.latestImageName;

        console.log("########## Step 04 - 🚀 Trigger the deployment");
        const deploymentRes = await appsApi.createNamespacedDeployment(
          "default",
          waitingDeployment.deploymentConfigFile
        );

        console.log(deploymentRes);

        await Deployment.findByIdAndUpdate(waitingDeployment._id, {
          status: "Completed",
          moreInformation: "Deployment is successfully completed",
        });
        return;
      } else {
        console.error("########## Image location not found");
        return;
      }
    } else {
      console.log("Deployment queue is empty at " + new Date().getMinutes());
      return;
    }
  } catch (error) {
    await Deployment.findByIdAndUpdate(deploymentId, {
      status: "Failed",
      moreInformation: error.message,
    });
    return;
  }
};

module.exports = { makeDeployment };
