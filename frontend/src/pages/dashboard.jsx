import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
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

    fetchSummary();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

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
    </div>
  );
}

export default Dashboard;