const Deployment = require("../models/deployment.model");

const prepareDeployment = async () => {
  let releaseId;

  try {
    const upCommingDeployment = await Deployment.findOne({ status: "None" });
    if (upCommingDeployment) {
      releaseId = upCommingDeployment._id;
      await Deployment.findOneAndUpdate(
        { _id: upCommingDeployment._id },
        { status: "Waiting", moreInformation: "Configure the upcomming deployment" }
      );
    } else {
      console.log("Up Comming Deployments are Empty");
    }
  } catch (error) {
    await Deployment.findOneAndUpdate(
      { _id: releaseId },
      { status: "Failed", moreInformation: error.message }
    );
  }
};

module.exports = { prepareDeployment };
