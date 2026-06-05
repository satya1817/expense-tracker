import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
function Dashboard() {
  const [summary, setSummary] = useState(null);

  const [formData, setFormData] = useState({
    type: "expense",
    category: "",
    amount: "",
    description: "",
  });
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

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

  const updateTransaction = async (
    id,
    amount
  ) => {
    if (!amount) return;

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/transactions/${id}`,
        { amount },
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

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container">
      <h1>Dashboard</h1>

      <button onClick={logout}>
        Logout
      </button>

      {summary && (
  <PieChart width={400} height={300}>
    <Pie
      data={[
        {
          name: "Income",
          value: summary.totalIncome,
        },
        {
          name: "Expense",
          value: summary.totalExpense,
        },
      ]}
      dataKey="value"
      cx="50%"
      cy="50%"
      outerRadius={100}
      label
    >
      <Cell fill="#22c55e" />
      <Cell fill="#ef4444" />
    </Pie>

    <Tooltip />
    <Legend />
  </PieChart>
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

        <br />
        <br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">
          Add Transaction
        </button>
      </form>
      <input
  type="text"
  placeholder="Search Category"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>

      <hr />

      <h2>Transactions</h2>
      <button onClick={() => setFilter("all")}>
  All
</button>

<button onClick={() => setFilter("income")}>
  Income
</button>

<button onClick={() => setFilter("expense")}>
  Expense
</button>

      {transactions
  .filter((item) =>
    item.category
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((item) => (
    <div
      key={item._id}
      className="transaction"
    >
      <h4>{item.category}</h4>

      <p>
        ₹{item.amount} ({item.type})
      </p>

      <button
        onClick={() =>
          updateTransaction(
            item._id,
            prompt("Enter new amount")
          )
        }
      >
        Edit
      </button>

      <button
        onClick={() =>
          deleteTransaction(item._id)
        }
      >
        Delete
      </button>
    </div>
))}
    </div>
  );
}

export default Dashboard;