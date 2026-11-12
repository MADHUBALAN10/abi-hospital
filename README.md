# ABHI SK Hospital – Doctor Appointment Booking System

Booking a doctor at a small hospital still usually means calling the front desk, waiting on hold, and hoping the slot is still free. I built this project to move that whole process online, so patients can book and pay themselves, doctors can see their day at a glance, and the admin has one place to manage everything.

It's a full-stack MERN app with three parts: a site for patients and doctors, a separate admin panel, and an Express API that both of them talk to.

## 🔗 Live Demo

- **Patient / Doctor site:** https://abihospital.netlify.app/
- **Admin panel:** https://abi-hospital-admin.vercel.app/
- **Backend API:** https://abi-hospital-backend.onrender.com

## What You Can Do

**As a patient**
- Sign up with email, or just use Google sign-in
- Browse doctors by specialization and check their consultation fee
- Pick a date and time slot and book an appointment
- Pay the consultation fee online through Razorpay
- See upcoming and past appointments, reschedule, and read the diagnosis or prescription the doctor added

**As a doctor**
- See your appointment queue
- Confirm or cancel appointments

**As an admin**
- Add, edit, or remove doctors and nurses
- Keep track of medical stock in the inventory section
- View payments and an overview dashboard with appointment counts and charts

## How a Booking Works (behind the scenes)

1. The patient picks a doctor, date, and slot. The appointment is saved with status `Pending`.
2. The server creates a Razorpay order (the amount is converted to paise, since Razorpay expects that).
3. The patient pays in the Razorpay checkout.
4. The server recalculates the payment signature with HMAC SHA-256 using the secret key. If it matches what Razorpay sent, the appointment's `paymentStatus` changes to `Paid`. If it doesn't match, the payment is rejected.

## Tech Stack

| Part | Tools |
| --- | --- |
| Frontend | React, Vite, Tailwind CSS, React Router, Axios, react-hot-toast |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose |
| Payments | Razorpay |
| Sign-in | Email/password and Google OAuth |
| Hosting | Netlify (client), Vercel (admin), Render (server) |

## Project Structure

```text
abi-hospital/
├── client/    # Patient and doctor app (React + Vite)
├── admin/     # Admin panel (React)
├── server/
│   ├── models/    # Mongoose schemas – users, doctors, appointments, nurses, inventory
│   ├── routes/    # auth, doctors, appointments, nurses, inventory, payment
│   └── index.js
└── ABHI_SK_HOSPITAL_PROJECT_REPORT.md   # Full project report
```

## Running It Locally

You'll need Node.js, a MongoDB database (local or Atlas), and Razorpay **test** keys.

```bash
git clone https://github.com/MADHUBALAN10/abi-hospital.git

# Backend
cd abi-hospital/server
npm install
npm run dev

# Patient/doctor app (new terminal)
cd abi-hospital/client
npm install
npm run dev

# Admin panel (new terminal)
cd abi-hospital/admin
npm install
npm run dev
```

Create a `.env` file inside `server/`:

```env
[ADD: your MongoDB variable name]=your-mongodb-connection-string
RAZORPAY_KEY_ID=your-razorpay-test-key-id
RAZORPAY_KEY_SECRET=your-razorpay-test-key-secret
```

> Never commit the `.env` file. It's already listed in `.gitignore`.

## How I Tested It

I tested the main flows by hand: registration, login, booking, payment, and the admin add/edit/delete screens. I also checked the API endpoints in Postman. The test cases and results are in Chapter 5 of the project report.

## What I'd Fix Next

Here's where the project honestly stands and what I'd improve:

- **Password security:** passwords are stored as plain text right now. Next step: hash them with bcrypt when users register, and compare the hash at login.
- **Proper authentication:** login returns the user object, and role checks happen only on the frontend. I'd add JWT tokens and backend middleware so every protected route checks the token.
- **Google sign-in accounts:** these get a generated placeholder password. They should be marked as Google accounts so email/password login can't be used for them.
- **Automated tests:** everything is tested by hand so far. I'd like to add a Postman collection for the API and Selenium tests for the booking flow.

## About Me

Hi, I'm **Madhu Balan C N**, an MCA graduate from Kongu Engineering College. I'm now focused on software testing and QA. This project taught me how the frontend, backend, database, and payment gateway actually connect, which makes me a better tester because I know where things can break.

GitHub: [MADHUBALAN10](https://github.com/MADHUBALAN10)
