import { useState, useEffect } from "react";

const reviews = [
  {
    name: "Aarav S.",
    text: "Booking was so easy and the hotel was perfect. Highly recommend Lux Hotels!",
    rating: 5,
  },
  {
    name: "Meera P.",
    text: "Great selection of hotels and awesome support. Will use again!",
    rating: 4,
  },
  {
    name: "Rahul K.",
    text: "I found the best deals here. The booking process is smooth and fast.",
    rating: 5,
  },
  {
    name: "Sannidhi N.",
    text: "Not Satisfied,lots of room to grow though!!!",
    rating: 3.5,
  },
];

function Stars({ count }) {
  return (
    <span style={{ color: "#d4af37", fontSize: "1.2em" }}>
      {"★".repeat(count)}{"☆".repeat(5 - count)}
    </span>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIndex((i) => (i + 1) % reviews.length), 4000);
    return () => clearTimeout(timer);
  }, [index]);

  const review = reviews[index];

  return (
    <section style={{
      background: "rgba(0,31,63,0.7)",
      color: "#fff",
      borderRadius: "12px",
      maxWidth: 500,
      margin: "3em auto",
      padding: "2em",
      boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
      textAlign: "center"
    }}>
      <h2 style={{ color: "#d4af37" }}>Guest Reviews</h2>
      <p style={{ fontStyle: "italic", fontSize: "1.1em" }}>"{review.text}"</p>
      <Stars count={review.rating} />
      <div style={{ marginTop: "0.7em", color: "#d4af37", fontWeight: "bold" }}>— {review.name}</div>
    </section>
  );
}
