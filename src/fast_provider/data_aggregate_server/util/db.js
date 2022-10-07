const mongoose = require("mongoose");

const mongo_uri = process.env.MONGO_URI;
let db;

const connect = async () => {
  if (db) return;

  mongoose
    .connect(mongo_uri)
    .then((connection) => {
      db = connection.connection;
      console.log("✅ Database Synced");
    })
    .catch((error) => {
      console.error("Error connecting to database: ", error.message);
    });
};

export { connect };
