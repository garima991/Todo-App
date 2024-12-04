const mongoose = require ("mongoose");

function connectToDB(database) {
  mongoose
  .connect(`mongodb://127.0.0.1:27017/${database}`)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });
}

module.exports = connectToDB;