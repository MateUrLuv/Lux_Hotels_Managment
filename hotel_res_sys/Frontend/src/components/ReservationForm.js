import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ReservationForm.module.css";

const API_BASE = "http://localhost:8000/api";

export default function ReservationForm({ userName }) {
  const [roomId, setRoomId] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [roomInfo, setRoomInfo] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roomId) {
      setRoomInfo(null);
      return;
    }
    const fetchRoomInfo = async () => {
      try {
        const res = await axios.get(`${API_BASE}/rooms/${roomId}/`);
        setRoomInfo(res.data);
      } catch {
        setRoomInfo(null);
      }
    };
    fetchRoomInfo();
  }, [roomId]);

  useEffect(() => {
    if (!roomInfo || !checkIn || !checkOut) {
      setTotalPrice(null);
      return;
    }
    const nights =
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
      (1000 * 60 * 60 * 24);
    if (nights > 0) {
      setTotalPrice(roomInfo.price_per_night * nights);
    } else {
      setTotalPrice(null);
    }
  }, [roomInfo, checkIn, checkOut]);

  if (!userName) {
    return <div className={styles.loginMsg}>Please log in to make a reservation.</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem("access");
      await axios.post(`${API_BASE}/reservations/`, {
        room: roomId,
        check_in_date: checkIn,
        check_out_date: checkOut,
        total_price: totalPrice,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(
        `Reservation created for Room ${roomInfo.room_number} at Hotel "${roomInfo.hotel_name}"! Please make payment to confirm your booking.`
      );
      setRoomId(""); setCheckIn(""); setCheckOut(""); setRoomInfo(null); setTotalPrice(null);
    } catch (err) {
      if (err.response?.data?.detail?.toLowerCase().includes("token")) {
        setMessage("Session expired or not logged in. Please log in again.");
      } else {
        setMessage("Reservation failed: Check your input.");
      }
    }
    setLoading(false);
  };

  return (
    <div className={styles.outer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Reserve a Room</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>
              Room ID
              <input
                type="text"
                value={roomId}
                onChange={e => setRoomId(e.target.value)}
                className={styles.input}
                required
                placeholder="e.g. 5"
              />
            </label>
            <label className={styles.label}>
              Check-in Date
              <input
                type="date"
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
                className={styles.input}
                required
              />
            </label>
            <label className={styles.label}>
              Check-out Date
              <input
                type="date"
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
                className={styles.input}
                required
              />
            </label>
          </div>
          {roomInfo && (
            <div className={styles.infoBox}>
              <span>
                <b>Hotel:</b> <span className={styles.highlight}>{roomInfo.hotel_name}</span>
              </span>
              <span>
                <b>Room Number:</b> <span className={styles.highlight}>{roomInfo.room_number}</span>
              </span>
              <span>
                <b>Room Type:</b> {roomInfo.room_type}
              </span>
              <span>
                <b>Price per Night:</b> <span className={styles.highlight}>₹{roomInfo.price_per_night}</span>
              </span>
              <span>
                <b>Status:</b> {roomInfo.availability_status ? 
                  <span style={{color: "#1a7f37", fontWeight: "bold"}}>Available</span> : 
                  <span style={{color: "#d43a3a", fontWeight: "bold"}}>Not Available</span>}
              </span>
            </div>
          )}
          {totalPrice !== null && (
            <div className={styles.priceInfo}>
              <b>Total Price:</b> <span className={styles.highlight}>₹{totalPrice}</span>
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !totalPrice || (roomInfo && !roomInfo.availability_status)}
            className={styles.button}
          >
            {loading ? "Reserving..." : "Reserve Now"}
          </button>
        </form>
        {message && <div className={styles.message}>{message}</div>}
        <div className={styles.tip}>
          <b>Tip:</b> Get the Room ID from the Rooms page. The hotel is linked automatically.
        </div>
      </div>
    </div>
  );
}
