import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import DisplayAllCustomers from "./components/AllCustomerDisp";
import DisplayUser from "./components/TransferHistory";
import uniqid from "uniqid";

const RouteSwitch = () => {
  const [currentDispCust, setCurrentDispCust] = useState("none");
  const [allTranscations, setAllTransactions] = useState([
    {
      id: uniqid(),
      sender: "John",
      receiver: "Sarah",
      amount: 0,
      date: new Date(),
    },
  ]);
  const [displayedTranscations, setDisplayedTransactions] = useState([
    {
      id: uniqid(),
      sender: "none",
      receiver: "none",
      amount: 0,
      date: new Date(),
    },
  ]);
  const [allCustomers, setAllCustomers] = useState([
    { id: uniqid(), name: "John", email: "john@domain", balance: 10000 },
    { id: uniqid(), name: "Sarah", email: "sarah@domain", balance: 10000 },
    { id: uniqid(), name: "Peter", email: "peter@domain", balance: 10000 },
    { id: uniqid(), name: "Micheal", email: "micheal@domain", balance: 10000 },
    { id: uniqid(), name: "Artyom", email: "artyom@domain", balance: 10000 },
    { id: uniqid(), name: "Mario", email: "mario@domain", balance: 10000 },
    { id: uniqid(), name: "Phoebe", email: "phoebe@domain", balance: 10000 },
    { id: uniqid(), name: "Patrick", email: "patrick@domain", balance: 10000 },
    { id: uniqid(), name: "Jared", email: "jared@domain", balance: 10000 },
    {
      id: uniqid(),
      name: "Morticia",
      email: "morticia@domain",
      balance: 10000,
    },
  ]);

  function DisplayCustomerInfo(name: string) {
    setCurrentDispCust(name);
    const customerTransactions = allTranscations.filter(
      (transaction) =>
        transaction.sender === name || transaction.receiver === name
    );
    setDisplayedTransactions(customerTransactions);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/list-of-customers"
          element={
            <DisplayAllCustomers
              allCustomers={allCustomers}
              setCurrentDispCust={DisplayCustomerInfo}
            />
          }
        />
        <Route
          path="/view-customers"
          element={
            <DisplayUser
              currentDispCust={currentDispCust}
              allCustomers={allCustomers}
              transactions={displayedTranscations}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
