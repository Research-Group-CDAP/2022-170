const mongoose = require("mongoose");
const config = require("../configs");

const connect = async () => {
  let database;
  if (database) return;

  const dbConString = config.MONGO_ALTALS_URI;

  mongoose
    .connect(dbConString)
    .then((conn) => {
      database = conn.connection;
      console.log("Database Synced");
    })
    .catch((error) => {
      console.error("Error connecting to database: ", error.message);
    });
};

module.exports = { connect };
