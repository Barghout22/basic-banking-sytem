import reactLogo from "./assets/react.svg";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>welcome to the bank!</h1>
      <Link to="/list-of-customers">
        <button>View all customers</button>
      </Link>
    </div>
  );
}

export default App;
