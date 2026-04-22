Mapping out your page structure before writing a single line of React code is the smartest way to prevent messy routing later. Since we are building this with a modern "Bento Box" light theme and a strict Role-Based Access Control (RBAC) system, your frontend should be separated into clean, protected routes.

Here is the complete frontend page structure and the specific "work" (responsibilities) of each page.

### 🌐 1. Public & Authentication Routes
These pages are accessible to anyone and handle the entry points into the system.

* **`/` (Landing Page):** A beautiful, simple homepage introducing the library portal, maybe highlighting the competition theme ("Digital Innovation"). Contains a prominent "Login" button.
* **`/login` (Unified Login Gate):** A single login form (Enrollment/ID + Password). Your backend will check the credentials and automatically redirect the user to their respective dashboard (`/student`, `/librarian`, or `/admin`) based on their role token.
* **`/forgot-password`:** A simple form to request a password reset link to the university email.

---

### 🎓 2. Student Portal Routes (`/student/...`)
*Protected routes. Only accessible if the active user has the 'student' role.*

* **`/student/dashboard` (The Bento Box Hub):**
    * *Work:* The main landing area. Displays the GitHub-style attendance heatmap, the live circular progress chart for Reading Hub Seat Vacancy, and the Admin Notice Board alerts.
* **`/student/catalog` (Book Discovery):**
    * *Work:* Houses the main search bar, the "Trending by Domain" horizontal carousel, and the main grid of books. Handles the "Join Waitlist" button interactions.
* **`/student/history` (Reading & Activity):**
    * *Work:* A clean table showing currently checked-out books (with color-coded due dates) and a history log of past reads.
* **`/student/fines` (Penalty Management):**
    * *Work:* Displays active fine amounts and generates the dynamic UPI QR code for instant, self-service payment.
* **`/student/facility` (Complaints):**
    * *Work:* A simple form to submit a new ticket (e.g., "Broken AC") and a timeline view of their previously submitted tickets (Pending/Resolved).
* **`/student/profile` (The No-Dues Engine):**
    * *Work:* Shows personal academic details. Houses the crucial **"Generate No-Dues Certificate"** button, which runs the zero-fine/zero-book check and renders a downloadable verified badge.

---

### 📚 3. Librarian Portal Routes (`/librarian/...`)
*Protected routes. Only accessible to 'librarian' accounts.*

* **`/librarian/pos` (Rapid Circulation Screen):**
    * *Work:* The ultra-fast, minimalist barcode scanning page. Two inputs only: Student ID and Book ID. Instantly issues or returns books and flashes success messages.
* **`/librarian/students` (Student CRM):**
    * *Work:* A data table of all students. Includes the drag-and-drop zone for **Bulk CSV Student Uploads**. Clicking a student opens a modal to see their individual reading/fine history.
* **`/librarian/inventory` (Catalog Management):**
    * *Work:* A table of all physical books. Includes the drag-and-drop zone for **Bulk CSV Book Uploads**. Allows the librarian to toggle a book's status to "Damaged" or "Lost."
* **`/librarian/defaulters` (Action Center):**
    * *Work:* A prioritized list of students with overdue books. Includes a "Send Reminder" button to manually ping specific students.

---

### ⚙️ 4. Admin Portal Routes (`/admin/...`)
*Protected routes. Only accessible to 'admin' superusers.*

* **`/admin/dashboard` (Master Telemetry):**
    * *Work:* The visual heavy-hitter. Uses Recharts/Chart.js to display total live occupancy, footfall trends, inventory health (issued vs. available), and total fine revenue collected.
* **`/admin/complaints` (Facility Kanban):**
    * *Work:* A central list or Kanban board of all student complaints. Admins click a switch to flip tickets from Red (Pending) to Green (Resolved).
* **`/admin/notices` (Global Megaphone):**
    * *Work:* A WYSIWYG text editor to draft, format, and publish global announcements that will appear on the Student Dashboard.
* **`/admin/staff` (Librarian Management):**
    * *Work:* Add, edit, or remove librarian accounts and reset their passwords.

---

### 📁 Suggested React Folder Structure
To keep this organized as you code, structure your `src` folder by features rather than file types:

```text
src/
├── components/          # Reusable UI (Buttons, BentoCards, Navbar, QRScanner)
├── layouts/             # Layout wrappers (StudentLayout, AdminLayout with Sidebars)
├── pages/
│   ├── auth/            # Login.jsx
│   ├── student/         # StudentDashboard.jsx, StudentCatalog.jsx, etc.
│   ├── librarian/       # POS.jsx, Inventory.jsx, etc.
│   └── admin/           # AdminDashboard.jsx, Complaints.jsx, etc.
├── context/             # AuthContext.jsx (to hold the JWT token and user role)
└── utils/               # API call helpers, date formatters
```

This structure maps perfectly to your Requirements Specification and ensures the codebase remains maintainable as the project scales. 
