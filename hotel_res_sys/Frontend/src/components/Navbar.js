import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from "./Navbar.module.css";

export default function Navbar({ onLoginClick, userName, onLogout }) {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          <img
            src="/images/logo.png"
            alt="Lux Hotels Logo"
            className={styles.logoImg}
            height={90}
          />
        </Link>
      </div>
      <ul className={styles.menu}>
        <li>
          <Link
            href="/"
            className={
              pathname === '/'
                ? `${styles.menuLink} ${styles.activeLink}`
                : styles.menuLink
            }
          >Home</Link>
        </li>
        <li>
          <Link
            href="/hotels"
            className={
              pathname === '/hotels'
                ? `${styles.menuLink} ${styles.activeLink}`
                : styles.menuLink
            }
          >Hotels</Link>
        </li>
        <li>
          <Link
            href="/rooms"
            className={
              pathname === '/rooms'
                ? `${styles.menuLink} ${styles.activeLink}`
                : styles.menuLink
            }
          >Rooms</Link>
        </li>
        <li>
          <Link
            href="/reservations"
            className={
              pathname === '/reservations'
                ? `${styles.menuLink} ${styles.activeLink}`
                : styles.menuLink
            }
          >Reservations</Link>
        </li>
        <li>
          <Link
            href="/payments"
            className={
              pathname === '/payments'
                ? `${styles.menuLink} ${styles.activeLink}`
                : styles.menuLink
            }
          >Payments</Link>
        </li>
        <li>
          <Link
            href="/bookings"
            className={
              pathname === '/bookings'
                ? `${styles.menuLink} ${styles.activeLink}`
                : styles.menuLink
            }
          >Your Bookings</Link>
        </li>
        <li>
          {userName ? (
            <span className={styles.loggedInUser}>
              {userName} <span className={styles.loggedInMsg}>(logged in)</span>
              <button className={styles.logoutBtn} onClick={onLogout}>Logout</button>
            </span>
          ) : (
            <button className={styles.loginBtn} onClick={onLoginClick}>
              Login / Register
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
