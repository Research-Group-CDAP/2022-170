const { registerService, newRelease, getServices } = require("../controllers/service.controller");

const routes = (app) => {
  app.post("/service/register", registerService);
  app.put("/service/release", newRelease);
  app.get("/service", getServices);
};

module.exports = { routes };
