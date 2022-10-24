const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const YAML = require("json-to-pretty-yaml");
var path = require("path");
var fs = require("fs");
let ExperimentJSON = require("../journal.json");
const ExperimentResults = require("../models/ExperimentResults");

let RandomPodTerminate = {
  version: "1.0.0",
  title: "Lets kill pods randomly",
  description: "If a random pod is killed, application should remain healthy.",
  tags: ["k8s", "pod", "deployment"],
  "steady-state-hypothesis": {
    title: "The app is healthy",
    probes: [
      {
        name: "all-apps-are-healthy",
        type: "probe",
        tolerance: true,
        provider: {
          type: "python",
          func: "all_microservices_healthy",
          module: "chaosk8s.probes",
          arguments: {
            ns: "default",
          },
        },
      },
    ],
  },
  method: [
    {
      type: "action",
      name: "terminate-pod",
      provider: {
        type: "python",
        module: "chaosk8s.pod.actions",
        func: "terminate_pods",
        arguments: {
          rand: true,
          ns: "default",
        },
      },
      pauses: {
        after: 10,
      },
    },
  ],
};

let Pod_Termination_Dosent_Terminate_Others = {
  version: "1.0.0",
  title: "Other pods should not be terminated, if we terminate a Pod?",
  description: "If a Pod is terminated, other pods should remain running.",
  tags: ["k8s", "pod"],
  "steady-state-hypothesis": {
    title: "Pod exists",
    probes: [
      {
        name: "pod-exists",
        type: "probe",
        tolerance: 0,
        provider: {
          type: "python",
          func: "count_pods",
          module: "chaosk8s.pod.probes",
          arguments: {
            label_selector: "app=reviews",
            ns: "default",
          },
        },
      },
    ],
  },
  method: [
    {
      type: "action",
      name: "terminate-pod",
      provider: {
        type: "python",
        module: "chaosk8s.pod.actions",
        func: "terminate_pods",
        arguments: {
          name_pattern: "POD_NAME",
        },
      },
      pauses: {
        after: 10,
      },
    },
  ],
};

let All_the_applications_inthat_namespace_are_healthy = {
  version: "1.0.0",
  title:
    "Will the applications remain healthy, if we terminate an instance of the application?",
  description:
    "If an instance of the application is terminated, all the applications in the given namespace must be healthy",
  tags: ["k8s", "pod", "deployment"],
  "steady-state-hypothesis": {
    title: "The app is healthy",
    probes: [
      {
        name: "all-apps-are-healthy",
        type: "probe",
        tolerance: true,
        provider: {
          type: "python",
          func: "all_microservices_healthy",
          module: "chaosk8s.probes",
          arguments: {
            ns: "default",
          },
        },
      },
    ],
  },
  method: [
    {
      type: "action",
      name: "terminate-pod",
      provider: {
        type: "python",
        module: "chaosk8s.pod.actions",
        func: "terminate_pods",
        arguments: {
          name_pattern: "POD_NAME",
        },
      },
      pauses: {
        after: 10,
      },
    },
  ],
};

let ingress = {
  version: "1.0.0",
  title: "Application should be operational even if a pod is terminated?",
  description:
    "If an instance of the application is terminated, the applications as a whole should still be operational.",
  tags: ["k8s", "pod", "http"],
  "steady-state-hypothesis": {
    title: "The app is healthy",
    probes: [
      {
        name: "app-respnds-to-requests",
        type: "probe",
        tolerance: 200,
        provider: {
          type: "http",
          timeout: 3,
          verify_tls: false,
          url: "${HOST_URL}",
          headers: {
            host: "default.acme.com",
          },
        },
      },
    ],
  },
  method: [
    {
      type: "action",
      name: "terminate-pod",
      provider: {
        type: "python",
        module: "chaosk8s.pod.actions",
        func: "terminate_pods",
        arguments: {
          name_pattern: "${POD_NAME}",
        },
      },
      pauses: {
        after: 2,
      },
    },
  ],
};

const generateYamlFile = async (req, res) => {
  let data;

  if (req.params.experimentType === "RandomPodTerminate") {
    data = YAML.stringify(RandomPodTerminate);
  } else if (
    req.params.experimentType === "Pod_Termination_Dosent_Terminate_Others"
  ) {
    Pod_Termination_Dosent_Terminate_Others.method[0].provider.arguments.name_pattern =
      req.params.podName;
    data = YAML.stringify(Pod_Termination_Dosent_Terminate_Others);
  } else if (
    req.params.experimentType ===
    "All_the_applications_inthat_namespace_are_healthy"
  ) {
    All_the_applications_inthat_namespace_are_healthy.method[0].provider.arguments.name_pattern =
      req.params.podName;
    data = YAML.stringify(All_the_applications_inthat_namespace_are_healthy);
  } else if (req.params.experimentType === "ingress") {
    ingress.method[0].provider.arguments.name_pattern = req.params.podName;
    data = YAML.stringify(ingress);
  }

  var file_name = "output";
  var file_content = data;
  file_content = file_content.replace(/\n/g, "\r\n");
  console.log("pathname", __dirname);
  var stream = fs.createWriteStream(file_name + ".yaml");

  await stream.once("open", function () {
    stream.write(file_content);
    stream.end();
  });

  await res.json("YAML Generated");
};

const executeExperiment = async (req, res) => {
  exec(`chaos run output.yaml`, (error, stdout, stderr) => {
    if (error) {
      res.json(error);
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      res.json("Report Generated");
    }
  });
};

const executeRandomPodExperiment = async (req, res) => {
  exec(`chaos run randompodterm.yaml`, (error, stdout, stderr) => {
    if (error) {
      res.json({executed: false});
    } else {
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      res.json({executed: true});
    }
  });
};

const responseAsJson = async (req, res) => {
  res.json(ExperimentJSON);
};

const saveToDatabase = async (req, res) => {
  experimentResults = new ExperimentResults(ExperimentJSON);
  experimentResults
    .save()
    .then((responseExperiment) => {
      res.json(responseExperiment);
    })
    .catch((error) => {
      res.json(error);
    });
};

const fetchAllExperimentResults = async (req, res) => {
  ExperimentResults.find({userId: req.params.userId})
    .then((responseExperiment) => {
      res.json(responseExperiment);
    })
    .catch((error) => {
      res.json(error);
    });
};

module.exports = {
  generateYamlFile,
  executeExperiment,
  executeRandomPodExperiment,
  responseAsJson,
  saveToDatabase,
  fetchAllExperimentResults
};
