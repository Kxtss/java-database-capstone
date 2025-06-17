package com.project.back_end.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "patients")
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Name cannot be null")
    @NotBlank(message = "Name cannot be empty")
    @Size(min = 5, max = 255, message = "Name must be between 5 and 255 characters")
    private String name;

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

    @Column(length = 255)
    @Size(max = 255, message = "Address must be valid")
    @NotNull(message = "Address cannot be null")
    private String address;

    public Patient() {
    }

    public Patient(String name, String email, String password_hash, String phone, String address) {
        this.name = name;
        this.email = email;
        this.password_hash = password_hash;
        this.phone = phone;
        this.address = address;
    }

    public Patient(Long id, String name, String email, String password_hash, String phone, String address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password_hash = password_hash;
        this.phone = phone;
        this.address = address;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Override
    public String toString() {
        return "Patient{" + "id=" + id + ", name='" + name + '\'' + ", email='" + email + '\'' + ", phone='" + phone + '\'' + ", address='" + address + '\'' + '}';
    }
}
