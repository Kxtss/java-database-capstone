package com.project.back_end.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Doctor cannot be null")
    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private Doctor doctor;

    @NotNull(message = "Patient cannot be null")
    @ManyToOne
    @JoinColumn(name = "patient_id")
    private Patient patient;

    @NotNull(message = "Appointment Time cannot be null")
    @Future(message = "Appointment Time must be in the future")
    private LocalDateTime appointmentTime;

    @NotNull(message = "Status cannot be null")
    @Min(value = 0, message = "Satus must be 0 (Scheduled), 1 (Completed), or 2 (Cancelled)")
    @Max(value = 2, message = "Satus must be 0 (Scheduled), 1 (Completed), or 2 (Cancelled)")
    private int status; // 0 = scheduled, 1 = completed, 2 = cancelled

    public Appointment() {
    }

    public Appointment(Doctor doctor, Patient patient, LocalDateTime appointmentTime, int status) {
        this.doctor = doctor;
        this.patient = patient;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    public Appointment(Long id, Doctor doctor, Patient patient, LocalDateTime appointmentTime, int status) {
        this.id = id;
        this.doctor = doctor;
        this.patient = patient;
        this.appointmentTime = appointmentTime;
        this.status = status;
    }

    @Transient
    public LocalDateTime getEndTime() {
        if (this.appointmentTime == null) {
            return null;
        }
        return this.appointmentTime.plusHours(1);
    }

    @Transient
    public LocalDate getAppointmentDate() {
        if (this.appointmentTime == null) {
            return null;
        }
        return this.appointmentTime.toLocalDate();
    }

    @Transient
    public LocalTime getAppointmentTimeOnly() {
        if (this.appointmentTime == null) {
            return null;
        }
        return this.appointmentTime.toLocalTime();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public LocalDateTime getAppointmentTime() {
        return appointmentTime;
    }

    public void setAppointmentTime(LocalDateTime appointmentTime) {
        this.appointmentTime = appointmentTime;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Appointment{" +
                "id=" + id +
                ", doctorId=" + (doctor != null ? doctor.getId() : "null") +
                ", patientId=" + (patient != null ? patient.getId() : "null") +
                ", appointmentTime=" + appointmentTime +
                ", status=" + status +
                '}';
    }
}

