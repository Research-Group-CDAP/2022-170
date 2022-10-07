const mongoose = require("mongoose");

const ServiceSchema = mongoose.Schema(
  {
    serviceName: { type: String, required: true },
    repository: { type: Object, required: true },
    latestTag: { type: String, required: false, default: "v1.0.0" },
    status: {
      type: String,
      enum: [
        "None",
        "Waiting",
        "Building",
        "In-Progress",
        "Pushing",
        "Release-Completed",
        "Push-Completed",
        "Failed",
      ],
      default: "None",
    },
    deletedAt: { type: Date, required: false, default: null },
    moreInformation: { type: String, required: false, default: "" },
    latestImageName: { type: String, required: false, default: "" },
    releases: [
      {
        releaseDateTime: { type: Date, required: false, default: null },
        buildStartTime: { type: Date, required: false, default: null },
        buildEndTime: { type: Date, required: false, default: null },
        pushStartTime: { type: Date, required: false, default: null },
        pushEndTime: { type: Date, required: false, default: null },
        version: { type: String, required: false, default: "" },
        imageName: { type: String, required: false, default: "" },
      },
    ],
    deploymentInfo: {
      replicas: { type: Number, required: false, default: 1 },
      ports: [{ containerPort: { type: Number, required: true } }],
      env: [
        {
          name: { type: String, required: false },
          value: { type: String, required: false },
        },
      ],
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
    serviceInfo: {
      serviceType: {
        type: String,
        enum: ["ClusterIP", "NodePort", "LoadBalancer"],
        required: true,
        default: "ClusterIP",
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
  {
    timestamps: true,
  }
);

const Service = mongoose.model("services", ServiceSchema);

module.exports = Service;
