import { useState } from "react";

export default function ContactInfo() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [msg, setMsg] = useState("");

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setMsg("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setMsg("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setMsg("Please enter a valid email.");
      return;
    }
    setMsg("Message sent! (In production, admin would be notified.)");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section style={{
      background: "#fff",
      color: "#001f3f",
      borderRadius: "12px",
      maxWidth: 600,
      margin: "3em auto",
      padding: "2em",
      boxShadow: "0 2px 16px rgba(0,0,0,0.08)"
    }}>
      <h2 style={{ color: "#d4af37", textAlign: "center" }}>Contact Us</h2>
      <div style={{ textAlign: "center", marginBottom: "1.5em" }}>
        <div>📍 123 Main Street, Bengaluru, India</div>
        <div>📞 +91 98765 43210</div>
        <div>✉️ contact@luxhotels.com</div>
      </div>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
        />
        <button type="submit" style={{
          background: "#d4af37",
          color: "#001f3f",
          border: "none",
          borderRadius: "4px",
          fontWeight: "bold",
          padding: "0.7em 1.5em",
          cursor: "pointer"
        }}>Send Message</button>
      </form>
      {msg && <div style={{ marginTop: "1em", color: msg.startsWith("Message") ? "green" : "#c00" }}>{msg}</div>}
    </section>
  );
}
