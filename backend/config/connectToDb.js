const mongoose = require("mongoose");
async function connectToDb() {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected with data base");
  } catch (err) {
    console.log(err);
  }
}
module.exports = connectToDb;
