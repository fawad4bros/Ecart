const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { json } = require("body-parser");
app.use(json()); //server can accept JSON data (req.body)
const { port, db } = require("./lib/config/config");
const apis = require("./apis/api");
app.use(apis);
app.use("/image", express.static("./public/images"));
mongoose.connect(db, (err) => {
  if (err) {
    console.error("Error Found! " + err);
  } else {
    console.log("Connected to mongoDB");
  }
});
app.listen(port, () => {
  console.log("Server Up");
});

//Via MongoDB
// const { MongoClient } = require("mongodb");
// const client = new MongoClient(db);
// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("mulltan");
//     const movies = database.collection("products");
//     const query = { _id: "6225f39553ebaed7d7e5e50b" };
//     const movie = await movies.findOne(query);
//     console.log(movie);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);
