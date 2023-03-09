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
        <tr>
          <th>Name</th>
          <th>E-mail</th>
          <th>Current Balance</th>
        </tr>
        {allCustomers.map((customer) => (
          <tr key={customer.id}>
            <Link to="/view-customers">
              <td
                className="CustomerLink"
                onClick={() => {
                  setCurrentDispCust(customer.name);
                }}
              >
                {customer.name}{" "}
              </td>
            </Link>
            <td>{customer.email}</td>
            <td>${customer.balance}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DisplayAllCustomers;
