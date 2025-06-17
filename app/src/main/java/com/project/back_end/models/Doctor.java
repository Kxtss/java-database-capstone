package com.project.back_end.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be empty")
    @Size(min = 5, max = 255, message = "Name must be between 5 and 255 characters")
    private String name;

    @NotNull(message = "Specialty cannot be null")
    @NotBlank(message = "Specialty cannot be empty")
    @Size(min = 3, max = 100, message = "Speciality must be between 3 and 100 characters")
    private String specialty;

    @Email(message = "Email should be valid")
    @NotNull(message = "Email cannot be null")
    @Column(unique = true, length = 255)
    @Size(min = 3, max = 255, message = "Email must be between 3 and 255 characters")
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull(message = "Password cannot be null")
    @NotBlank(message = "Password cannot be empty")
    @Size(min = 6, max = 255, message = "Password must be between 6 and 255 characters")
    private String password_hash;

    @NotNull(message = "Phone cannot be null")
    @NotBlank(message = "Phone cannot be empty")
    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    @Column(length = 12)
    private String phone;

    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<DoctorAvailability> availableTimes = new ArrayList<>();

    public Doctor() {
    }

    public Doctor(String name, String specialty, String email, String password_hash, String phone) {
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.password_hash = password_hash;
        this.phone = phone;
    }

    public Doctor(String name, String specialty, String email, String password_hash, String phone, List<DoctorAvailability> availableTimes) {
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.password_hash = password_hash;
        this.phone = phone;
        this.availableTimes = availableTimes;
    }

    public Doctor(Long id, String name, String specialty, String email, String password_hash, String phone) {
        this.id = id;
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.password_hash = password_hash;
        this.phone = phone;
    }

    public Doctor(Long id, String name, String specialty, String email, String password_hash, String phone, List<DoctorAvailability> availableTimes) {
        this.id = id;
        this.name = name;
        this.specialty = specialty;
        this.email = email;
        this.password_hash = password_hash;
        this.phone = phone;
        this.availableTimes = availableTimes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword_hash() {
        return password_hash;
    }

    public void setPassword_hash(String password_hash) {
        this.password_hash = password_hash;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<DoctorAvailability> getAvailableTimes() {
        return availableTimes;
    }

    public void setAvailableTimes(List<DoctorAvailability> availableTimes) {
        this.availableTimes = availableTimes;
    }

    public void addDoctorAvailability(DoctorAvailability availability) {
        if (!this.availableTimes.contains(availability)) {
            this.availableTimes.add(availability);
            availability.setDoctor(this);
        }
    }

    public void removeDoctorAvailability(DoctorAvailability availability) {
        if (this.availableTimes.contains(availability)) {
            this.availableTimes.remove(availability);
            availability.setDoctor(null);
        }
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", specialty='" + specialty + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                '}';
    }
}

