const Service = require("../models/service.model");

const registerService = async (req, res) => {
  try {
    console.log(req.body);
    const service = await Service.create(req.body);

    res.status(200).json({ message: service, dateTime: new Date() });
  } catch (error) {
    res.status(400).json({ message: error.message, dateTime: new Date() });
  }
};

module.exports = { registerService };
