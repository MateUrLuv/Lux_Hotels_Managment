import styles from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <div className={styles.aboutOuter}>
      <div className={styles.aboutBox}>
        <div className={styles.aboutTitle}><b>About US</b></div>
        <div className={styles.aboutText}>
          At <b>Lux Hotels</b>, we are redefining the way travelers discover and reserve accommodations. As your trusted hotel reservation partner, we offer a seamless platform designed to connect you with the perfect stay — whether you're seeking luxurious five-star experiences, cozy comfort, or exceptional value for money.

Our intelligent search and recommendation engine tailors suggestions to your preferences, making it easy to explore, compare, and book from a wide range of carefully curated hotels. From business trips to romantic getaways or family vacations, Lux Hotels ensures every journey begins with the right stay.

Driven by convenience, transparency, and a commitment to excellence, we aim to simplify hotel booking while offering access to the best deals across destinations. With Lux Hotels, planning your next stay is no longer a hassle — it's an experience in itself.

Lux Hotels — Discover. Compare. Stay Inspired.
        </div>
      </div>
    </div>
  );
}
