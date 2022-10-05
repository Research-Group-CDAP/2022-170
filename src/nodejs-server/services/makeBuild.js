const Service = require("../models/service.model");
const { Docker } = require("node-docker-api");
const tar = require("tar-fs");
const path = require("path");
const fs = require("fs");
const Git = require("nodegit");
const config = require("../configs");

const makeBuild = async () => {
  let releaseId, buildStartTime, buildEndTime, pushStartTime, pushEndTime, version;
  try {
    console.log("########## Step 00 - Fetch waiting queue items at " + new Date().getMinutes());
    const waitingRelease = await Service.findOne({ status: "Waiting" });
    if (waitingRelease) {
      releaseId = waitingRelease._id;
      version = waitingRelease.latestTag;
      await Service.findOneAndUpdate(
        { _id: waitingRelease._id },
        { status: "In-Progress", moreInformation: "Release is in progress" }
      );

      console.log("########## Step 01 - Clone the code repository");
      await Git.Clone(waitingRelease.repository.url, "./temp");

      console.log("########## Step 02 - Enable socket connection to Docker Daemon");
      const promisifyStream = (stream) =>
        new Promise((resolve, reject) => {
          console.log("Here");
          stream.on("data", (data) => console.log(data.toString()));
          stream.on("end", resolve);
          stream.on("error", reject);
        });

      const docker = new Docker({ socketPath: "/var/run/docker.sock" });

      console.log("########## Step 03 - Fetch the [Dockerfile] path");
      const dockerFilePath = path.resolve("./temp");

      console.log("########## Step 04 - Compile the [Dockerfile] file");
      const tarStream = tar.pack(dockerFilePath);

      console.log("########## Step 05 - Build release container image");

      console.log("########## Step 06 - Setup image name");
      const imageName =
        config.ACR_SERVER_URL + "/" + waitingRelease.serviceName + ":" + waitingRelease.latestTag;

      await Service.findOneAndUpdate(
        { _id: waitingRelease._id },
        { status: "Building", moreInformation: "Service image is currently building" }
      );
      buildStartTime = new Date();
      docker.image
        .build(tarStream, {
          t: imageName,
        })
        .then((stream) => promisifyStream(stream))
        .then(() => docker.image.get(imageName).status())
        .then(async (image) => {
          try {
            buildEndTime = new Date();
            pushStartTime = new Date();
            console.log("########## Step 07 - Pushing the relase container image");
            await Service.findOneAndUpdate(
              { _id: waitingRelease._id },
              {
                status: "Pushing",
                moreInformation: "Service image is currently pushing to the registry",
              }
            );

            const pushData = await image.push({
              username: config.ACR_USER_NAME,
              password: config.ACR_PASSWORD,
              email: config.ACR_EMAIL,
            });

            await Service.findOneAndUpdate(
              { _id: waitingRelease._id },
              {
                status: "Push-Completed",
                moreInformation: "Service image is successfully pushed to the registry",
              }
            );
            pushEndTime = new Date();
          } catch (error) {
            await Service.findOneAndUpdate(
              { _id: waitingRelease._id },
              { status: "Failed", moreInformation: error.message }
            );
          }
        })
        .then(async () => {
          console.log("########## Step 08 - Detached code repository");
          await Service.findOneAndUpdate(
            { _id: waitingRelease._id },
            {
              status: "Release-Completed",
              moreInformation: "Release successfully completed",
              latestImageName: imageName,
            }
          );
          fs.rmSync("./temp", { recursive: true, force: true });

          if (buildStartTime && buildEndTime & pushStartTime && pushEndTime && version) {
            const releaseMetaDataObj = {
              releaseDateTime: new Date(),
              buildStartTime: buildStartTime,
              buildEndTime: buildEndTime,
              pushStartTime: pushStartTime,
              pushEndTime: pushEndTime,
              version: version,
            };

            await Service.findOneAndUpdate(
              { _id: waitingRelease._id },
              { $push: { releases: releaseMetaDataObj } }
            );
          }

          return;
        })
        .catch(async (error) => {
          await Service.findOneAndUpdate(
            { _id: waitingRelease._id },
            { status: "Failed", moreInformation: error.message }
          );
          return;
        });
    } else {
      console.log("Release queue is empty at " + new Date().getMinutes());
    }
  } catch (error) {
    await Service.findOneAndUpdate(
      { _id: releaseId },
      { status: "Failed", moreInformation: error.message }
    );
  }
};

module.exports = { makeBuild };
