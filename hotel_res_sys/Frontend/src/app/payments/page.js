'use client';
import { useEffect, useState } from "react";
import Payments from '../../components/Payments';

export default function PaymentsPage() {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    setUserName(localStorage.getItem("user_name"));
  }, []);
  return <Payments userName={userName} />;
}
