# Backend Specification & Integration Plan

This document outlines the technical specification for the **Jawaharlal Nehru Library Management System** backend and its integration with the React-based frontend.

## 1. Technology Stack
- **Runtime:** Node.js / Bun
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs for password hashing
- **Integration:** Axios (Frontend) & CORS (Backend)

---

## 2. Database Schema (Mongoose Models)

### Student Model (`Student.model.js`)
- `enrollmentNumber`: Unique ID (Primary Key)
- `password`: Hashed string
- `name`: Full name
- `department`: e.g., "Computer Science"
- `semester`: Current semester (1-8)
- `email`: Contact email
- `fatherName`: Required for records
- `totalActiveFines`: Calculated fine amount
- `attendanceHistory`: Array of timestamps for heatmap

### Librarian Model (`Librarian.model.js`)
- `employeeId`: Unique ID
- `password`: Hashed string
- `name`: Staff name
- `assignedShift`: Morning/Evening/Night

### Admin Model (`Admin.model.js`)
- `adminId`: Unique ID
- `password`: Hashed string
- `name`: Admin name
- `permissions`: Level of access

### Book Model (`Book.model.js`) [PENDING]
- `isbn`: Unique Identifier
- `title`: Book title
- `author`: Author name
- `category`: Genre/Subject
- `copies`: Total vs Available
- `shelfLocation`: Physical location in library

### Transaction Model (`Transaction.model.js`)
- `bookId`: Reference to Book
- `studentId`: Reference to Student
- `issueDate`: Date of issue
- `dueDate`: Calculated return date
- `status`: issued/returned/overdue
- `fineAmount`: Accrued fine

### Complaint Model (`Complaint.model.js`)
- `studentId`: Reference to Student
- `issueDescription`: Text of the complaint/issue
- `status`: Pending/Resolved

---

## 3. API Architecture

### Authentication Routes (`/api/auth`)
- `POST /login`: Validates credentials for all roles (Student/Librarian/Admin)
- `POST /logout`: Invalidates session (client-side)

### Student Portal Endpoints (`/api/student`)
- `GET /profile`: Fetch student details and fine status
- `GET /history`: Fetch personal issue/return history
- `GET /catalog`: Search and filter books
- `POST /reserve`: Reserve a study hub or book

### Librarian Portal Endpoints (`/api/librarian`)
- `POST /issue`: Process a new book issue (POS)
- `POST /return`: Process a return and calculate fines
- `GET /inventory`: Manage book counts and locations
- `GET /defaulters`: List students with overdue books

### Admin Portal Endpoints (`/api/admin`)
- `GET /telemetry`: Global stats (Active users, books, fines)
- `POST /notices`: Publish new institutional notices
- `POST /staff`: Manage Librarian accounts and shifts

---

## 4. Frontend-Backend Connectivity

### Environment Configuration
- **Backend:** Create a `.env` file with `MONGODB_URI` and `JWT_SECRET`.
- **Frontend:** Create a `.env` file with `VITE_API_URL`.

### Authentication Flow
1. User logs in via `Login.jsx`.
2. Backend returns a **JWT Token** and **User Role**.
3. Frontend stores token in `localStorage` or `Cookie`.
4. `AuthContext.jsx` manages the global user state and provides it to `AppLayout`.

### Data Fetching Strategy
- Use **Axios Interceptors** to automatically attach the JWT token to every request.
- Use **React Query (TanStack Query)** for caching and state management of dashboard metrics.

---

## 5. Security Checklist
- [ ] Implement `bcryptjs` for all password storage.
- [ ] Use `express-validator` for input sanitization.
- [ ] Enable `CORS` with specific origin restrictions.
- [ ] Implement Route Guards in React (`ProtectedRoute` component).
- [ ] Error Handling: Standardized JSON responses for all API failures.

---

## 6. Development Roadmap
1. **Phase 1:** Complete missing Mongoose models (`Book`, `Notice`).
2. **Phase 2:** Implement Auth Controller and Middleware.
3. **Phase 3:** Create Dashboard Telemetry endpoints.
4. **Phase 4:** Hook up Frontend `Axios` calls to existing UI shells.
