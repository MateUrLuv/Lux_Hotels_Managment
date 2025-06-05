import { useState } from "react";
import axios from "axios";
import styles from "./AuthModal.module.css"; // Adjust if your CSS file is named differently

const API_BASE = "http://localhost:8000/api";

export default function AuthModal({ open, onClose, onAuthSuccess }) {
  const [tab, setTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    address: "",
  });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    if (tab === "login") {
      setLoginForm(f => ({ ...f, [name]: value }));
    } else {
      setRegisterForm(f => ({ ...f, [name]: value }));
    }
    setMsg("");
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      const res = await axios.post(`${API_BASE}/login/`, loginForm);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("user_name", res.data.full_name); // <-- Save name for Navbar
      setMsg("Login successful!");
      setTimeout(() => {
        setLoading(false);
        setMsg("");
        if (onAuthSuccess) onAuthSuccess(); // Notify parent (Navbar) to update
        onClose();
      }, 700);
    } catch (err) {
      setMsg("Invalid credentials.");
      setLoading(false);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      await axios.post(`${API_BASE}/register/`, registerForm);
      setMsg("Registration successful! Please log in.");
      setTab("login");
    } catch (err) {
      setMsg(
        "Registration failed. " +
          (err.response?.data?.email?.[0] ||
            err.response?.data?.detail ||
            "")
      );
    }
    setLoading(false);
  }

  if (!open) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <div className={styles.tabs}>
          <button
            className={tab === "login" ? styles.active : ""}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={tab === "register" ? styles.active : ""}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>
        {tab === "login" ? (
          <form className={styles.form} onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleChange}
              required
            />
            <div className={styles.newUserMsg}>
              New user?{" "}
              <span
                className={styles.switchTab}
                onClick={() => setTab("register")}
              >
                Register here
              </span>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            {msg && <div className={styles.message}>{msg}</div>}
          </form>
        ) : (
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              name="full_name"
              placeholder="Full Name"
              value={registerForm.full_name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              value={registerForm.phone}
              onChange={handleChange}
              required
            />
            <input
              name="address"
              placeholder="Address"
              value={registerForm.address}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleChange}
              required
            />
            <div className={styles.loginMsg}>
              Already have an account?{" "}
              <span
                className={styles.switchTab}
                onClick={() => setTab("login")}
              >
                Login here
              </span>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            {msg && <div className={styles.message}>{msg}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
