## MySQL Database Design

### Table: appointments
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id)
- patient_id: INT, Foreign Key → patients(id)
- appointment_time: DATETIME, Not Null
- status: INT (0 = Scheduled, 1 = Completed, 2 = Cancelled)
- notes: TEXT NULLABLE

### Table: patients
- id: INT, Primary Key, Auto Increment
- username: VARCHAR(50), Not Null, UNIQUE
- first_name: VARCHAR(255), Not Null
- last_name: VARCHAR(255), Not Null
- phone: VARCHAR(20) Not Null
- email: VARCHAR(255), Not Null, UNIQUE
- password_hash: VARCHAR(255), Not Null
- date_of_birth: DATE NULLABLE
- address: VARCHAR(255) NULLABLE

### Table: doctors
- id: INT, Primary Key, Auto Increment
- username: VARCHAR(50), Not Null, UNIQUE
- first_name: VARCHAR(255), Not Null
- last_name: VARCHAR(255), Not Null
- email: VARCHAR(255), Not Null, UNIQUE
- password_hash: VARCHAR(255), Not Null
- specialty: VARCHAR(100), Not Null
- phone: VARCHAR(20) Not Null
- license_number: VARCHAR(50) UNIQUE NULLABLE

### Table: admins
- id: INT, Primary Key, Auto Increment
- username: VARCHAR(50), Not Null, UNIQUE
- password_hash: VARCHAR(255), Not Null
- email: VARCHAR(255), Not Null, UNIQUE

### Table: doctor_availability
- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctors(id), Not Null
- start_time: DATETIME, Not Null
- end_time: DATETIME, Not Null
- is_available: BOOLEAN DEFAULT TRUE

## MongoDB Collection Design

### Collection: prescriptions

**Justification:** Prescriptions are ideal for MongoDB because they can have a variable structure (different medications, dosages, instructions, free-form notes) and can benefit from embedded documents for medication details or pharmacy information. This allows for easier schema evolution without affecting the entire database if new fields are added to prescriptions.

**Example Document (JSON):**

```json
{
  "prescriptionId": "12345",
  "patientId": "67890",
  "doctorId": "54321",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "Every 8 hours",
      "duration": "7 days"
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "Every 6 hours",
      "duration": "3 days"
    }
  ],
  "tags": ["antibiotic", "pain relief"],
  "metadata": {
    "createdAt": "2023-10-01T12:00:00Z",
    "updatedAt": "2023-10-02T12:00:00Z",
    "status": "active"
  },
  "notes": "Patient should take medication with food."
}
```

### Collection: prescriptions

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