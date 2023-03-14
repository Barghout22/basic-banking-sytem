export async function retrieveTransactions() {
  const request = await fetch("http://127.0.0.1:8002/allTransactions");
  try {
    const allTransactions = await request.json();
    if (!Array.isArray(allTransactions)) {
      //send all client data
      return allTransactions.message;
    }
    return allTransactions;
  } catch (error) {
    console.log("error", error);
  }
}

export async function retrieveClientInfo() {
  const request = await fetch("http://127.0.0.1:8002/allClientInfo");
  try {
    const allData = await request.json();
    if (Array.isArray(allData)) {
      return allData;
    } else {
      return allData.message;
    }
  } catch (error) {
    console.log("error", error);
  }
}

export function postTransaction(newTransaction: {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  date: Date;
}) {
  console.log(newTransaction);
  postData("http://127.0.0.1:8002/newTransaction", newTransaction);
  console.log("hello");
}

export function postClients(
  allClients: { id: string; name: string; email: string; balance: number }[]
) {
  allClients.forEach((customer) =>
    {postData("http://127.0.0.1:8002/addClient", customer);
    console.log(customer);}
  );
}

// Create a new date instance dynamically with JS

export const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};
