import React from "react";
import { Link } from "react-router-dom";

const DisplayUser = ({
  allCustomers,
  currentDispCust,
}: {
  allCustomers: { id: string; name: string; email: string; balance: number }[];
  currentDispCust: string;
}) => {
  const currentDisp = allCustomers.find(
    (customer) => customer.name === currentDispCust
  );
  const allOtherCusts = allCustomers.filter(
    (customer) => customer.name !== currentDispCust
  );
  return (
    <div>
      <h2> {currentDisp ? currentDisp.name : null}'s transaction details</h2>
      <h2>E-mail address: {currentDisp ? currentDisp.email : null}</h2>
      <h2>
        Current balance: $
        {currentDisp ? currentDisp.balance.toLocaleString() : null}
      </h2>
      <label>
        Initiate a new transfer <input type="number" name="transferAmount" />
      </label>
      <label>
        {" "}
        to: <input list="receivers" name="receivers" />
        <datalist id="receivers">
          {allOtherCusts.map((customer) => (
            <option key={customer.id} value={customer.name} />
          ))}
        </datalist>
      </label>
      <button>Send</button>
      <Link to="/list-of-customers">
        <button>go back </button>
      </Link>
    </div>
  );
};
export default DisplayUser;
