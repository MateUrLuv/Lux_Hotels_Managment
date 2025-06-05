import { useState } from "react";
import axios from "axios";
import styles from "./Rooms.module.css";

const API_BASE = "http://localhost:8000/api";

export default function Rooms() {
  const [hotelId, setHotelId] = useState("");
  const [rooms, setRooms] = useState([]);
  const [expandedRoomId, setExpandedRoomId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(false);
    setRooms([]);
    setExpandedRoomId(null);
    try {
      const res = await axios.get(`${API_BASE}/rooms/`);
      const filtered = res.data.filter(room => String(room.hotel) === hotelId.trim());
      setRooms(filtered);
      setSearched(true);
    } catch (err) {
      setRooms([]);
      setSearched(true);
    }
    setLoading(false);
  };

  const handleExpand = (roomId) => {
    setExpandedRoomId(expandedRoomId === roomId ? null : roomId);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Search Rooms by Hotel ID</h2>
      <p className={styles.infoMsg}>
        <b>Tip:</b> Enter the <b>Hotel ID</b> (see Hotels page) to find rooms for a specific hotel.
      </p>
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter Hotel ID (e.g., 1)"
          value={hotelId}
          onChange={e => setHotelId(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
      </form>
      {loading && <p>Loading rooms...</p>}
      {searched && rooms.length === 0 && !loading && (
        <p>No rooms found for Hotel ID {hotelId}.</p>
      )}
      <div className={styles.cards}>
        {rooms.map(room => (
          <div key={room.id} className={styles.card}>
            <div
              className={styles.cardHeader}
              onClick={() => handleExpand(room.id)}
              tabIndex={0}
              role="button"
              aria-label={`Expand details for room ${room.room_number}`}
            >
              <span className={styles.roomNumber}>Room {room.room_number}</span>
              <span className={room.availability_status ? styles.available : styles.notAvailable}>
                {room.availability_status ? "Available" : "Not Available"}
              </span>
              <span className={styles.expandIcon}>
                {expandedRoomId === room.id ? "▲" : "▼"}
              </span>
            </div>
            {expandedRoomId === room.id && (
              <div className={styles.cardBody}>
                <p><b>Room Type:</b> {room.room_type}</p>
                <p><b>Price per Night:</b> ₹{room.price_per_night}</p>
                <p><b>Room ID:</b> {room.id}</p>
                <p><b>Hotel ID:</b> <span className={styles.hotelId}>{room.hotel}</span></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
