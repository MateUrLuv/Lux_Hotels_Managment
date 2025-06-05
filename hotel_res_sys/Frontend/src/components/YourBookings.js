import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./YourBookings.module.css";

const API_BASE = "http://localhost:8000/api";

export default function YourBookings({ userName }) {
  const [bookings, setBookings] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userName) return;
    setLoading(true);
    const token = localStorage.getItem("access");
    axios.get(`${API_BASE}/reservations/`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setBookings(res.data);
      setLoading(false);
    });
  }, [userName]);

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (!userName) {
    return <div className={styles.loginMsg}>Please log in to view your bookings.</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {bookings.length === 0 && !loading && (
        <p>No bookings found.</p>
      )}
      <div className={styles.cards}>
        {bookings.map(bk => (
          <div key={bk.id} className={styles.card}>
            <div className={styles.cardSummary} onClick={() => handleExpand(bk.id)}>
              <span>
                <b>Hotel:</b> {bk.hotel_name || "—"} | <b>Room:</b> {bk.room_number}
              </span>
              <span className={styles.expandIcon}>{expandedId === bk.id ? "▲" : "▼"}</span>
            </div>
            {expandedId === bk.id && (
              <div className={styles.cardBody}>
                <div><b>Check-in:</b> {bk.check_in_date}</div>
                <div><b>Check-out:</b> {bk.check_out_date}</div>
                <div><b>Amount Paid:</b> ₹{bk.total_price}</div>
                <div><b>Status:</b> {bk.status}</div>
                <div><b>Reservation ID:</b> {bk.id}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
