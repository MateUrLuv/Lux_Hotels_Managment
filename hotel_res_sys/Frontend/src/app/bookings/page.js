'use client';
import { useEffect, useState } from "react";
import YourBookings from '../../components/YourBookings';

export default function BookingsPage() {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    setUserName(localStorage.getItem("user_name"));
  }, []);
  return <YourBookings userName={userName} />;
}
