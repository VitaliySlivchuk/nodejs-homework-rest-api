const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((e) => {
    console.log(e.message);
    process.exit(1);
  });
