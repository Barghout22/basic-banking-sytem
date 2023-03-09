import React from "react";
import { Link } from "react-router-dom";

const DisplayUser = ({
  allCustomers,
  currentDispCust,
  transactions,
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
}) => {
  const currentDisp = allCustomers.find(
    (customer) => customer.name === currentDispCust
  );
  const allOtherCusts = allCustomers.filter(
    (customer) => customer.name !== currentDispCust
  );

  function disp(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    for (let [name, value] of formData.entries()) {
      console.log(`${name}:${value}`);
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
          <input type="number" name="transferAmount" required />
        </label>
        <label>
          {" "}
          to:{" "}
          <select name="receiver" required>
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
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DisplayUser;
