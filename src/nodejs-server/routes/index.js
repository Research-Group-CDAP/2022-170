const { registerService } = require("../controllers/service.controller");

const routes = (app) => {
  app.post("/reg/service", registerService);
};

module.exports = { routes };
