const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(express.static("client"));

const port = 8002;

const dbName = "bankingcluster0";
const uri = process.env.DB_URL;

async function connectToDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to server");
  } catch (error) {
    console.log(error);
  }
}

connectToDB();

const transactionSchema = new mongoose.Schema({
  id: String,
  sender: String,
  receiver: String,
  amount: Number,
  date: Date,
});
const Transaction = mongoose.model("transcation", transactionSchema);

const clientSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  balance: Number,
});
const ClientInfo = mongoose.model("ClientInfo", clientSchema);

// let allTransactions = [];
// let allClientInfo = [];

app.post("/newTransaction", newTransaction);
app.post("/addClient", addClient);

function addClient(req, res) {
  // console.log(req.body);
  const allClientInfo = req.body;
  allClientInfo.forEach(async (customer) => {
    const client = new ClientInfo({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      balance: customer.balance,
    });
    try {
      const savedClient = await client.save();
      console.log(savedClient);
    } catch (error) {
      console.log(error);
    }
  });
}

async function newTransaction(req, res) {
  // console.log(req.body);
  try {
    const transaction = new Transaction({
      id: req.body.id,
      sender: req.body.sender,
      receiver: req.body.receiver,
      amount: req.body.amount,
      date: req.body.date,
    });
    await transaction.save();
    const clientInfo = await ClientInfo.find();
    const sender = clientInfo.find((item) => item.name === req.body.sender);
    const receiver = clientInfo.find((item) => item.name === req.body.receiver);
    sender.balance -= req.body.amount;
    receiver.balance += req.body.amount;
    await ClientInfo.findByIdAndUpdate(sender._id, { balance: sender.balance });
    await ClientInfo.findByIdAndUpdate(receiver._id, {
      balance: receiver.balance,
    });
    res.send({ message: "transcation completed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "enternal server error" });
  }
}

app.get("/allClientInfo", async function (req, res) {
  try {
    const allClientInfo = await ClientInfo.find();
    let allClientInfoWithoutDuplicates = [];
    allClientInfo.forEach((item) => {
      if (
        !allClientInfoWithoutDuplicates.find(
          (entry) => entry.name === item.name
        )
      ) {
        allClientInfoWithoutDuplicates.push(item);
      }
    });
    // console.log("with duplicates:", allClientInfo);
    // console.log("without", allClientInfoWithoutDuplicates);
    if (allClientInfo.length > allClientInfoWithoutDuplicates.length) {
      await ClientInfo.deleteMany({});
      await ClientInfo.insertMany(
        allClientInfoWithoutDuplicates,
        function (error) {
          if (error) {
            console.log(error);
          } else {
            console.log("collection updated");
          }
        }
      );
    }

    if (allClientInfoWithoutDuplicates.length > 0) {
      res.send(allClientInfoWithoutDuplicates);
    } else {
      const falseResponse = { message: "no client information stored" };
      res.send(falseResponse);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "internal server error" });
  }
});

app.get("/allTransactions", async function (req, res) {
  try {
    const allTransactions = await Transaction.find().sort({ date: -1 });
    if (allTransactions.length > 0) {
      res.send(allTransactions);
    } else {
      const falseResponse = { message: "no previous history" };
      res.send(falseResponse);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "internal server error" });
  }
});

const server = app.listen(port, listening);
function listening() {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
}
