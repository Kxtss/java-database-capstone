## Admin User Stories

**Title:** _As an Administrator, I want to log with my username and password, so that manage the platform securely._

**Acceptance Criteria:**
1. A dedicated login page is displayed when the application starts or when a session expires.
2. I must be able to use a unique Username and a confidential Password to log in.
3. Upon successful login, I am redirected to an Administrator dashboard with tools to manage the platform.
4. Incorrect credentials display an error message without revealing specific details about username or password validity.

* **Priority:** High.
* **Story Points:** 5
* **Notes:**
    * Password hashing and salting should be implemented for security.
    * Usernames should be unique.


**Title:** _As an Administrator, I want to log out of the platform, so that protect access to the system._

**Acceptance Criteria:**
1. A clearly visible "Log Out" button is available on all authenticated administrator pages.
2. Clicking the "Log Out" button redirects me to the login view.
3. After logging out, all active sessions for the administrator are terminated, and I cannot access any administrative pages without re-authenticating.

* **Priority:** High.
* **Story Points:** 3
* **Notes:**
    * Ensure session invalidation is robust across all browsers/devices.
    * The "Log Out" button should be easily accessible.

**Title:** _As an Administrator, I want to add Doctors to the platform._

**Acceptance Criteria:**
1. An "Add Doctor" button or link is available on the administrator dashboard or a dedicated management page.
2. Only an administrator with appropriate permissions can access this functionality and create/add a new Doctor profile.
3. A form is provided to enter necessary information about the Doctor (e.g., name, email, specialty, contact number, initial password).
4. All required fields are validated before submission (e.g., email format, unique email/username).
5. Upon successful addition, a confirmation message is displayed, and the new doctor appears in the doctor list.

* **Priority:** Medium.
* **Story Points:** 8
* **Notes:**
    * Consider generating an initial random password for new doctors and prompting them to change it on first login.
    * How will specialties be managed (e.g., predefined list or free text)?

**Title:** _As an Administrator, I want to delete a Doctor perfil at the platform._

**Acceptance Criteria:**
1. A "Delete" button or icon is available next to each doctor's profile on the doctor management page.
2. Only an administrator with appropriate permissions can delete a Doctor profile.
3. A confirmation dialog appears before deletion to prevent accidental removal.
4. Upon confirmation, the doctor's information is removed from the system.
5. All associated data (e.g., appointments if applicable) related to the deleted doctor are handled appropriately (e.g., unlinked, archived, or deleted based on business rules).

* **Priority:** Medium
* **Story Points:** 5
* **Notes:**
    * What happens to past appointments associated with a deleted doctor? (e.g., mark as cancelled, keep for historical reporting).
    * Consider soft-delete (marking as inactive) instead of hard-delete for auditing purposes.
    * Implement proper authorization checks to ensure only authorized administrators can perform this action.

**Title:** _As an Administrator, I want to execute a procedure on MySQL CLI, to that retrieved the monthly cites and track use statics._

**Acceptance Criteria:**
1. A SQL stored procedure exists in the MySQL database specifically designed to retrieve the number of appointments per month.
2. The procedure accepts necessary parameters (e.g., start date, end date, or year) to filter the data.
3. When executed from the MySQL CLI, the procedure returns clear and accurate results showing the monthly appointment count.
4. The output allows for easy tracking of usage statistics over time.

* **Priority:** Low.
* **Story Points:** 3
* **Notes:**
    * Specify the exact table(s) the stored procedure should query (e.g., `appointments` table).
    * Consider potential edge cases for months with no appointments.
    * This procedure is for direct CLI access; no GUI integration is required for this specific story.

## Patient User Stories

**Title:** _As a Patient, I want to view a list of doctors without logging in, so that I can explore options before registering._

**Acceptance Criteria:**
1. A public-facing page is accessible from the main website.
2. The page displays a list of available doctors.
3. Each doctor's entry includes essential information (e.g., name, specialty, contact details if public).
4. No login is required to access this list.

* **Priority:** High
* **Story Points:** 3
* **Notes:**
    * This list should be filterable/searchable by specialty.
    * The information displayed should be non-sensitive and publicly available.

**Title:** _As a Patient, I want to register using my email and password, so that I can book appointments._

**Acceptance Criteria:**
1. A "Register" or "Sign Up" option is clearly visible on the login/landing page.
2. A registration form is provided for new patients to enter their email, password, and other required personal details (e.g., name, phone number).
3. All required fields are validated before submission (e.g., email format, password strength).
4. Upon successful registration, a confirmation message is displayed, and I can then log in.
5. Email and username must be unique.

* **Priority:** High
* **Story Points:** 8
* **Notes:**
    * Implement strong password policies (min length, special characters, etc.).
    * Consider email verification as part of the registration process.
    * Error handling for duplicate registrations.

**Title:** _As a Patient, I want to log in to the portal, so that I can manage my bookings._

**Acceptance Criteria:**
1. A dedicated login page is displayed.
2. I must be able to use my registered email and password to log in.
3. Upon successful login, I am redirected to my personalized patient dashboard where I can see and manage my bookings.
4. Incorrect credentials display an error message.

* **Priority:** High
* **Story Points:** 5
* **Notes:**
    * Secure password handling (hashing).
    * Account lockout policy after multiple failed login attempts.

**Title:** _As a Patient, I want to log out of the portal, so that I can secure my account._

**Acceptance Criteria:**
1. A clearly visible "Log Out" button is available on my patient dashboard and other authenticated pages.
2. Clicking the "Log Out" button redirects me to the login page.
3. After logging out, my active session is terminated, and I cannot access my account without re-authenticating.

* **Priority:** High
* **Story Points:** 3
* **Notes:**
    * Ensure all session data is cleared upon logout.
    * Button should be intuitively placed.

**Title:** _As a Patient, I want to view my upcoming appointments, so that I can prepare adequately._

**Acceptance Criteria:**
1. On my patient dashboard, there is a section displaying "My Appointments".
2. This section lists all my future appointments, including doctor's name, date, time, and specialty.
3. I can see details of each upcoming appointment.
4. The list is clearly organized (e.g., chronologically).

* **Priority:** Medium
* **Story Points:** 5
* **Notes:**
    * Allow filtering or sorting of appointments (e.g., by doctor, date).
    * Potentially include an option to add appointments to personal calendar.
    * What information is visible for each appointment? (e.g. status, location, notes).

## Doctor User Stories

**Title:** _As a Doctor, I want to log in to the portal, so that I can manage my appointments._

**Acceptance Criteria:**
1. A dedicated login page is displayed.
2. I must be able to use my unique username/email and password to log in.
3. Upon successful login, I am redirected to my Doctor dashboard, where I can see my schedule and management tools.
4. Incorrect credentials display an error message without revealing specific details about validity.

* **Priority:** High
* **Story Points:** 5
* **Notes:**
    * Implement password hashing and salting for security.
    * Usernames/emails should be unique across doctor and admin roles, or handled with clear role separation.

**Title:** _As a Doctor, I want to log out of the portal, so that I can protect my data._

**Acceptance Criteria:**
1. A clearly visible "Log Out" button is available on all authenticated doctor pages.
2. Clicking the "Log Out" button redirects me to the login view.
3. After logging out, all active sessions for the doctor are terminated, and I cannot access any doctor-specific pages without re-authenticating.

* **Priority:** High
* **Story Points:** 3
* **Notes:**
    * Ensure session invalidation is robust across all browsers/devices.
    * The "Log Out" button should be easily accessible.

**Title:** _As a Doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**
1. On my Doctor dashboard, there is a prominent section displaying my appointment calendar.
2. I can view my appointments for the current day, week, and month.
3. Each appointment entry clearly shows the patient's name, time, and reason for consultation.
4. I can easily navigate between different dates/views (e.g., previous/next day/week).

* **Priority:** High
* **Story Points:** 8
* **Notes:**
    * Consider different calendar views (e.g., list view, daily view, weekly view).
    * Should highlight available vs. booked slots.
    * Option to filter appointments (e.g., by status: confirmed, pending, cancelled).

**Title:** _As a Doctor, I want to mark my unavailability, so that patients are only informed about available times._

**Acceptance Criteria:**
1. I can access a feature on my dashboard to manage my availability.
2. I can select specific dates and/or time blocks to mark myself as unavailable.
3. When I mark unavailability, these slots are no longer bookable by patients.
4. My calendar clearly reflects my marked unavailable periods.

* **Priority:** Medium
* **Story Points:** 8
* **Notes:**
    * Differentiate between one-time unavailability and recurring unavailability.
    * Consider how far in advance unavailability can be set.
    * Should trigger notifications to patients with existing appointments if availability changes drastically (out of scope for this story, but a future consideration).

**Title:** _As a Doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._

**Acceptance Criteria:**
1. I can navigate to an "Edit Profile" or "My Profile" section on my dashboard.
2. A form is provided allowing me to update my personal details, contact information, and medical specialization(s).
3. All updated fields are validated before submission (e.g., valid email, phone number format).
4. Upon successful update, a confirmation message is displayed, and the changes are reflected immediately.

* **Priority:** Medium
* **Story Points:** 5
* **Notes:**
    * Consider which fields are editable by the doctor versus fields that require administrator approval.
    * How will specialization options be presented (e.g., dropdown list, free text)?
    * Ensure data integrity and security during updates.
