'use client';
import { useEffect, useState } from "react";
import ReservationForm from '../../components/ReservationForm';

export default function ReservationsPage() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    setUserName(localStorage.getItem("user_name"));
  }, []);

  return <ReservationForm userName={userName} />;
}
