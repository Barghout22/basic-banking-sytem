import React from "react";
import { Link } from "react-router-dom";

const DisplayAllCustomers = ({
  allCustomers,
  setCurrentDispCust,
}: {
  allCustomers: { id: string; name: string; email: string; balance: number }[];
  setCurrentDispCust: Function;
}) => {
  return (
    <div>
      <h2>All customers' information</h2>

      <p>click on a customer to view past transactions and initiate new ones</p>

      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>E-mail</th>
            <th>Current Balance</th>
          </tr>
          {allCustomers.map((customer) => (
            <tr key={customer.id}>
              <td
                className="CustomerLink"
                onClick={() => {
                  setCurrentDispCust(customer.name);
                }}
              >
                <Link to="/view-customers">{customer.name} </Link>
              </td>
              <td>{customer.email}</td>
              <td>${customer.balance.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayAllCustomers;
