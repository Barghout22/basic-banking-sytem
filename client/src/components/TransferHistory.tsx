import React, { useState } from "react";
import { Link } from "react-router-dom";
import uniqid from "uniqid";

const DisplayUser = ({
  allCustomers,
  currentDispCust,
  transactions,
  processTransactions,
}: {
  allCustomers: { id: string; name: string; email: string; balance: number }[];
  currentDispCust: string;
  transactions: {
    id: string;
    sender: string;
    receiver: string;
    amount: number;
    date: Date;
  }[];
  processTransactions: Function;
}) => {
  const [currentDisp, setCurrentDisp] = useState(
    allCustomers.find((customer) => customer.name === currentDispCust)
  );
  const [allOtherCusts, setAllOtherCusts] = useState(
    allCustomers.filter((customer) => customer.name !== currentDispCust)
  );
  const [transferAmount, setTransferAmount] = useState(0);
  const [receiverState, setReceiverState] = useState("none");

  function disp(e: any) {
    e.preventDefault();
    if (currentDisp) {
      let currentTransaction = {
        sender: currentDisp.name,
        date: new Date(),
        id: uniqid(),
        receiver: receiverState,
        amount: transferAmount,
      };
      processTransactions(currentTransaction);
    }
  }
  return (
    <div>
      <h2> {currentDisp ? currentDisp.name : null}'s transaction details</h2>
      <h2>E-mail address: {currentDisp ? currentDisp.email : null}</h2>
      <h2>
        Current balance: $
        {currentDisp ? currentDisp.balance.toLocaleString() : null}
      </h2>
      <form action="" onSubmit={disp}>
        <label>
          Initiate a new transfer{" "}
          <input
            type="number"
            name="amount"
            required
            onChange={(e) => setTransferAmount(parseInt(e.target.value))}
          />
        </label>
        <label>
          {" "}
          to:{" "}
          <select
            name="receiver"
            required
            onChange={(e) => {
              setReceiverState(e.target.value);
            }}
          >
            <option value=""></option>
            {allOtherCusts.map((customer) => (
              <option key={customer.id} value={customer.name}>
                {customer.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Send</button>
      </form>
      <Link to="/list-of-customers">
        <button>go back </button>
      </Link>
      <table>
        <tbody>
          <tr>
            <th>Sent\Received</th>
            <th>To\From</th>
            <th>sender\Recipient Name</th>
            <th>amount</th>
          </tr>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {transaction.sender === currentDispCust ? "Sent" : "received"}
              </td>
              <td>
                {transaction.sender === currentDispCust
                  ? transaction.receiver
                  : transaction.sender}
              </td>
              <td>{transaction.date.toString()}</td>
              <td>${transaction.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DisplayUser;
