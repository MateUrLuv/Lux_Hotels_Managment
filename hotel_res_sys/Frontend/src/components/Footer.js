import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <a href="#">About Us</a>
        <a href="#">Contact</a>
        <a href="#">Careers</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms</a>
      </div>
      <div className={styles.socials}>
        <a href="#"><img src="/images/facebook.svg" alt="Facebook" /></a>
        <a href="#"><img src="/images/twitter.svg" alt="Twitter" /></a>
        <a href="#"><img src="/images/instagram.svg" alt="Instagram" /></a>
        <span className={styles.copyright}>
          &copy; {new Date().getFullYear()} Lux Hotels. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
