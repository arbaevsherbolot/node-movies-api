const mongoose = require("mongoose");

const db = async () => {
  const connectionParams = { useNewUrlParser: true };
  await mongoose.connect(process.env.DB, connectionParams);

  mongoose.connection.on("connected", () => {
    console.log("Connected to database successfully.");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to database: ", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB connection disconnected.");
  });
};

module.exports = db;
