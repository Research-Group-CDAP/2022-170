const {
  registerService,
  newRelease,
  getServices,
  retryRelease,
} = require("../controllers/service.controller");
const { createDeployment, getDeployment } = require("../controllers/deployment.controller");

const routes = (app) => {
  app.post("/service/register", registerService);
  app.put("/service/release", newRelease);
  app.get("/service", getServices);
  app.put("/service/retry/:id", retryRelease);

  app.post("/deployment/create", createDeployment);
  app.get("/deployment/", getDeployment);
};

module.exports = { routes };
