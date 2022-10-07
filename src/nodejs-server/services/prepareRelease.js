const Service = require("../models/service.model");

const prepareRelease = async () => {
  let releaseId;

  try {
    const upCommingRelease = await Service.findOne({ status: "None" });
    if (upCommingRelease) {
      releaseId = upCommingRelease._id;
      await Service.findOneAndUpdate(
        { _id: upCommingRelease._id },
        { status: "Waiting", moreInformation: "Configure the upcomming release" }
      );
    } else {
      console.log("Up Comming Releases are Empty");
    }
  } catch (error) {
    await Service.findOneAndUpdate(
      { _id: releaseId },
      { status: "Failed", moreInformation: error.message }
    );
  }
};

module.exports = { prepareRelease };
