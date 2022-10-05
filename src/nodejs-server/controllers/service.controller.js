const Service = require("../models/service.model");

const registerService = async (req, res) => {
  try {
    req.body.serviceName = req.body.serviceName.toLowerCase();
    const duplicateService = await Service.find({
      serviceName: req.body.serviceName,
    });

    if (duplicateService) {
      throw new Error("Duplicate service name. Please add a different service name");
    }

    const service = await Service.create(req.body);

    res.status(200).json({ message: service, dateTime: new Date() });
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

const newRelease = async (req, res) => {
  try {
    const { version, serviceId } = req.body;
    const service = await Service.findOne({ _id: serviceId }).select("_id, latestTag");

    if (service) {
      if (version === service.latestTag) {
        throw new Error("Versions are same. Please give a new version tag");
      }

      await Service.findOneAndUpdate(
        { _id: serviceId },
        { status: "Waiting", moreInformation: "Service is waiting to release", latestTag: version }
      );

      res.status(200).json({ message: service, dateTime: new Date() });
    } else {
      throw new Error("Service not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await Service.find({});
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

module.exports = { registerService, newRelease, getServices };
