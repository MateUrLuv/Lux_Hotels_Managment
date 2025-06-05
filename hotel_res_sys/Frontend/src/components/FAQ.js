import { useState } from "react";
import styles from "./FAQ.module.css";

const faqs = [
  {
    question: "How can I save while booking hotels?",
    answer: "Look for deals and offers on our homepage, and use filters to find the best prices.",
  },
  {
    question: "Is my payment secure?",
    answer: "Yes, all payments are processed with industry-standard encryption.",
  },
  {
    question: "Can I cancel or change my reservation?",
    answer: "Yes, you can manage your reservations from your dashboard or contact support.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className={styles.faqSection}>
      <h2>FAQ's</h2>
      {faqs.map((faq, i) => (
        <div key={i} className={styles.faqItem}>
          <button onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            {faq.question}
            <span>{openIndex === i ? "▲" : "▼"}</span>
          </button>
          {openIndex === i && <p>{faq.answer}</p>}
        </div>
      ))}
    </section>
  );
}
