import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Hotels.module.css";

const API_BASE = "http://localhost:8000/api";

export default function Hotels() {
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
      <p className={styles.infoMsg}>
        <b>Tip:</b> Each hotel has a unique <b>ID</b> shown below. Remember the ID to search for rooms by Hotel ID on the Rooms page.
      </p>
      <div className={styles.cards}>
        {hotels.map(hotel => (
          <div
            key={hotel.id}
            className={styles.card}
            onClick={() => handleSelectHotel(hotel)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${hotel.hotel_name}`}
          >
            <div className={styles.cardHeader}>
              <h3>{hotel.hotel_name}</h3>
              <span className={styles.expandIcon}>▼</span>
            </div>
            <div className={styles.cardBody}>
              <p><b>Hotel I:</b> <span className={styles.hotelId}>{hotel.id}</span></p>
              <p><b>Location:</b> {hotel.location}</p>
              <p><b>Contact:</b> {hotel.contact}</p>
              <p><b>Rating:</b> {hotel.rating}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Overlay for expanded hotel */}
      {selectedHotel && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <button className={styles.closeBtn} onClick={handleCloseOverlay} aria-label="Close details">×</button>
            <h2>{selectedHotel.hotel_name}</h2>
            <p><b>Hotel ID:</b> <span className={styles.hotelId}>{selectedHotel.id}</span></p>
            <p><b>Location:</b> {selectedHotel.location}</p>
            <p><b>Contact:</b> {selectedHotel.contact}</p>
            <p><b>Rating:</b> {selectedHotel.rating}</p>
            <div className={styles.descriptionBlock}>
              <b>Description:</b> {selectedHotel.description}
            </div>
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
