import dotenv from "dotenv";
import ConnectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

ConnectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("error", error);
      throw error;
    });

    app.listen(process.env.PORT || 7000, () => {
      console.log("mongodb connected to" + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("Something went wrong at connecting db", error);
  });
