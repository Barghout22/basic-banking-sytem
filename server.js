// Setup empty JS object to act as endpoint for all routes
let allTransactions = [];
let allClientInfo = [];
//{ id: uniqid(), name: "Jared", email: "jared@domain", balance: 10000 }

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

app.post("/newTransaction", addTransaction);
app.post("/addClient", addClientInfo);

function addClientInfo(req, res) {
  allClientInfo.push({
    id: req.body.id,
    name: req.body.name,
    email: req.body.email,
    balance: req.body.balance,
  });
}

function addTransaction(req, res) {
  console.log("hello");
  allTransactions.unshift({
    id: req.body.id,
    sender: req.body.sender,
    receiver: req.body.receiver,
    amount: req.body.amount,
    date: req.body.date,
  });

  senderIndex = allClientInfo.findIndex(
    (item) => item.sender === req.body.sender
  );
  receiverIndex = allClientInfo.findIndex(
    (item) => item.receiver === req.body.receiver
  );
  allClientInfo[senderIndex].balance -= req.body.amount;
  allClientInfo[receiverIndex].balance += req.body.amount;

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
