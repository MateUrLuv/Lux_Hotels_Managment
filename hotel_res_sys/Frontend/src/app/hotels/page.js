'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../components/Hotels.module.css";

const API_BASE = "http://localhost:8000/api";

export default function HotelsPage() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [loadingRooms, setLoadingRooms] = useState(false);

  useEffect(() => {
    axios.get(`${API_BASE}/hotels/`).then(res => setHotels(res.data));
  }, []);

  const handleSelectHotel = (hotel) => {
    setSelectedHotel(hotel);
    setLoadingRooms(true);
    axios.get(`${API_BASE}/rooms/`).then(res => {
      setRooms(res.data.filter(room => room.hotel === hotel.id));
      setLoadingRooms(false);
    });
  };

  const handleCloseOverlay = () => {
    setSelectedHotel(null);
    setRooms([]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Hotels</h2>
      <div className={styles.cards}>
        {hotels.map(hotel => (
          <div key={hotel.id} className={styles.card} onClick={() => handleSelectHotel(hotel)}>
            <div className={styles.cardHeader}>
              <h3>{hotel.hotel_name}</h3>
              <span className={styles.expandIcon}>▼</span>
            </div>
            <div className={styles.cardBody}>
              <p><b>Location:</b> {hotel.location}</p>
              <p><b>Contact:</b> {hotel.contact}</p>
              <p><b>Rating:</b> {hotel.rating}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedHotel && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <button className={styles.closeBtn} onClick={handleCloseOverlay}>×</button>
            <h2>{selectedHotel.hotel_name}</h2>
            <p><b>Location:</b> {selectedHotel.location}</p>
            <p><b>Contact:</b> {selectedHotel.contact}</p>
            <p><b>Rating:</b> {selectedHotel.rating}</p>
            <p><b>Description:</b> {selectedHotel.description}</p>
            <h4>Rooms</h4>
            {loadingRooms ? (
              <p>Loading rooms...</p>
            ) : (
              <ul className={styles.roomsList}>
                {rooms.length === 0 && <li>No rooms found for this hotel.</li>}
                {rooms.map(room => (
                  <li key={room.id} className={styles.roomItem}>
                    <span className={styles.roomNumber}>Room {room.room_number}</span>
                    <span className={room.availability_status ? styles.available : styles.notAvailable}>
                      {room.availability_status ? "Available" : "Not Available"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
