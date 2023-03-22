import Mongoose from "mongoose";
let database: Mongoose.Connection;
export const connect = () => {
  // add your own uri below
  const uri: string = process.env.MONGO_URI || '';
  if (database) {
    return;
  }
  Mongoose.connect(uri);
  database = Mongoose.connection;
  database.once("open", async () => {
    console.log("Connected to database");
  });
  // If the connection throws an error
  database.on("error", function (err) {
    console.error('Failed to connect to DB on startup ', err);
  });

  // When the connection is disconnected
  database.on('disconnected', function () {
    console.log('Mongoose default connection to DB disconnected');
  });

  var gracefulExit = function () {
    database.close(function () {
      console.log('Mongoose default connection with DB is disconnected through app termination');
      process.exit(0);
    });
  }

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);
};
export const disconnect = () => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};