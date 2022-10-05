const mongoose = require("mongoose");

const DeploymentSchema = mongoose.Schema({
  serviceId: { type: mongoose.Types.ObjectId, required: true, ref: "services" },
  status: {
    type: String,
    enum: ["None", "Waiting", "In-Progress", "Completed", "Failed"],
    default: "None",
  },
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
          terminationGracePeriodSeconds: { type: Number, required: false },
          securityContext: {
            fsGroup: { type: Number, required: false },
            runAsGroup: { type: Number, required: false },
            runAsNonRoot: { type: Boolean, required: false },
            runAsUser: { type: Number, required: false },
          },
          containers: [
            {
              image: { type: String, required: true },
              name: { type: String, required: true },
              securityContext: {
                allowPrivilegeEscalation: { type: Boolean, required: false },
              },
              ports: [
                {
                  containerPort: { type: Number, required: true },
                },
              ],
              env: [
                {
                  name: { type: String, required: false },
                  value: { type: String, required: false },
                },
              ],
              readinessProbe: {
                periodSeconds: { type: Number, required: false },
                exec: {
                  command: [{ type: String, required: false }],
                },
              },
              livenessProbe: {
                periodSeconds: { type: Number, required: false },
                exec: {
                  command: [{ type: String, required: false }],
                },
              },
              resources: {
                requests: {
                  cpu: { type: String, required: false },
                  memory: { type: String, required: false },
                },
                limits: {
                  cpu: { type: String, required: false },
                  memory: { type: String, required: false },
                },
              },
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
