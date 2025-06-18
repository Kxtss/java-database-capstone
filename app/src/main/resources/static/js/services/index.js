// js/services/index.js

import { API_BASE_URL } from '../config/config.js';
import { patientLogin, patientSignup } from '../services/patientServices.js';

const ADMIN_API = API_BASE_URL + '/admin';
const DOCTOR_API = API_BASE_URL + '/doctor';

const modal = document.getElementById("modal");
const closeModalBtn = document.getElementById("closeModal");
const modalBody = document.getElementById("modal-body");

window.openModal = function(type) {
    modal.style.display = "block";
    modalBody.innerHTML = '';

    if (type === 'patientLogin') {
        modalBody.innerHTML = `
            <h3>Patient Login</h3>
            <form id="loginForm">
                <label for="loginEmail">Email:</label>
                <input type="email" id="loginEmail" required><br>
                <label for="loginPassword">Password:</label>
                <input type="password" id="loginPassword" required><br>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
            <p>Don't have an account? <a href="#" id="switchToSignup">Sign Up</a></p>
        `;
        document.getElementById('loginForm').addEventListener('submit', handlePatientLogin);
        document.getElementById('switchToSignup').addEventListener('click', (e) => {
            e.preventDefault();
            openModal('patientSignup');
        });
    } else if (type === 'patientSignup') {
        modalBody.innerHTML = `
            <h3>Patient Signup</h3>
            <form id="signupForm">
                <label for="signupName">Name:</label>
                <input type="text" id="signupName" required><br>
                <label for="signupEmail">Email:</label>
                <input type="email" id="signupEmail" required><br>
                <label for="signupPassword">Password:</label>
                <input type="password" id="signupPassword" required><br>
                <label for="signupPhone">Phone:</label>
                <input type="tel" id="signupPhone" pattern="[0-9]{10}" required><br>
                <label for="signupAddress">Address:</label>
                <input type="text" id="signupAddress" required><br>
                <button type="submit" class="btn btn-primary">Sign Up</button>
            </form>
            <p>Already have an account? <a href="#" id="switchToLogin">Login</a></p>
        `;
        document.getElementById('signupForm').addEventListener('submit', handlePatientSignup);
        document.getElementById('switchToLogin').addEventListener('click', (e) => {
            e.preventDefault();
            openModal('patientLogin');
        });
    } else if (type === 'adminLogin') {
        modalBody.innerHTML = `
            <h3>Admin Login</h3>
            <form id="adminLoginForm">
                <label for="adminUsername">Username:</label>
                <input type="text" id="adminUsername" required><br>
                <label for="adminPassword">Password:</label>
                <input type="password" id="adminPassword" required><br>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        `;
        document.getElementById('adminLoginForm').addEventListener('submit', window.adminLoginHandler);
    } else if (type === 'doctorLogin') {
        modalBody.innerHTML = `
            <h3>Doctor Login</h3>
            <form id="doctorLoginForm">
                <label for="doctorEmail">Email:</label>
                <input type="email" id="doctorEmail" required><br>
                <label for="doctorPassword">Password:</label>
                <input type="password" id="doctorPassword" required><br>
                <button type="submit" class="btn btn-primary">Login</button>
            </form>
        `;
        document.getElementById('doctorLoginForm').addEventListener('submit', window.doctorLoginHandler);
    } else if (type === 'addDoctor') {
        modalBody.innerHTML = `
            <h3>Add New Doctor</h3>
            <form id="addDoctorForm">
                <label for="addDoctorName">Name:</label>
                <input type="text" id="addDoctorName" required><br>

                <label for="addDoctorEmail">Email:</label>
                <input type="email" id="addDoctorEmail" required><br>

                <label for="addDoctorPhone">Phone:</label>
                <input type="tel" id="addDoctorPhone" pattern="[0-9]{10}" required><br>

                <label for="addDoctorPassword">Password:</label>
                <input type="password" id="addDoctorPassword" required><br>

                <label for="addDoctorSpecialty">Specialty:</label>
                <input type="text" id="addDoctorSpecialty" required><br>

                <label for="addDoctorAvailability">Availability (JSON array of {startTime, endTime} or text):</label>
                <input type="text" id="addDoctorAvailability" placeholder='e.g., [{"startTime":"09:00", "endTime":"17:00"}]' required><br>

                <button type="submit" class="btn btn-primary">Add Doctor</button>
            </form>
        `;
        if (typeof window.adminAddDoctor === 'function') {
            document.getElementById('addDoctorForm').addEventListener('submit', window.adminAddDoctor);
        } else {
            console.error("window.adminAddDoctor is not defined. Ensure adminDashboard.js is loaded and its functions are global.");
            alert("Error: Admin add doctor functionality is not initialized.");
        }
    }
};

window.closeModal = function() {
    modal.style.display = "none";
};

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
}

async function handlePatientLogin(event) {
    event.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
        const response = await patientLogin({ email, password });
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "loggedPatient");
        alert("Login successful!");
        window.location.href = "/pages/loggedPatientDashboard.html";
    } catch (error) {
        alert(`Login failed: ${error.message || "Unknown error"}`);
        console.error("Login error:", error);
    }
}

async function handlePatientSignup(event) {
    event.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const phone = document.getElementById("signupPhone").value;
    const address = document.getElementById("signupAddress").value;

    try {
        const result = await patientSignup({ name, email, password_hash: password, phone, address });
        if (!result.success) {
            throw new Error(result.message);
        }
        alert(`Signup successful! Welcome, ${name}. Please log in.`);
        closeModal();
        openModal('patientLogin');
    } catch (error) {
        alert(`Signup failed: ${error.message || "Unknown error"}`);
        console.error("Signup error:", error);
    }
}

window.adminLoginHandler = async function(event) {
    event.preventDefault();
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    try {
        const response = await fetch(`${ADMIN_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Invalid credentials");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "admin");
        alert("Admin login successful!");
        window.location.href = "/pages/adminDashboard.html";
    } catch (error) {
        console.error("Admin login error:", error);
        alert(`Admin login failed: ${error.message || "Unknown error"}`);
    }
};

window.doctorLoginHandler = async function(event) {
    event.preventDefault();
    const email = document.getElementById("doctorEmail").value;
    const password = document.getElementById("doctorPassword").value;

    try {
        const response = await fetch(`${DOCTOR_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Invalid credentials");
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("userRole", "doctor");
        alert("Doctor login successful!");
        window.location.href = "/pages/doctorDashboard.html";
    } catch (error) {
        console.error("Doctor login error:", error);
        alert(`Doctor login failed: ${error.message || "Unknown error"}`);
    }
};

window.attachHeaderButtonListeners = function() {
    const patientLoginHeaderBtn = document.getElementById("patientLogin");
    const patientSignupHeaderBtn = document.getElementById("patientSignup");
    const adminLoginHeaderBtn = document.getElementById("adminLogin");
    const doctorLoginHeaderBtn = document.getElementById("doctorLogin");

    if (patientLoginHeaderBtn) {
        patientLoginHeaderBtn.onclick = () => openModal('patientLogin');
    }
    if (patientSignupHeaderBtn) {
        patientSignupHeaderBtn.onclick = () => openModal('patientSignup');
    }
    if (adminLoginHeaderBtn) {
        adminLoginHeaderBtn.onclick = () => openModal('adminLogin');
    }
    if (doctorLoginHeaderBtn) {
        doctorLoginHeaderBtn.onclick = () => openModal('doctorLogin');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.attachHeaderButtonListeners();
});