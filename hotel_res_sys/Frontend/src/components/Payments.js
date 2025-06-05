import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Payments.module.css";

const API_BASE = "http://localhost:8000/api";

export default function Payments({ userName }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [payingId, setPayingId] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userName) return;
    setLoading(true);
    const token = localStorage.getItem("access");
    axios.get(`${API_BASE}/reservations/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setReservations(res.data.filter(r => r.status === "pending"));
      setLoading(false);
    });
  }, [userName]);

  const handlePay = async (reservation) => {
    setPayingId(reservation.id);
    setMessage("");
    try {
      const token = localStorage.getItem("access");
      // Simulate payment: create payment and update reservation status
      await axios.post(`${API_BASE}/payments/`, {
        reservation: reservation.id,
        amount: reservation.total_price,
        payment_method: "Card",
        payment_status: "paid"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await axios.patch(`${API_BASE}/reservations/${reservation.id}/`, {
        status: "confirmed"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Payment successful! Your booking is confirmed.");
      setReservations(reservations.filter(r => r.id !== reservation.id));
    } catch (err) {
      setMessage("Payment failed: " + (err.response?.data?.detail || "Try again."));
    }
    setPayingId(null);
  };

  if (!userName) {
    return <div className={styles.loginMsg}>Please log in to view and pay for your reservations.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Pending Payments</h2>
      {message && <div className={styles.message}>{message}</div>}
      {loading && <p>Loading reservations...</p>}
      {reservations.length === 0 && !loading && (
        <p>No pending reservations to pay for.</p>
      )}
      <div className={styles.cards}>
        {reservations.map(res => (
          <div key={res.id} className={styles.card}>
            <div>
              <b>Reservation ID:</b> {res.id}<br />
              <b>Room ID:</b> {res.room}<br />
              <b>Check-in:</b> {res.check_in_date}<br />
              <b>Check-out:</b> {res.check_out_date}<br />
              <b>Total:</b> ₹{res.total_price}
            </div>
            <button
              className={styles.payBtn}
              disabled={payingId === res.id}
              onClick={() => handlePay(res)}
            >
              {payingId === res.id ? "Paying..." : "Pay Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
