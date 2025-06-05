🌟 Lux Hotels – Smart Hotel Reservation System

Welcome to Lux Hotels, a modern full-stack hotel reservation system built with Django, MySQL, and (optionally) React/Next.js.
This project delivers a seamless booking experience with robust backend operations, a responsive frontend, secure authentication, and real-time database connectivity.
🚀 Built With
<p align="left"> <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white"/> <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white"/> <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/> </p>
📜 Project Description

    Lux Hotels is a smart hotel reservation platform for browsing, booking, and managing hotel stays.

    Backend: Django REST Framework with MySQL for robust, scalable data management.

    Frontend: Responsive UI using React/Next.js (or Django templates), Bootstrap, HTML, CSS, and JavaScript.

    Authentication: Secure login/register for users; admin dashboard for staff.

    CRUD Operations: Manage hotels, rooms, reservations, and payments.

    Modern UX: Smooth navigation, instant feedback, and mobile-first design.

    Database: Well-structured schema with clear relationships between hotels, rooms, users, and bookings.

📂 Features

✅ User Registration & Login
✅ Hotel & Room Browsing
✅ Booking Creation & Management
✅ Payment Tracking
✅ Admin CRUD (Create, Read, Update, Delete) for Hotels, Rooms, Reservations, Payments
✅ Responsive Frontend Design
✅ Secure Django Backend
✅ Real-time Database Updates
🛠️ Installation & Local Setup

Clone and run locally in minutes:

bash
# 1. Clone the repository
git clone https://github.com/your-username/Lux_Hotels_Managment.git

# 2. Navigate into the project directory
cd Lux_Hotels_Managment

# 3. Create a virtual environment
python -m venv venv

# 4. Activate virtual environment
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

# 5. Install backend dependencies
pip install -r requirements.txt

# 6. Set up the database (update DATABASES in settings.py if needed)
python manage.py makemigrations
python manage.py migrate

# 7. (Optional) Create a superuser for admin access
python manage.py createsuperuser

# 8. Run the development server
python manage.py runserver

For React frontend (if applicable):

bash
cd frontend
npm install
npm run dev

Open http://127.0.0.1:8000 (Django) or http://localhost:3000 (React) in your browser 🚀
🧠 Database Design

    Core Models: User, Hotel, Room, Reservation, Payment

    Relationships:

        One hotel has many rooms.

        Users can make multiple reservations.

        Each reservation is for a specific room.

        Payments are linked to reservations.

🎥 Demo Walkthrough

    Browse hotels and rooms, filter by location or type.

    Register/login as a user and make a reservation.

    View and manage your bookings.

    Admin dashboard: Add, edit, delete hotels, rooms, reservations, payments.

    Real-time updates: Bookings and payments instantly update the database.

📈 Future Enhancements

    Payment gateway integration (Stripe, Razorpay)

    User booking history and reviews

    Email notifications for bookings

    Advanced search and filters

    Room availability calendar

🤝 Contributors

    Developed by Sushanth N Koushik

    Special thanks to the Django, React, and MySQL communities.

📄 License

This project is licensed under the MIT License – see the LICENSE file for details.
🌟 Thank You for Exploring Lux Hotels! 🌟
