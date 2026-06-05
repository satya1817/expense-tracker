import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    description: "",
  });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchTransactions();
  }, []);

  const fetchSummary = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/transactions/summary",
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchTransactions = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get(
      "/transactions",
      {
        headers: {
          Authorization: token,
        },
      }
    );

    setTransactions(res.data.transactions);
  } catch (error) {
    console.log(error);
  }
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
  const deleteTransaction = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(
      `/transactions/${id}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    fetchSummary();
    fetchTransactions();
  } catch (error) {
    console.log(error);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/transactions",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Transaction Added");

      fetchSummary();
      fetchTransactions();

      setFormData({
        type: "expense",
        category: "",
        amount: "",
        description: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
<button onClick={logout}>
  Logout
</button>
      {summary && (
        <>
          <h3>
            Total Income: ₹{summary.totalIncome}
          </h3>

          <h3>
            Total Expense: ₹{summary.totalExpense}
          </h3>

          <h3>
            Balance: ₹{summary.balance}
          </h3>
        </>
      )}
      

      <hr />

      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="expense">
            Expense
          </option>

          <option value="income">
            Income
          </option>
        </select>

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Add Transaction
        </button>
      </form>
      <hr />

<h2>Transactions</h2>

{transactions.map((item) => (
  <div key={item._id}>
    <p>
      {item.category} - ₹{item.amount}
      ({item.type})
    </p>
  </div>
))}
{transactions.map((item) => (
  <div key={item._id}>
    <p>
      {item.category} - ₹{item.amount} ({item.type})

      <button
        onClick={() => deleteTransaction(item._id)}
      >
        Delete
      </button>
    </p>
  </div>
))}
    </div>
  );
}

export default Dashboard;