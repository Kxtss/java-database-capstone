// js/adminDashboard.js

import { getDoctors, filterDoctors, saveDoctor } from '../services/doctorServices.js';
import { createDoctorCard } from '../components/doctorCard.js';
import { openModal } from '../services/index.js';

const addDoctorBtn = document.getElementById("addDocBtn");
const doctorContentDiv = document.getElementById("doctor-cards-container");
const searchBar = document.getElementById("searchBar");
const filterTime = document.getElementById("filterTime");
const filterSpecialty = document.getElementById("filterSpecialty");

if (addDoctorBtn) {
    addDoctorBtn.addEventListener("click", () => {
        openModal('addDoctor');
    });
}

if (searchBar) {
    searchBar.addEventListener("input", filterDoctorsOnChange);
}
if (filterTime) {
    filterTime.addEventListener("change", filterDoctorsOnChange);
}
if (filterSpecialty) {
    filterSpecialty.addEventListener("change", filterDoctorsOnChange);
}

export async function loadDoctorCards() {
    try {
        const doctors = await getDoctors();
        renderDoctorCards(doctors);
    } catch (error) {
        console.error("Error loading doctor cards:", error);
        if (doctorContentDiv) {
            doctorContentDiv.innerHTML = `<p style="color: red;">Error loading doctors: ${error.message || 'Unknown error'}</p>`;
        }
    }
}

async function filterDoctorsOnChange() {
    const name = searchBar ? searchBar.value.trim() : "";
    const time = filterTime ? filterTime.value : "";
    const specialty = filterSpecialty ? filterSpecialty.value : "";

    try {
        const doctors = await filterDoctors(name, time, specialty);
        if (doctors.length > 0) {
            renderDoctorCards(doctors);
        } else {
            if (doctorContentDiv) {
                doctorContentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
            }
        }
    } catch (error) {
        console.error("Error filtering doctors:", error);
        alert("❌ An error occurred while filtering doctors.");
        if (doctorContentDiv) {
            doctorContentDiv.innerHTML = `<p style="color: red;">Error filtering doctors: ${error.message || 'Unknown error'}</p>`;
        }
    }
}

function renderDoctorCards(doctors) {
    if (doctorContentDiv) {
        doctorContentDiv.innerHTML = "";
        if (doctors && doctors.length > 0) {
            doctors.forEach(doctor => {
                const card = createDoctorCard(doctor);
                doctorContentDiv.appendChild(card);
            });
        } else {
            doctorContentDiv.innerHTML = "<p>No doctors available.</p>";
        }
    }
}

window.adminAddDoctor = async function(event) {
    event.preventDefault();

    const name = document.getElementById("addDoctorName").value;
    const email = document.getElementById("addDoctorEmail").value;
    const phone = document.getElementById("addDoctorPhone").value;
    const password = document.getElementById("addDoctorPassword").value;
    const specialty = document.getElementById("addDoctorSpecialty").value;
    const availabilityInput = document.getElementById("addDoctorAvailability").value;

    const adminToken = localStorage.getItem("token");
    if (!adminToken) {
        alert("Unauthorized: Admin token not found. Please log in again.");
        window.location.href = "/";
        return;
    }

    let availability = [];
    try {
        availability = JSON.parse(availabilityInput);
    } catch (e) {
        console.warn("Could not parse availability as JSON, sending as simple string or empty array:", availabilityInput);
        availability = availabilityInput ? [{ startTime: availabilityInput, endTime: "" }] : [];
    }

    const doctorData = {
        name,
        email,
        phone,
        password,
        specialty,
        availability
    };

    try {
        const result = await saveDoctor(doctorData, adminToken);
        if (result.success) {
            alert(result.message || `${name} added successfully!`);
            window.closeModal();
            loadDoctorCards();
        } else {
            throw new Error(result.message || "Failed to add doctor.");
        }
    } catch (error) {
        console.error("Error adding doctor:", error);
        alert(`Error adding doctor: ${error.message || "Unknown error"}`);
    }
};

document.addEventListener("DOMContentLoaded", () => {
    if (window.renderContent) {
        window.renderContent();
    }
    loadDoctorCards();
});