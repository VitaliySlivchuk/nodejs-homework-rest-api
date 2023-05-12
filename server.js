const app = require("./app");
const mongoose = require("mongoose");

const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .then((e) => {
    console.log(e.message);
    process.exit(1);
  });
