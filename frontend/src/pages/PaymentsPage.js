import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PaymentsPage.css"

export default function PaymentsPage({ user }) {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== "employer") {
      alert("You must be an employer to see your payments");
      navigate("/jobs");
    }

    async function getPayments() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/payments/${user.id}`, { credentials: "include" });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to fetch the payments");

        console.log(data.payments);
        setPayments(data.payments);
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    }

    getPayments();
  }, [user, navigate]);

  function formatDate(iso) {
    const d = new Date(iso);
    return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0") + "/" + d.getFullYear();
  }

  return (
    <div className="single-page">
      <h1>Your payments</h1>
      {payments.length === 0 ? (
        <h2>No payement found</h2>
      ) : (
        <table className="payments-table">
          <thead>
            <tr>
              <th>Freelancer</th>
              <th>Job Title</th>
              <th>Payment ID</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.job_title}</td>
                <td>{p.freelancer_email}</td>
                <td>{p.amount}€</td>
                <td>{formatDate(p.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
