## MySQL Database Design

### Table: appointments

- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id), Not Null
- patient_id: INT, Foreign Key → patients(id), Not null
- appointment_time: DATETIME, Not Null
- status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)

### Table: patients

- id: INT, Primary Key, Auto Increment
- name: VARCHAR(255), Not Null
- phone: VARCHAR(10), Not Null
- email: VARCHAR(255), Not Null, UNIQUE
- password_hash: VARCHAR(255), Not Null
- address: VARCHAR(255), Not Null

### Table: doctors

- id: INT, Primary Key, Auto Increment
- name: VARCHAR(255), Not Null
- email: VARCHAR(255), Not Null, UNIQUE
- password_hash: VARCHAR(255), Not Null
- specialty: VARCHAR(100), Not Null
- phone: VARCHAR(10), Not Null

### Table: admins

- id: INT, Primary Key, Auto Increment
- username: VARCHAR(50), Not Null, UNIQUE
- password_hash: VARCHAR(255), Not Null
- email: VARCHAR(255), Not Null, UNIQUE

### Table: doctor_availability

- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id)
- start_time: DATETIME, Not Null
- end_time: DATETIME, Not Null
- is_available: BOOLEAN DEFAULT TRUE

## MongoDB Collection Design

### Collection: prescriptions

**Justification:** Prescriptions are ideal for MongoDB due to their flexible nature. They allow for a dynamic schema for
medication details, dosages, and instructions, facilitating schema evolution (e.g., adding new fields like `refillCount`
or `pharmacy` without affecting the entire database). The use of embedded objects (like `pharmacy`) encapsulates related
information, which improves readability and reduces the need for complex joins, optimizing performance in NoSQL
databases.

**Example Document (JSON):**

```json
{
  "_id": "ObjectId('64abc123456')",
  "patientName": "John Smith",
  "appointmentId": 51,
  "medication": "Paracetamol",
  "dosage": "500mg",
  "doctorNotes": "Take 1 tablet every 6 hours.",
  "refillCount": 2,
  "pharmacy": {
    "name": "Walgreens SF",
    "location": "Market Street"
  }
}
```