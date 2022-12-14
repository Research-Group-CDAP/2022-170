const cron = require("cron");
const { makeBuild } = require("./makeBuild");
const { prepareRelease } = require("./prepareRelease");
const { prepareDeployment } = require("./prepareDeployment");
const { makeDeployment } = require("./makeDeployment");

const croneInit = async () => {
  let crons = [];

  crons.push(
    new cron.CronJob({
      cronTime: `*/20 * * * * *`,
      onTick: async function () {
        await prepareRelease();
      },
      timeZone: "America/Los_Angeles",
    }),

    new cron.CronJob({
      cronTime: `*/25 * * * * *`,
      onTick: async function () {
        await makeBuild();
      },
      timeZone: "America/Los_Angeles",
    }),

    new cron.CronJob({
      cronTime: `*/40 * * * * *`,
      onTick: async function () {
        await prepareDeployment();
      },
      timeZone: "America/Los_Angeles",
    }),

    new cron.CronJob({
      cronTime: `*/40 * * * * *`,
      onTick: async function () {
        await makeDeployment();
      },
      timeZone: "America/Los_Angeles",
    })
  );

  for (let cron of crons) {
    console.log("-------- Starting Fast Provider Cron Processes --------");
    cron.start();
  }
};

module.exports = { croneInit };
