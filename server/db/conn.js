const mongoose = require("mongoose");

const DB = process.env.MongoDB;

mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected"))
  .catch((err) => console.log("error", err));
