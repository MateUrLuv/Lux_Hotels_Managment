import { useState } from "react";
import styles from "./HeroVideo.module.css";
import Link from "next/link";

const videos = [
  "/videos/BACKGROUND3.mp4",
  "/videos/BACKGROUND2.mp4"
];

export default function HeroVideo() {
  const [videoIndex, setVideoIndex] = useState(0);

  function handleEnded() {
    setVideoIndex((prev) => (prev + 1) % videos.length);
  }

  return (
    <div className={styles.heroContainer}>
  <video className={styles.videoBg}
        src={videos[videoIndex]}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        loop={videos.length === 1}
        poster="/images/hero-poster.jpg" />
  <div className={styles.overlay}>
    <div className={styles.heroContent}>
      <h1 className={styles.logoText}>
        Lux Hotels <span className={styles.crown}>👑</span>
      </h1>
      <div className={styles.tagline}>
        Indulge in <b>LUXURY</b>. Stay with <b>EXCELLENCE</b>. Where comfort meets class — your perfect stay awaits.
      </div>
      <div className={styles.btnRow}>
        <Link href="/reservations" passHref legacyBehavior>
          <a className={styles.heroBtn}>Book Now</a>
        </Link>
      </div>
    </div>
  </div>
</div>

  );
}



