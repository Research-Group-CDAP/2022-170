const Deployment = require("../models/deployment.model");

const createDeployment = async (req, res) => {
  try {
    const deployment = await Deployment.create(req.body);
    res.status(200).json(deployment);
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

const getDeployment = async (req, res) => {
  try {
    const deployment = await Deployment.findOne(
      { serviceId: req.body.serviceId },
      { _id: 0 }
    ).select("deploymentConfigFile");

    res.status(200).json(deployment.deploymentConfigFile);
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

const makeRelease = async (req, res) => {
  try {
    const deployment = await Deployment.findOneAndUpdate(
      { serviceId: req.params.id },
      { makeRelease: true }
    );
    res.status(200).json(deployment);
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

module.exports = { createDeployment, getDeployment, makeRelease };
