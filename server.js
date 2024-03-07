const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const url = "mongodb://0.0.0.0:27017";
// const client = new MongoClient(url);
const client = new MongoClient(
  url,
  {useUnifiedTopology: true},
  {useNewUrlParser: true},
  {connectTimeoutMS: 30000},
  {keepAlive: 1}
);
const db = client.db("myCrudDatabase");
const coll = db.collection("userData");

app.post(`/register/:fname`, (req, res) => {
  const fname = req.params.fname;
  const record = {
    _id: req.body.uname,
    fname: fname, // Because I already took it from params
    lname: req.body.lname,
    city: req.body.city,
    state: req.body.state,
    pass: req.body.password,
    cpass: req.body.cpassword,
  };
  coll
    .insertOne(record)
    .then((result) => {
      res
        .status(200)
        .send("Record Stored in Database Successfully from /register");
    })
    .catch((err) => {
      res
        .status(500)
        .send("Error Occured from backend of /register while post" + err);
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
