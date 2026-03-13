# ABHI SK HOSPITAL DOCTOR APPOINTMENT BOOKING SYSTEM

## A PROJECT REPORT

Submitted by  
`[Student Name]`  
`[Register Number]`

in partial fulfillment of the requirements for the award of the degree of  
`[Degree Name]`

`[Department Name]`  
`[Institution Name]`  
`[Place]`

`[Month Year]`

Note: Replace all bracketed placeholders with your academic details before submission.

---

# BONAFIDE CERTIFICATE

This is to certify that the project report entitled **"ABHI SK HOSPITAL DOCTOR APPOINTMENT BOOKING SYSTEM"** is the bonafide record of project work carried out by **[Student Name] ([Register Number])** in partial fulfillment of the requirements for the award of the degree of **[Degree Name]** during the academic year **[Academic Year]**.

Supervisor: `[Guide Name]`  
Head of the Department: `[HOD Name]`

Date: `[Date]`

Submitted for the end semester viva voce examination held on `[Date]`.

Internal Examiner: `[Name]`  
External Examiner: `[Name]`

---

# DECLARATION

I hereby declare that the project report entitled **"ABHI SK HOSPITAL DOCTOR APPOINTMENT BOOKING SYSTEM"** submitted in partial fulfillment of the requirements for the award of **[Degree Name]** is the original work carried out by me. This report has not formed the basis for the award of any degree, diploma, or similar title to any candidate of any university or institution.

Date: `[Date]`  
Place: `[Place]`

`[Student Name]`  
`[Register Number]`

I certify that the above declaration is true to the best of my knowledge.

`[Guide Name]`  
Project Supervisor

---

# ABSTRACT

The **Abhi SK Hospital Doctor Appointment Booking System** is a full-stack web application developed to digitize patient appointment scheduling and related hospital administration activities. The system is implemented using the MERN-based architecture, with **MongoDB** for data storage, **Express.js** and **Node.js** for backend services, and **React.js** for patient, doctor, and admin interfaces. The platform is designed to reduce the delays, manual effort, and coordination issues commonly found in conventional hospital appointment handling.

The application provides a unified environment in which patients can register, log in, browse doctors by specialization, select appointment dates and time slots, and complete online consultation payments. Doctors can view their appointment queue, update consultation status, and manage patient interactions through a dedicated dashboard. Administrators can oversee doctors, nurses, appointments, inventory records, and payment-related information from a centralized control panel. The system also includes Google sign-in support, role-based access, Stripe payment integration, and configurable communication support such as WhatsApp-based follow-up workflows.

From a technical perspective, the project emphasizes modular architecture, reusable frontend components, RESTful API design, and document-based data modeling. The solution improves booking transparency, supports real-time appointment retrieval, streamlines operational monitoring, and enables better service coordination within the hospital environment. Overall, the project demonstrates how modern web technologies can be used to create a scalable and practical healthcare management platform suitable for academic study as well as real-world extension.

---

# ACKNOWLEDGEMENT

I express my sincere gratitude to the management of **[Institution Name]** for providing the facilities, infrastructure, and academic environment required to complete this project successfully.

I offer my respectful thanks to **[Head of Department Name]**, Head of the Department, for valuable encouragement and institutional support throughout the course of this work.

I convey my heartfelt gratitude to **[Project Guide Name]**, Project Supervisor, for continuous guidance, constructive suggestions, and technical direction during the development and documentation of this project.

I also thank the faculty members, friends, and well-wishers who extended their support directly and indirectly. Finally, I express my deepest gratitude to my parents and family for their constant encouragement and confidence in all my academic efforts.

---

# TABLE OF CONTENTS

1. INTRODUCTION  
1.1 OVERVIEW  
1.2 EXISTING SYSTEM  
1.3 DRAWBACKS OF EXISTING SYSTEM  
1.4 PROPOSED SYSTEM  
1.5 ADVANTAGES OF PROPOSED SYSTEM

2. SYSTEM ANALYSIS  
2.1 IDENTIFICATION OF NEED  
2.2 FEASIBILITY STUDY  
2.2.1 ECONOMIC FEASIBILITY  
2.2.2 OPERATIONAL FEASIBILITY  
2.2.3 TECHNICAL FEASIBILITY  
2.3 SOFTWARE REQUIREMENT SPECIFICATIONS  
2.3.1 SOFTWARE REQUIREMENTS  
2.3.2 HARDWARE REQUIREMENTS  
2.4 SOFTWARE DESCRIPTION  
2.4.1 FRONT END  
2.4.2 BACK END  
2.4.3 DATABASE

3. SYSTEM DESIGN  
3.1 MODULE DESCRIPTION  
3.1.1 ADMIN MODULE  
3.1.2 PATIENT ACCOUNT MODULE  
3.1.3 DOCTOR MODULE  
3.1.4 APPOINTMENT BOOKING MODULE  
3.1.5 APPOINTMENT MANAGEMENT MODULE  
3.1.6 PAYMENT GATEWAY MODULE  
3.1.7 NURSE MANAGEMENT MODULE  
3.1.8 INVENTORY MANAGEMENT MODULE  
3.1.9 DOCTOR DASHBOARD MODULE  
3.1.10 PATIENT DASHBOARD MODULE  
3.1.11 ANALYTICS AND REPORTING MODULE  
3.1.12 WHATSAPP COMMUNICATION MODULE  
3.1.13 AUTHENTICATION AND ROLE MANAGEMENT MODULE  
3.2 DATA FLOW DIAGRAM  
3.2.1 DATA FLOW DIAGRAM LEVEL 0  
3.2.2 DATA FLOW DIAGRAM LEVEL 1  
3.3 SYSTEM FLOW DIAGRAM  
3.4 USE CASE DIAGRAM  
3.5 DATABASE DESIGN  
3.6 INPUT DESIGN  
3.7 OUTPUT DESIGN

4. IMPLEMENTATION  
4.1 CODE DESCRIPTION  
4.2 STANDARDIZATION OF THE CODING  
4.3 ERROR HANDLING

5. TESTING AND RESULTS  
5.1 TESTING  
5.1.1 UNIT TESTING  
5.1.2 INTEGRATION TESTING  
5.1.3 VALIDATION TESTING

6. CONCLUSION AND FUTURE ENHANCEMENTS  
6.1 CONCLUSION  
6.2 FUTURE ENHANCEMENTS

APPENDICES  
A. SAMPLE CODING  
B. SCREENSHOTS

REFERENCES  
SUSTAINABLE DEVELOPMENT GOALS

---

# LIST OF FIGURES

3.1 Data Flow Diagram Level 0  
3.2 Data Flow Diagram Level 1  
3.3 System Flow Diagram  
3.4 Use Case Diagram  
3.5 User Login Form  
3.6 User Registration Form  
3.7 Home Page  
3.8 Patient Dashboard  
3.9 Doctor Dashboard  
3.10 Admin Dashboard Overview  
3.11 Doctors Management Screen  
3.12 Inventory Management Screen  
3.13 Payment Checkout Screen  
3.14 Appointment Details Screen  
B.1 Landing Page  
B.2 Login Screen  
B.3 Doctor Listing View  
B.4 Appointment Booking Form  
B.5 Payment Redirection Screen  
B.6 Payment Success State  
B.7 Patient Appointment History  
B.8 Appointment Details Modal  
B.9 Doctor Appointment Queue  
B.10 Doctor Schedule Screen  
B.11 Admin Overview Screen  
B.12 Doctors Team Screen  
B.13 Nurses Team Screen  
B.14 Inventory Screen  
B.15 Payments Screen  
B.16 WhatsApp Configuration Screen

---

# LIST OF TABLES

2.1 Software Requirements  
2.2 Hardware Requirements  
3.1 Core Collections in the Database  
5.1 Unit Testing Results  
5.2 Integration Testing Results  
5.3 Validation Testing Results

---

# LIST OF ABBREVIATIONS

| Abbreviation | Expansion |
| --- | --- |
| API | Application Programming Interface |
| CSS | Cascading Style Sheet |
| DFD | Data Flow Diagram |
| HTML | HyperText Markup Language |
| JWT | JSON Web Token |
| MERN | MongoDB, Express.js, React.js, Node.js |
| MVC | Model View Controller |
| NoSQL | Not Only Structured Query Language |
| OS | Operating System |
| REST | Representational State Transfer |
| SRS | Software Requirement Specification |
| UI | User Interface |
| URL | Uniform Resource Locator |
| UPI | Unified Payments Interface |
| UX | User Experience |

---

# CHAPTER 1

# INTRODUCTION

## 1.1 OVERVIEW

Healthcare delivery increasingly depends on timely coordination between patients, doctors, support staff, and administrative teams. In many hospitals and clinics, appointment scheduling is still handled through phone calls, paper registers, or disconnected software tools. These methods often lead to booking conflicts, delayed confirmations, poor record visibility, and unnecessary waiting time for both patients and hospital staff. The lack of centralized digital access also makes it difficult to monitor consultation history, payment status, and doctor availability in a consistent manner.

The **Abhi SK Hospital Doctor Appointment Booking System** is designed to address these issues through a role-based digital platform that streamlines the complete appointment lifecycle. Patients can discover doctors, review specializations, choose a suitable consultation slot, and make online payments through a secure workflow. Doctors can review their schedules and manage appointment decisions, while administrators can oversee operational data such as appointments, staff records, inventory, and payment information from a unified dashboard.

The application is built with a modern web architecture that separates presentation, business logic, and data persistence. The frontend interfaces are implemented in React.js for responsive interaction, while the backend uses Express.js and Node.js to expose RESTful services. MongoDB is used to store users, doctors, appointments, nurses, and inventory data. This combination provides flexibility, scalability, and a suitable development model for healthcare information systems.

The project demonstrates how digital transformation can improve hospital service efficiency, reduce manual dependency, and provide a better user experience across patient-facing and administrative workflows. It also establishes a foundation for future extensions such as automated reminders, doctor slot configuration, analytics, and teleconsultation support.

## 1.2 EXISTING SYSTEM

In the existing appointment process followed in many small and medium healthcare institutions, appointments are often booked manually through the reception desk, over phone calls, or via unstructured messaging. Patients may not have direct visibility into doctor specialization, availability, consultation charges, or status updates. In such environments, staff members manually coordinate schedules, resulting in frequent dependency on human follow-up and repeated verification.

Doctor-related data, patient information, payment confirmation, and support records are usually maintained in separate registers or isolated files. This fragmented method makes it difficult to track whether a patient has completed payment, whether an appointment has been rescheduled, or whether a doctor has updated consultation remarks. Since these records are not managed in a centralized workflow, reporting and monitoring also become time-consuming.

Administrative processes such as managing nurses, tracking basic medical stock, or reviewing appointment volumes are rarely integrated with the booking system. As a result, hospital management lacks a consolidated operational view. This limits the ability to make informed decisions related to staffing, scheduling, and service performance.

## 1.3 DRAWBACKS OF EXISTING SYSTEM

The conventional system suffers from several limitations:

- Appointment booking depends heavily on reception staff and manual coordination.
- Patients do not receive a transparent, self-service workflow for selecting doctors and slots.
- Doctor schedules are difficult to monitor in real time.
- Manual record keeping increases the risk of duplication, omission, and booking errors.
- Payment confirmation is not tightly connected with appointment status.
- Administrative modules such as nurse records and inventory are handled separately.
- Reports and analytics are difficult to generate from handwritten or fragmented data sources.
- Follow-up communication is inconsistent and often delayed.
- Scalability is poor when patient volume increases.

## 1.4 PROPOSED SYSTEM

The proposed system is a web-based hospital appointment booking and administration platform developed for **Abhi SK Hospital**. It introduces a centralized workflow through which patients, doctors, and administrators can interact with the same data environment according to their roles and permissions.

Patients can register using standard credentials or Google sign-in, browse the list of doctors, view specialization and consultation fee details, choose a preferred appointment date, and proceed with online payment. After a booking is made, the patient can review appointment history, check status, reschedule where applicable, and view diagnosis or prescription updates entered by the doctor.

Doctors are provided with a dedicated dashboard that displays their appointments, pending confirmations, and basic schedule controls. Administrators use a separate admin portal to monitor doctors, nurses, payments, inventory, and appointment metrics. The backend exposes role-based APIs for authentication, appointment processing, doctor management, inventory management, nurse management, and Stripe-based payment handling.

The proposed system replaces isolated manual processes with a connected digital framework. This improves accessibility, data consistency, operational visibility, and service responsiveness across the hospital environment.

## 1.5 ADVANTAGES OF PROPOSED SYSTEM

The proposed system offers the following benefits:

- Centralized appointment management for patients, doctors, and administrators.
- Faster booking workflow with reduced manual intervention.
- Improved transparency in doctor availability and appointment status.
- Integrated online payment support through Stripe.
- Role-based access for patient, doctor, nurse, and admin operations.
- Better record maintenance using MongoDB document collections.
- Dedicated dashboards for different user categories.
- Administrative visibility into staff and inventory data.
- Easier future extension for notifications, reporting, and telemedicine services.
- Improved user experience through responsive web interfaces.

This chapter introduced the problem domain, explained the limitations of traditional hospital booking methods, and presented a digital solution tailored to Abhi SK Hospital. The next chapter discusses the identified need, feasibility, software requirements, and the technologies selected for implementation.

---

# CHAPTER 2

# SYSTEM ANALYSIS

## 2.1 IDENTIFICATION OF NEED

Hospitals require a dependable and structured appointment system to reduce patient waiting time, improve scheduling discipline, and minimize operational confusion. In the absence of an integrated platform, patients depend on reception staff for availability updates and often experience uncertainty regarding confirmation, slot changes, and payment status. Doctors, in turn, may not receive a well-organized view of their consultation queue.

There is also a broader need for administrative control. Hospital management must track staffing information, appointment volume, and support resources through a reliable digital system rather than manual records. A platform that combines booking, consultation status, payments, and operational dashboards can significantly improve service quality and efficiency.

The identified need of this project is therefore to create a secure, user-friendly, and scalable hospital appointment management system that supports patients, doctors, and administrators through a unified web application.

## 2.2 FEASIBILITY STUDY

Feasibility study helps determine whether the proposed system can be developed and deployed effectively within academic and practical constraints. For the Abhi SK Hospital system, the analysis was performed from economic, operational, and technical perspectives.

### 2.2.1 Economic Feasibility

The project is economically feasible because it is based largely on open-source technologies such as React.js, Node.js, Express.js, MongoDB, and Vite. These tools reduce licensing costs and make development affordable in an academic setting. Since the system is browser-based, there is no need for specialized client-side installation on end-user devices.

From an operational perspective, the platform can reduce repetitive manual tasks related to appointment registration, status follow-up, and basic administrative record maintenance. This improves efficiency and reduces the indirect cost of errors, missed updates, and duplicated records. The implementation cost is therefore justified by the long-term benefits of improved workflow management and service quality.

### 2.2.2 Operational Feasibility

The proposed system is operationally feasible because it aligns with the day-to-day workflow of a hospital. Patients are already familiar with web and mobile interfaces for booking services, and hospital staff can adapt to a dashboard-based management process with minimal training. The user interfaces are role-based and task-oriented, which reduces complexity for each category of user.

The system improves operations instead of disrupting them. It does not require a complete change in hospital procedure; rather, it digitizes existing activities such as registration, appointment management, consultation tracking, and payment verification. As a result, the platform can be adopted gradually and effectively.

### 2.2.3 Technical Feasibility

The project is technically feasible because the selected stack is well supported, widely documented, and appropriate for web-based information systems. React.js supports rich user interfaces, while Node.js and Express.js support scalable API development. MongoDB is well suited for flexible document-based storage of users, appointments, and staff records.

The required hardware and software environment is readily available on standard development machines. The application structure is modular, making it easier to maintain and extend. Integration with external services such as Google OAuth and Stripe is supported through existing libraries and standard API workflows. Hence, the technical requirements of the project are realistic and achievable.

## 2.3 SOFTWARE REQUIREMENT SPECIFICATIONS

Software Requirement Specification defines the functional behavior of the system and the resources needed for implementation. It serves as a technical blueprint that guides design, development, and testing.

### 2.3.1 Software Requirements

**Table 2.1 Software Requirements**

| Component | Requirement |
| --- | --- |
| Operating System | Windows 10/11, Linux, or macOS |
| Frontend Framework | React.js |
| Frontend Build Tool | Vite |
| Styling Tools | CSS, Tailwind CSS, custom styles |
| Backend Runtime | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB |
| Package Manager | npm |
| API Testing Tool | Postman |
| Version Control | Git and GitHub |
| Payment Integration | Stripe |
| Authentication Support | Basic login and Google OAuth |
| Browser | Chrome, Edge, Firefox |

The above software components provide the necessary environment for development, testing, deployment, and maintenance of the application.

### 2.3.2 Hardware Requirements

**Table 2.2 Hardware Requirements**

| Component | Minimum Requirement |
| --- | --- |
| Processor | Intel i3 or equivalent and above |
| RAM | 4 GB minimum, 8 GB recommended |
| Storage | 20 GB free disk space |
| System Type | 64-bit operating system |
| Display | 1366 x 768 resolution or higher |
| Network | Reliable internet connection for API and payment services |

These specifications are sufficient for local development, testing, and smooth usage of the hospital booking application.

## 2.4 SOFTWARE DESCRIPTION

### 2.4.1 Front End

The frontend of the system is developed using **React.js**, which supports component-based UI construction and efficient rendering of dynamic content. Separate interfaces are provided for patients, doctors, and administrators. Routing is handled using `react-router-dom`, while notifications are managed through `react-hot-toast`. The user experience is designed to support intuitive navigation across booking, appointment history, doctor views, and administrative screens.

The patient-side interface includes the home page, login and registration screens, doctor listing, appointment booking form, payment flow initiation, and appointment history views. The doctor-side interface provides access to appointment status management and schedule visibility. The admin-side frontend includes operational views for doctor management, nurse management, inventory control, payment summaries, and dashboard analytics.

### 2.4.2 Back End

The backend is implemented using **Node.js** and **Express.js**. It exposes RESTful endpoints for user authentication, doctor data retrieval, appointment creation and updates, nurse management, inventory management, and payment processing. Express middleware is used for JSON parsing, URL encoding, CORS handling, and centralized error responses.

The backend follows a modular route-model structure. Route files are separated according to domain concerns such as `auth`, `appointments`, `doctors`, `nurses`, `inventory`, and `payment`. This improves maintainability and makes the application easier to extend. Backend services also support role-sensitive workflows by returning filtered appointment data for patients and doctors.

### 2.4.3 Database

The system uses **MongoDB** as the primary database. MongoDB stores application data as JSON-like documents, which aligns naturally with JavaScript-based MERN development. Collections are used to manage user records, doctor profiles, nurse profiles, inventory items, and appointment transactions.

The document-oriented approach gives the project flexibility when storing fields such as doctor slot details, appointment diagnosis, prescription notes, and payment status. Mongoose schemas are used to define structure, validation, references, and indexes. This supports reliable data access while preserving the adaptability needed for healthcare workflows.

This chapter analyzed the need for the system, justified its feasibility, and documented the software and hardware requirements. The next chapter explains how the application is organized at the design level, including its modules, data flow, and database structure.

---

# CHAPTER 3

# SYSTEM DESIGN

## 3.1 MODULE DESCRIPTION

The Abhi SK Hospital system is designed as a set of connected modules, each handling a specific operational responsibility. Together, these modules support booking, consultation coordination, staff management, and administrative monitoring.

### 3.1.1 Admin Module

The admin module acts as the central control unit of the system. It provides access to dashboard metrics, appointments, doctors, nurses, payments, and inventory. The administrator can monitor pending appointments, add or update doctor and nurse records, manage stock information, and view operational summaries from a single interface.

### 3.1.2 Patient Account Module

The patient account module manages patient registration, login, profile persistence, and appointment-related access. Patients can sign in using email credentials or Google OAuth, access their dashboard, review appointment history, inspect doctor notes, and log out securely.

### 3.1.3 Doctor Module

The doctor module manages doctor profile information including specialization, years of experience, consultation fees, gender, profile image, and available slots. Doctor records are linked to user accounts in the database, enabling both identity management and role-based dashboard access.

### 3.1.4 Appointment Booking Module

This module enables patients to select a doctor, choose a date, choose a slot, and submit an appointment request. It validates required fields, stores the booking in the database, and initializes the appointment with status and payment metadata. This module is central to the patient-side workflow.

### 3.1.5 Appointment Management Module

Appointment management handles viewing, updating, deleting, and rescheduling appointment entries. It supports different views based on user role, allowing patients to see their own appointments, doctors to view their consultation queue, and administrators to review all records. It also stores diagnosis and prescription details for completed consultations.

### 3.1.6 Payment Gateway Module

The payment module integrates **Stripe Checkout** to support online consultation fee payment. It creates checkout sessions, verifies payment sessions, and updates appointment payment status. This module ensures that financial confirmation becomes part of the booking workflow instead of remaining a separate manual process.

### 3.1.7 Nurse Management Module

The nurse management module allows the administrator to maintain hospital nursing staff records. It supports nurse creation, updating, retrieval, and deletion. Nurse data includes name, email, phone, department, shift, experience, gender, and profile image references.

### 3.1.8 Inventory Management Module

The inventory module stores and maintains medical stock data used by the hospital administration. It supports item creation, editing, retrieval, and deletion, helping the admin keep track of available stock and basic inventory operations through the dashboard.

### 3.1.9 Doctor Dashboard Module

The doctor dashboard module presents appointment statistics, queue data, schedule-related UI, and patient-oriented views for doctors. It enables them to confirm or cancel appointments and gives them a structured view of daily consultation tasks.

### 3.1.10 Patient Dashboard Module

The patient dashboard module provides doctor browsing, booking, payment success handling, appointment history, rescheduling support, and detailed appointment views. It serves as the main interactive environment for patients after login.

### 3.1.11 Analytics and Reporting Module

The analytics module is embedded in the admin dashboard. It presents appointment counts, doctor and patient totals, revenue-related summaries, and chart-based operational insights. These outputs help administrators understand current workload and service performance.

### 3.1.12 WhatsApp Communication Module

The system includes an admin-side section for WhatsApp-related configuration and communication extension. This module is intended to support follow-up messaging, inquiry handling, or reminder-oriented workflows as part of hospital communication management.

### 3.1.13 Authentication AND Role Management Module

The authentication and role management module ensures that users are granted access only to the interfaces relevant to their roles. The system distinguishes between patient, doctor, admin, and nurse identities at the data level. Route protection on the frontend and role-based behavior in the application help maintain secure access boundaries.

## 3.2 DATA FLOW DIAGRAM

The Data Flow Diagram illustrates how data moves between users, system processes, and the database. In this project, the primary external entities are the patient, doctor, administrator, payment gateway, and database.

### 3.2.1 Data Flow Diagram Level 0

At Level 0, the system is represented as a single process interacting with external actors. Patients submit registration data, login data, appointment details, and payment actions. Doctors retrieve appointment data and update consultation status. Administrators manage staff, inventory, and reports. The payment gateway confirms transaction results, and the database stores the final records.

Suggested figure caption: **Figure 3.1 Data Flow Diagram Level 0**

### 3.2.2 Data Flow Diagram Level 1

At Level 1, the system is broken into sub-processes such as authentication, doctor management, appointment management, payment processing, inventory management, and dashboard reporting. Each process exchanges data with MongoDB collections and presents filtered outputs based on user role. This diagram gives a clearer view of how the subsystems cooperate.

Suggested figure caption: **Figure 3.2 Data Flow Diagram Level 1**

## 3.3 SYSTEM FLOW DIAGRAM

The system flow begins when a user opens the web application and proceeds to registration or login. Based on the authenticated role, the user is redirected to the appropriate dashboard. Patients can browse doctors, select a date and time slot, and initiate a Stripe payment. Once payment is completed, the appointment record is updated and shown in patient history. Doctors view their appointments and update statuses. Administrators oversee the full operational environment through the admin dashboard.

Suggested figure caption: **Figure 3.3 System Flow Diagram**

## 3.4 USE CASE DIAGRAM

The use case diagram captures major interactions between actors and the system:

- Patient: register, log in, browse doctors, book appointment, pay consultation fee, view history, reschedule appointment, view diagnosis and prescription.
- Doctor: log in, view appointments, confirm or cancel appointments, monitor schedule.
- Administrator: log in, manage doctors, manage nurses, manage inventory, view payments, review analytics.
- Payment Gateway: process checkout session and return payment confirmation.

Suggested figure caption: **Figure 3.4 Use Case Diagram**

## 3.5 DATABASE DESIGN

The database is designed using interrelated MongoDB collections. Each collection stores a specific domain of hospital data and uses references where necessary.

**Table 3.1 Core Collections in the Database**

| Collection | Purpose | Important Fields |
| --- | --- | --- |
| `users` | Stores system users | name, email, password, role, phone |
| `doctors` | Stores doctor profiles | userId, specialization, experience, feesPerConsultation, availableSlots |
| `appointments` | Stores booking transactions | patientId, doctorId, date, timeSlot, status, paymentStatus, diagnosis, prescription |
| `nurses` | Stores nurse profiles | userId, department, shift, experience, gender |
| `inventory` | Stores stock records | itemName, category, stockQuantity, unitPrice |

The relationship between `users` and `doctors` is maintained through `userId`. Appointments connect patients and doctors using referenced object identifiers. This design supports easy population of related data and simplifies dashboard queries.

## 3.6 INPUT DESIGN

Input design focuses on collecting data accurately and validating it before persistence. In this system, major input screens include login, registration, doctor creation, nurse creation, appointment booking, inventory entry, and payment initiation.

The login form accepts email and password input, while registration collects name, email, password, and role selection. The doctor entry screen accepts specialization, experience, consultation fee, gender, and slot data. The appointment booking form captures date and time slot information from the patient and pairs it with the selected doctor identity.

Form validation is used to ensure that required fields are present and that invalid data is not submitted. For example, appointment creation verifies patient ID, doctor ID, date, and slot information. Input design therefore improves data reliability, reduces user confusion, and prevents incomplete record creation.

Suggested figure captions:

- **Figure 3.5 User Login Form**
- **Figure 3.6 User Registration Form**

## 3.7 OUTPUT DESIGN

Output design determines how processed data is displayed to users in a clear and meaningful way. In the Abhi SK Hospital system, outputs are customized for each role.

The patient output views include doctor cards, appointment history, payment confirmation state, and appointment details such as diagnosis or prescription. The doctor dashboard displays daily appointment queues, counts of confirmed and pending consultations, and simple schedule management views. The admin output design includes dashboard overview cards, charts, recent appointment rows, doctor management pages, nurse management screens, inventory records, and payment summaries.

The output screens are designed to improve readability, reduce interaction friction, and make operational decisions easier. Responsive layout and card-based presentation are used throughout the application to ensure usability across different screen sizes.

Suggested figure captions:

- **Figure 3.7 Home Page**
- **Figure 3.8 Patient Dashboard**
- **Figure 3.9 Doctor Dashboard**
- **Figure 3.10 Admin Dashboard Overview**
- **Figure 3.11 Doctors Management Screen**
- **Figure 3.12 Inventory Management Screen**
- **Figure 3.13 Payment Checkout Screen**
- **Figure 3.14 Appointment Details Screen**

This chapter described the architectural modules, data movement, and database organization of the proposed system. It also summarized how inputs are captured and how role-based outputs are presented. The next chapter explains how the design is translated into code and how implementation practices are maintained.

---

# CHAPTER 4

# IMPLEMENTATION

## 4.1 CODE DESCRIPTION

The implementation of the Abhi SK Hospital Doctor Appointment Booking System is divided into three major application areas: `client`, `admin`, and `server`. The `client` application contains the patient-facing and doctor-facing interfaces. The `admin` application contains the administrator dashboard and management screens. The `server` application contains backend routes, database models, and API logic.

Frontend routing is implemented using `react-router-dom`. Private route checks are used to restrict dashboards based on the role stored in local storage. Patient-side pages include the landing page, login screen, patient dashboard, and doctor dashboard. The admin project uses a dedicated React application with sectional navigation for overview, doctors, nurses, inventory, payments, and WhatsApp configuration.

The backend uses Express route files to separate logic into domain-specific modules. The `auth` route handles registration, login, and Google authentication. The `doctors` route retrieves and maintains doctor profiles. The `appointments` route supports booking, reading, updating, and deleting appointment records. Separate routes are defined for `nurses`, `inventory`, and `payment`. Mongoose models define the corresponding database schema for each entity.

This layered implementation supports maintainability and makes the code easier to understand, test, and extend.

## 4.2 STANDARDIZATION OF THE CODING

Coding standards are followed throughout the project to maintain readability and consistency. The React applications use modular component files and route-based page organization. Variable names, function names, and file names are kept descriptive so that each module clearly reflects its purpose.

The backend uses a route-model separation strategy that resembles MVC-style organization. Reusable patterns such as asynchronous request handling, JSON responses, status codes, and schema references are applied consistently. Common libraries like Axios, React Router, and Mongoose are used in standard ways so that future developers can understand the project quickly.

Modern JavaScript conventions are followed, including arrow functions, destructuring, `async/await`, and component-based reuse. This standardization improves maintainability, reduces ambiguity, and supports long-term scalability of the application.

## 4.3 ERROR HANDLING

Error handling is an important part of implementation because hospital workflows require reliable feedback when an operation fails. The project uses validation checks, `try-catch` blocks, HTTP status codes, and centralized response handling to reduce the impact of invalid operations.

Examples of handled error conditions include missing appointment fields, invalid MongoDB object IDs, invalid login credentials, payment session failures, missing access tokens during Google authentication, and not-found scenarios for appointment, nurse, or inventory records. Backend routes return appropriate error messages in JSON format, allowing the frontend to display user-friendly toast notifications.

On the frontend, toast notifications inform the user about success and failure states such as login failure, payment cancellation, data fetch issues, or appointment update problems. This approach improves transparency for the user while preserving application stability.

This chapter explained how the project is organized in code, how coding standards are preserved, and how error conditions are handled across the system. The next chapter presents the testing strategy and the observed results.

---

# CHAPTER 5

# TESTING AND RESULTS

## 5.1 TESTING

Testing was carried out to verify that the developed system satisfies functional expectations and supports stable interaction between modules. The project was evaluated through unit testing, integration testing, and validation testing. The purpose of testing was to confirm that each major operation behaved correctly, that connected modules exchanged data properly, and that the resulting application met user needs.

### 5.1.1 Unit Testing

Unit testing was used to verify individual functional modules independently.

**Table 5.1 Unit Testing Results**

| Module | Test Case | Expected Result | Observed Result | Status |
| --- | --- | --- | --- | --- |
| User Login | Submit valid email and password | User logs in and is redirected by role | Login flow succeeded and role-based navigation worked | Pass |
| User Registration | Submit valid registration details | New user account is created | User record created through auth route | Pass |
| Doctor Retrieval | Request doctor list | Available doctors are returned with profile details | Doctor list loaded in patient home and dashboard | Pass |
| Appointment Booking | Submit patient ID, doctor ID, date, and slot | Appointment record is created with initial status | Appointment saved and populated response returned | Pass |
| Payment Session | Request Stripe checkout session with valid amount | Checkout URL is created | Session URL returned from payment route | Pass |
| Inventory Update | Update stock item from admin panel | Inventory record is modified successfully | Backend update route returned updated data | Pass |

### 5.1.2 Integration Testing

Integration testing verified communication across connected modules.

**Table 5.2 Integration Testing Results**

| Integrated Modules | Scenario | Expected Result | Observed Result | Status |
| --- | --- | --- | --- | --- |
| Patient + Doctor + Appointment | Patient selects a doctor and books a slot | Appointment appears with linked doctor and patient details | Appointment retrieval showed populated relationships | Pass |
| Appointment + Payment | Payment success updates appointment payment status | Payment state is reflected in appointment record | Payment update endpoint modified appointment status | Pass |
| Admin + Doctors + Nurses | Admin dashboard loads staff modules | Doctors and nurses are available in admin sections | API data populated management screens | Pass |
| Admin + Inventory | Admin adds, edits, and deletes inventory items | Inventory collection reflects changes immediately | CRUD operations completed successfully | Pass |
| Doctor Dashboard + Appointments | Doctor views and updates appointment status | Queue refreshes with updated status | Status changes reflected in appointment list | Pass |

### 5.1.3 Validation Testing

Validation testing checked whether the system meets the intended user requirements in realistic usage scenarios.

**Table 5.3 Validation Testing Results**

| Requirement | Validation Activity | Result |
| --- | --- | --- |
| Patients must be able to create accounts and access booking features | Registered a patient and opened the patient dashboard | Satisfied |
| Patients must be able to book and pay for appointments | Completed doctor selection, slot selection, and payment initiation | Satisfied |
| Doctors must be able to view and manage consultation requests | Opened doctor dashboard and updated appointment status | Satisfied |
| Admin must manage staff and stock data | Opened admin screens for doctors, nurses, and inventory | Satisfied |
| System must present operational summaries | Verified overview dashboard cards and chart-based sections | Satisfied |

The testing process confirms that the core application workflow operates correctly. The system supports the primary needs of appointment booking, role-based access, staff management, and payment-linked consultation handling.

This chapter presented the testing methodology and summarized the results obtained across major modules. The final chapter concludes the project and outlines possible future enhancements.

---

# CHAPTER 6

# CONCLUSION AND FUTURE ENHANCEMENTS

## 6.1 CONCLUSION

The **Abhi SK Hospital Doctor Appointment Booking System** provides a practical and scalable digital solution for hospital appointment management. By integrating patient booking, doctor-side appointment handling, administrative monitoring, nurse management, inventory tracking, and online payment support into a unified platform, the project addresses several problems associated with traditional manual appointment workflows.

The use of the MERN-based architecture makes the system suitable for modern web deployment and future expansion. Patients gain a more transparent booking experience, doctors receive a structured consultation queue, and administrators gain better visibility into the operational state of the hospital. The project therefore demonstrates the usefulness of full-stack web technologies in improving healthcare service coordination and information management.

Overall, the system fulfills its intended objective of delivering a centralized, role-based, and user-friendly platform for doctor appointment booking and related hospital administration activities.

## 6.2 FUTURE ENHANCEMENTS

The following enhancements can further strengthen the system:

- Real-time doctor slot configuration with conflict prevention.
- SMS, email, and WhatsApp appointment reminders.
- Secure token-based authentication with JWT and password hashing.
- Telemedicine and video consultation integration.
- Electronic medical record attachment and document upload support.
- Advanced revenue, utilization, and patient analytics dashboards.
- Role-specific audit logs for administrative accountability.
- Mobile application support for patients and doctors.
- Queue prediction and waiting-time estimation using analytics.
- Integration with pharmacy, laboratory, and discharge workflows.

---

# APPENDICES

## A. SAMPLE CODING

The following code excerpts represent important parts of the implemented system.

### A.1 Authentication Route Sample

```js
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
```

### A.2 Appointment Booking Route Sample

```js
router.post('/', async (req, res) => {
    try {
        const { patientId, doctorId, date, timeSlot, paymentId, paymentAmount, paymentStatus } = req.body;

        if (!patientId || !doctorId || !date || !timeSlot) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['patientId', 'doctorId', 'date', 'timeSlot']
            });
        }

        const newAppt = new Appointment({
            patientId,
            doctorId,
            date,
            timeSlot,
            status: 'Pending',
            paymentStatus: paymentStatus || 'Pending',
            paymentAmount: paymentAmount || 0,
            paymentId: paymentId || '',
        });

        await newAppt.save();
        res.status(201).json(newAppt);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
```

### A.3 Appointment Schema Sample

```js
const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, default: 'Pending' },
    paymentStatus: { type: String, default: 'Pending' },
    paymentAmount: { type: Number, default: 0 },
    diagnosis: { type: String },
    prescription: { type: String },
    notes: { type: String }
}, { timestamps: true });
```

## B. SCREENSHOTS

Insert the actual screenshots from your application in this section before final submission. The recommended screenshot order is as follows:

- **Figure B.1** Landing Page
- **Figure B.2** Login Screen
- **Figure B.3** Doctor Listing View
- **Figure B.4** Appointment Booking Form
- **Figure B.5** Payment Redirection Screen
- **Figure B.6** Payment Success State
- **Figure B.7** Patient Appointment History
- **Figure B.8** Appointment Details Modal
- **Figure B.9** Doctor Appointment Queue
- **Figure B.10** Doctor Schedule Screen
- **Figure B.11** Admin Overview Screen
- **Figure B.12** Doctors Team Screen
- **Figure B.13** Nurses Team Screen
- **Figure B.14** Inventory Screen
- **Figure B.15** Payments Screen
- **Figure B.16** WhatsApp Configuration Screen

---

# REFERENCES

1. React Documentation. https://react.dev/
2. Node.js Documentation. https://nodejs.org/
3. Express.js Documentation. https://expressjs.com/
4. MongoDB Documentation. https://www.mongodb.com/docs/
5. Mongoose Documentation. https://mongoosejs.com/docs/
6. Stripe API Documentation. https://docs.stripe.com/
7. React Router Documentation. https://reactrouter.com/
8. Google Identity Services Documentation. https://developers.google.com/identity

---

# SUSTAINABLE DEVELOPMENT GOALS

The project contributes to the following Sustainable Development Goals:

- **SDG 3: Good Health and Well-Being**  
  The system improves access to healthcare services by making appointment booking and consultation coordination easier and more efficient.

- **SDG 9: Industry, Innovation and Infrastructure**  
  It promotes digital transformation in healthcare administration through modern web-based infrastructure.

- **SDG 10: Reduced Inequalities**  
  Online access to booking and doctor information can reduce barriers for patients who may find in-person scheduling difficult.

- **SDG 16: Peace, Justice and Strong Institutions**  
  Organized digital records and role-based administration support better transparency and accountable service management.
