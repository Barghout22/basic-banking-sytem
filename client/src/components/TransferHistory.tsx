import React from "react";
import { Link } from "react-router-dom";

const DisplayUser = ({ currentDispCust }: { currentDispCust: string }) => {
  return (
    <div>
      <h1>welcome to {currentDispCust}'s page</h1>
      <Link to="/list-of-customers">
        <button>go back </button>
      </Link>
    </div>
  );
};
export default DisplayUser;
