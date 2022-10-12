const mongoose = require("mongoose");

const DeploymentSchema = mongoose.Schema({
  serviceId: { type: mongoose.Types.ObjectId, required: true, ref: "services" },
  status: {
    type: String,
    enum: ["None", "Waiting", "In-Progress", "Completed", "Failed"],
    default: "None",
  },
  makeRelease: { type: Boolean, required: false, default: false },
  moreInformation: { type: String, required: false, default: "" },
  deploymentConfigFile: {
    apiVersion: { type: String, required: false, default: "apps/v1" },
    kind: { type: String, required: false, default: "Deployment" },
    metadata: {
      labels: {
        app: { type: String, required: false },
      },
      name: { type: String, required: true },
    },
    spec: {
      selector: {
        matchLabels: {
          app: { type: String, required: true },
        },
      },
      replicas: { type: Number, required: false, default: 1 },
      template: {
        metadata: {
          labels: {
            app: { type: String, required: true },
          },
        },
        spec: {
          serviceAccountName: { type: String, required: false, default: "default" },
          // securityContext: {
          //   fsGroup: { type: Number, required: false, default: 1000 },
          //   runAsGroup: { type: Number, required: false, default: 1000 },
          //   runAsNonRoot: { type: Boolean, required: false, default: true },
          //   runAsUser: { type: Number, required: false, default: 1000 },
          // },
          containers: [
            {
              _id: false,
              // securityContext: {
              //   allowPrivilegeEscalation: { type: Boolean, required: false, default: false },
              //   capabilities: {
              //     drop: [{ _id: false, type: String, required: false, default: "all" }],
              //   },
              //   privileged: { type: Boolean, required: false, default: false },
              //   readOnlyRootFilesystem: { type: Boolean, required: false, default: true },
              // },
              image: { type: String, required: false, default: "" },
              name: { type: String, required: false, default: "server" },
              imagePullPolicy: { type: String, required: false, default: "IfNotPresent" },
              ports: [
                {
                  _id: false,
                  containerPort: { type: Number, required: true },
                },
              ],
              env: [
                {
                  _id: false,
                  name: { type: String, required: false },
                  value: { type: String, required: false },
                },
              ],
              // readinessProbe: {
              //   initialDelaySeconds: { type: Number, required: false },
              //   periodSeconds: { type: Number, required: false },
              //   exec: {
              //     command: [{ _id: false, type: String, required: true }],
              //   },
              // },
              // livenessProbe: {
              //   initialDelaySeconds: { type: Number, required: false },
              //   periodSeconds: { type: Number, required: false },
              //   exec: {
              //     command: [{ _id: false, type: String, required: true }],
              //   },
              // },
              // resources: {
              //   requests: {
              //     cpu: { type: String, required: false },
              //     memory: { type: String, required: false },
              //   },
              //   limits: {
              //     cpu: { type: String, required: false },
              //     memory: { type: String, required: false },
              //   },
              // },
            },
          ],
        },
      },
    },
  },
  serviceConfigFile: {
    apiVersion: { type: String, required: false, default: "v1" },
    kind: { type: String, required: false, default: "Service" },
    metadata: {
      name: { type: String, required: true },
    },
    spec: {
      type: { type: String, required: true },
      selector: {
        app: { type: String, required: true },
      },
      ports: [
        {
          _id: false,
          name: { type: String, required: true },
          port: { type: Number, required: true },
          targetPort: { type: Number, required: true },
        },
      ],
    },
  },
});

const Deployment = mongoose.model("deployments", DeploymentSchema);

module.exports = Deployment;
