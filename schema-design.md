## MySQL Database Design

### Table: doctor

- id: INT, Primary Key, Auto Increment
- name: VARCHAR(255), Not Null
- email: VARCHAR(255), Not Null, UNIQUE
- password: VARCHAR(255), Not Null
- specialty: VARCHAR(100), Not Null
- phone: VARCHAR(20), Not Null

### Table: doctor_available_times

- doctor_id: INT, Foreign Key → doctor(id)
- available_times: VARCHAR(20), Not Null

### Table: patient

- id: INT, Primary Key, Auto Increment
- name: VARCHAR(255), Not Null
- email: VARCHAR(255), Not Null, UNIQUE
- password: VARCHAR(255), Not Null
- phone: VARCHAR(20), Not Null
- address: VARCHAR(255), Not Null

### Table: appointment

- id: INT, Primary Key, Auto Increment
- doctor_id: INT, Foreign Key → doctor(id), Not Null
- patient_id: INT, Foreign Key → patient(id), Not Null
- appointment_time: DATETIME(6), Not Null
- status: INT (0 = Scheduled, 1 = Completed)

### Table: admin

- username: VARCHAR(50), Not Null
- password: VARCHAR(255), Not Null

## MongoDB Collection Design

### Collection: prescriptions

**Justification:** Prescriptions are ideal for MongoDB due to their flexible nature. This design allows for easy
document updates and efficient querying of prescription data. The schema can be extended without affecting existing
records, making it perfect for evolving medical prescription requirements.

**Document Structure:**

```json 
{
  "_id": "ObjectId",
  "patientName": "String",
  "appointmentId": "Number",
  "medication": "String",
  "dosage": "String",
  "doctorNotes": "String",
  "_class": "String"
}
```