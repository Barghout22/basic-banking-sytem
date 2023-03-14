const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://bankAdmin:bankAdminPass223@bankingcluster0.bg34oko.mongodb.net/?retryWrites=true&w=majority";

MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
  if (err) throw err;
  console.log("database connected");
});
// Setup empty JS object to act as endpoint for all routes
let allTransactions = [];
let allClientInfo = [];

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
app.options("*", cors());
// Initialize the main project folder
app.use(express.static("client"));

// Setup Server
const port = 8002;
const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}

app.post("/newTransaction", newTransaction);
app.post("/addClient", addClient);

function addClient(req, res) {
  // console.log(req.body);
  allClientInfo = req.body;
  // allClientInfo.find((element) => element.name === req.body.name)
  //   ? null
  //   : allClientInfo.push({
  //       id: req.body.id,
  //       name: req.body.name,
  //       email: req.body.email,
  //       balance: req.body.balance,
  //     });
  // console.log(allClientInfo);
}

function newTransaction(req, res) {
  // console.log(req.body);
  allTransactions.unshift({
    id: req.body.id,
    sender: req.body.sender,
    receiver: req.body.receiver,
    amount: req.body.amount,
    date: req.body.date,
  });

  let clientPlaceHolderInfo = allClientInfo;

  senderIndex = clientPlaceHolderInfo.findIndex(
    (item) => item.name === req.body.sender
  );
  receiverIndex = clientPlaceHolderInfo.findIndex(
    (item) => item.name === req.body.receiver
  );
  clientPlaceHolderInfo[senderIndex].balance -= req.body.amount;
  clientPlaceHolderInfo[receiverIndex].balance += req.body.amount;

  allClientInfo = clientPlaceHolderInfo;
}

app.get("/allClientInfo", function (req, res) {
  if (allClientInfo.length > 0) {
    res.send(allClientInfo);
  } else {
    const falseResponse = { message: "no client information stored" };
    res.send(falseResponse);
  }
});

app.get("/allTransactions", function (req, res) {
  if (allTransactions.length > 0) {
    res.send(allTransactions);
  } else {
    const falseResponse = { message: "no previous history" };
    res.send(falseResponse);
  }
});
