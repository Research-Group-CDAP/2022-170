const Service = require("../models/service.model");
const Deployment = require("../models/deployment.model");

const registerService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    let deploymentObj = {
      metadata: {
        labels: {
          app: service.serviceName,
        },
        name: service.serviceName,
      },
      spec: {
        selector: {
          matchLabels: {
            app: service.serviceName,
          },
        },
        replicas: service.deploymentInfo.replicas,
        template: {
          metadata: {
            labels: {
              app: service.serviceName,
            },
          },
          spec: {
            containers: [
              {
                // securityContext: {
                //   capabilities: {
                //     drop: ["all"],
                //   },
                // },
                ports: service.deploymentInfo.ports,
                env:
                  service.deploymentInfo.env &&
                  service.deploymentInfo.env.length > 0
                    ? service.deploymentInfo.env
                    : null,
                // readinessProbe: {
                //   exec: {
                //     command: [
                //       "/bin/grpc_health_probe",
                //       `-addr=:${service.deploymentInfo.ports[0].containerPort}`,
                //     ],
                //   },
                // },
                // livenessProbe: {
                //   exec: {
                //     command: [
                //       "/bin/grpc_health_probe",
                //       `-addr=:${service.deploymentInfo.ports[0].containerPort}`,
                //     ],
                //   },
                // },
                // resources: {
                //   requests: {
                //     cpu: service.deploymentInfo.resources.requests.cpu,
                //     memory: service.deploymentInfo.resources.requests.memory,
                //   },
                //   limits: {
                //     cpu: service.deploymentInfo.resources.limits.cpu,
                //     memory: service.deploymentInfo.resources.limits.memory,
                //   },
                // },
              },
            ],
          },
        },
      },
    };

    if (req.body.initialDelaySeconds) {
      deploymentObj.spec.template.spec.containers[0].readinessProbe.initialDelaySeconds =
        req.body.initialDelaySeconds;
    }

    if (req.body.periodSeconds) {
      deploymentObj.spec.template.spec.containers[0].readinessProbe.periodSeconds =
        req.body.periodSeconds;
    }

    // deploymentObj.spec.template.spec.containers[0].securityContext.capabilities.drop.push("all");

    const serviceObj = {
      metadata: {
        name: service.serviceName,
      },
      spec: {
        type: service.serviceInfo.serviceType,
        selector: {
          app: service.serviceName,
        },
        ports: service.serviceInfo.ports,
      },
    };

    const deploymentDoc = {
      serviceId: service._id,
      deploymentConfigFile: deploymentObj,
      serviceConfigFile: serviceObj,
    };

    await Deployment.create(deploymentDoc);

    res.status(200).json({ message: service, dateTime: new Date() });
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

const newRelease = async (req, res) => {
  try {
    const { version, serviceId } = req.body;
    const service = await Service.findOne({ _id: serviceId }).select(
      "_id, latestTag"
    );

    if (service) {
      if (version === service.latestTag) {
        throw new Error("Versions are same. Please give a new version tag");
      }

      await Service.findOneAndUpdate(
        { _id: serviceId },
        {
          status: "Waiting",
          moreInformation: "Service is waiting to release",
          latestTag: version,
        }
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
    const services = await Service.find({ userId: req.params.userId });
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

const retryRelease = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, {
      status: "Waiting",
    });
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

module.exports = {
  registerService,
  newRelease,
  getServices,
  retryRelease,
  getServiceById,
};
