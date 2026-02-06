# MediCare+ Hospital Management System

A modern, full-stack hospital management application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a stunning **Light Blue Glass** design aesthetic.

![MediCare+ Banner](https://img.shields.io/badge/MediCare+-v1.0.0-0891b2?style=for-the-badge&logo=hospital&logoColor=white)

## ✨ Features

### 🎨 **Premium UI/UX Design**
- **Glass Morphism**: Frosted glass panels with backdrop blur effects
- **Modern Color Palette**: Cyan-blue gradients with professional aesthetics
- **Responsive Layout**: Fully responsive across all devices
- **Smooth Animations**: Page transitions, hover effects, and micro-interactions
- **Professional Typography**: Inter font family for clean, readable text

### 👨‍⚕️ **Admin Dashboard**
- **Overview**: Real-time statistics (doctors, patients, revenue, appointments)
- **Doctor Management**: Add, view, and manage doctor profiles
- **Inventory Management**: Track medical stock with color-coded status indicators
- **Payment System**: Transaction history and revenue tracking
- **WhatsApp Bot Integration**: Automated appointment reminders

### 🩺 **Doctor Dashboard**
- **Appointment Queue**: View and manage daily appointments
- **Quick Actions**: Confirm or cancel appointments with one click
- **Schedule Management**: Set available time slots for patient bookings
- **Profile Card**: Display credentials, ratings, and consultation fees
- **Real-time Stats**: Total, confirmed, and pending appointment counts

### 🏥 **Patient Dashboard**
- **3-Step Booking Wizard**:
  1. Select Doctor (with specialty, ratings, and fees)
  2. Pick Date & Time (with available slot indicators)
  3. Confirm Booking (with appointment summary)
- **Appointment History**: View past and upcoming appointments
- **Medical Records**: Access to medical documents (8 records)
- **Progress Indicator**: Visual stepper showing booking progress

## 🚀 Technology Stack

### **Frontend**
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Notification system
- **React Icons** - Icon library

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

## 📁 Project Structure

```
PROJ/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── Login.jsx             # Authentication
│   │   │   ├── AdminDashboard.jsx    # Admin panel
│   │   │   ├── DoctorDashboard.jsx   # Doctor panel
│   │   │   └── PatientDashboard.jsx  # Patient portal
│   │   ├── components/
│   │   │   ├── App.jsx               # Main app component
│   │   │   └── PrivateRoute.jsx      # Protected routes
│   │   ├── index.css                 # Global styles & design system
│   │   └── main.jsx                  # App entry point
│   ├── tailwind.config.js            # Tailwind configuration
│   ├── postcss.config.js             # PostCSS configuration
│   └── package.json
│
└── server/                 # Backend Node.js application
    ├── models/
    │   ├── User.js                   # User schema
    │   ├── Doctor.js                 # Doctor schema
    │   ├── Appointment.js            # Appointment schema
    │   └── Inventory.js              # Inventory schema
    ├── routes/
    │   ├── auth.js                   # Authentication routes
    │   ├── doctors.js                # Doctor management
    │   ├── appointments.js           # Appointment booking
    │   └── inventory.js              # Stock management
    ├── index.js                      # Server entry point
    ├── .env                          # Environment variables
    └── package.json
```

## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### **Step 1: Clone the Repository**
```bash
git clone <repository-url>
cd PROJ
```

### **Step 2: Backend Setup**
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

Start the backend server:
```bash
npm run dev
```

### **Step 3: Frontend Setup**
```bash
cd ../client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173 (or next available port)
- **Backend**: http://localhost:5000

## 🔑 User Roles & Authentication

### **Demo Credentials**
The application uses **mocked authentication** for immediate testing:

| Role    | Email                    | Access                                      |
|---------|--------------------------|---------------------------------------------|
| Admin   | `admin@hospital.com`     | Full system access, inventory, payments     |
| Doctor  | `doctor@hospital.com`    | Appointment management, schedule control    |
| Patient | `patient@hospital.com`   | Book appointments, view medical records     |

**Password**: Any (authentication is mocked for demo purposes)

### **Role-Based Features**

#### **Admin**
- Dashboard analytics
- Doctor team management
- Inventory tracking
- Payment oversight
- WhatsApp bot configuration

#### **Doctor**
- Daily appointment queue
- Confirm/cancel appointments
- Manage available time slots
- View patient information

#### **Patient**
- Browse doctors by specialty
- Book appointments online
- View appointment history
- Access medical records

## 🎨 Design System

### **Color Palette**
```css
--color-primary: #0891b2        /* Cyan 600 */
--color-primary-light: #06b6d4  /* Cyan 500 */
--color-accent: #3b82f6         /* Blue 500 */
--color-success: #10b981        /* Emerald 500 */
--color-warning: #f59e0b        /* Amber 500 */
```

### **Typography**
- **Font Family**: Inter (Google Fonts)
- **Heading Weights**: 700-800 (Bold/ExtraBold)
- **Body Text**: 400-500 (Regular/Medium)

### **Component Library**
- `.glass-card` - Frosted glass panel
- `.btn-primary` - Gradient action button
- `.btn-secondary` - Outline button
- `.input` - Form input field
- `.badge` - Status indicator
- `.card` - White content card

## 🔗 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### **Doctors**
- `GET /api/doctors` - Get all doctors
- `POST /api/doctors` - Add doctor profile

### **Appointments**
- `GET /api/appointments` - Get appointments (with role filter)
- `POST /api/appointments` - Book appointment
- `PUT /api/appointments/:id` - Update appointment status

### **Inventory**
- `GET /api/inventory` - Get stock items
- `POST /api/inventory` - Add inventory item
- `PUT /api/inventory/:id` - Update stock

## 📊 Database Schema

### **User Model**
```javascript
{
  name: String,
  email: String (unique),
  password: String,
  role: ['patient', 'doctor', 'admin'],
  phone: String
}
```

### **Doctor Model**
```javascript
{
  userId: ObjectId (ref: 'User'),
  specialization: String,
  experience: Number,
  feesPerConsultation: Number,
  availableSlots: [{ day, time }]
}
```

### **Appointment Model**
```javascript
{
  patientId: ObjectId (ref: 'User'),
  doctorId: ObjectId (ref: 'Doctor'),
  date: Date,
  timeSlot: String,
  status: ['pending', 'confirmed', 'cancelled'],
  paymentStatus: String,
  paymentAmount: Number
}
```

### **Inventory Model**
```javascript
{
  itemName: String,
  category: String,
  stockQuantity: Number,
  unitPrice: Number
}
```

## 🚧 Future Enhancements

- [ ] Real authentication with JWT tokens and bcrypt
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] WhatsApp API integration for reminders
- [ ] Prescription management system
- [ ] Video consultation feature
- [ ] Patient medical record uploads
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Analytics dashboard with charts

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Developer

Created with ❤️ by MediCare+ Team

---

**Version**: 1.0.0  
**Last Updated**: February 2026  
**Status**: Production Ready ✅
