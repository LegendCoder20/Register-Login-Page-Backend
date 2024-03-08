const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
// const url = "mongodb://0.0.0.0:27017";
const url =
  "mongodb+srv://legend:fGqt035Av7QWqotI@cluster0.v1fg5uc.mongodb.net/?authSource=Cluster0&authMechanism=SCRAM-SHA-1";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: false });

const db = client.db("myCrudDatabase");
const coll = db.collection("userData");

app.post("/register/:fname", (req, res) => {
  const fname = req.params.fname;
  const record = {
    _id: req.body.uname,
    fname: fname,
    lname: req.body.lname,
    city: req.body.city,
    state: req.body.state,
    pass: req.body.password,
    cpass: req.body.cpassword,
  };

  coll
    .insertOne(record)
    .then((result) => {
      res.status(200).send("Record stored in database successfully");
    })
    .catch((err) => {
      res.status(500).send("Error occurred while storing record: " + err);
    });
});

app.get("/getdata", (req, res) => {
  coll
    .find({})
    .toArray()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res
        .status(500)
        .send(
          "Error Occured from backend While Getting or Fetching the Data" + err
        );
    });
});

app.listen(9000, () => {
  console.log("Server Running on Port @9000");
});
