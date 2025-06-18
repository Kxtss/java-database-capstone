// js/doctorDashboard.js

import { getPatientAppointments } from '../services/patientServices.js';
import { createPatientRow } from '../components/patientRows.js';

const appointmentsTableBody = document.getElementById("patient-appointments-table-body");
const datePicker = document.getElementById("datePicker");
const todayButton = document.getElementById("todayButton");
const searchBar = document.getElementById("searchBar");

let selectedDate = new Date().toISOString().slice(0, 10);
let token = localStorage.getItem("token");
let doctorId = localStorage.getItem("userId");
let patientName = "";

if (datePicker) {
    datePicker.value = selectedDate;
}

if (searchBar) {
    searchBar.addEventListener("input", () => {
        patientName = searchBar.value.trim();
        loadAppointments();
    });
}

if (todayButton) {
    todayButton.addEventListener("click", () => {
        selectedDate = new Date().toISOString().slice(0, 10);
        if (datePicker) {
            datePicker.value = selectedDate;
        }
        loadAppointments();
    });
}

if (datePicker) {
    datePicker.addEventListener("change", () => {
        selectedDate = datePicker.value;
        loadAppointments();
    });
}

async function loadAppointments() {
    if (!token || !doctorId) {
        alert("Unauthorized: Token or doctor ID not found. Please log in again.");
        window.location.href = "/";
        return;
    }

    try {
        const appointments = await getPatientAppointments(doctorId, token, 'doctor', selectedDate, patientName);

        if (appointmentsTableBody) {
            appointmentsTableBody.innerHTML = "";

            if (appointments && appointments.length > 0) {
                appointments.forEach(appointment => {
                    const row = createPatientRow(appointment.patient, appointment.id, doctorId);
                    appointmentsTableBody.appendChild(row);
                });
            } else {
                const noAppointmentsRow = document.createElement('tr');
                const messageCell = document.createElement('td');
                messageCell.setAttribute('colspan', '5');
                messageCell.textContent = `No appointments found for ${selectedDate}${patientName ? ` for patient "${patientName}"` : ""}.`;
                messageCell.style.textAlign = 'center';
                noAppointmentsRow.appendChild(messageCell);
                appointmentsTableBody.appendChild(noAppointmentsRow);
            }
        }
    } catch (error) {
        console.error("Error loading appointments:", error);
        if (appointmentsTableBody) {
            appointmentsTableBody.innerHTML = "";
            const errorRow = document.createElement('tr');
            const messageCell = document.createElement('td');
            messageCell.setAttribute('colspan', '5');
            messageCell.textContent = "Error loading appointments. Please try again later.";
            messageCell.style.color = 'red';
            messageCell.style.textAlign = 'center';
            errorRow.appendChild(messageCell);
            appointmentsTableBody.appendChild(errorRow);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.renderContent) {
        window.renderContent();
    }
    loadAppointments();
});