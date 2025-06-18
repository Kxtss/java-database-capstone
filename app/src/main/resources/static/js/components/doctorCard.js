// js/components/doctorCard.js

import { deleteDoctor } from '../services/doctorServices.js';
import { getPatientData } from '../services/patientServices.js';
import { showBookingOverlay } from '../pages/loggedPatientDashboard.js';

export function createDoctorCard(doctor) {
    const card = document.createElement("div");
    card.classList.add("doctor-card");
    card.dataset.doctorId = doctor.id;

    const role = localStorage.getItem("userRole");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("doctor-info");

    const name = document.createElement("h3");
    name.textContent = doctor.name;

    const specialization = document.createElement("p");
    specialization.classList.add("doctor-specialty");
    specialization.textContent = `Specialty: ${doctor.specialty}`;

    const email = document.createElement("p");
    email.classList.add("doctor-email");
    email.textContent = `Email: ${doctor.email}`;

    const availability = document.createElement("p");
    availability.classList.add("doctor-availability");
    if (doctor.availability && doctor.availability.length > 0) {
        const formattedTimes = doctor.availability.map(slot => {
            const start = new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const end = new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `${start}-${end}`;
        });
        availability.textContent = `Availability: ${formattedTimes.join(", ")}`;
    } else {
        availability.textContent = 'Availability: No availability';
    }

    infoDiv.appendChild(name);
    infoDiv.appendChild(specialization);
    infoDiv.appendChild(email);
    infoDiv.appendChild(availability);

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("card-actions");

    if (role === "admin") {
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Delete";
        removeBtn.classList.add("btn", "btn-danger");

        removeBtn.addEventListener("click", async () => {
            const confirmDeletion = confirm(`Are you sure you want to delete ${doctor.name}?`);
            if (confirmDeletion) {
                const adminToken = localStorage.getItem("token");
                if (!adminToken) {
                    alert("Unauthorized: Administrator token not found.");
                    window.location.href = "/";
                    return;
                }
                try {
                    await deleteDoctor(doctor.id, adminToken);
                    alert(`${doctor.name} successfully removed.`);
                    card.remove();
                } catch (error) {
                    console.error("Error deleting doctor:", error);
                    alert(`Error deleting ${doctor.name}: ${error.message || 'Unknown error'}`);
                }
            }
        });
        actionsDiv.appendChild(removeBtn);

    } else if (role === "patient") {
        const bookNowBtn = document.createElement("button");
        bookNowBtn.textContent = "Book Now";
        bookNowBtn.classList.add("btn", "btn-primary");

        bookNowBtn.addEventListener("click", () => {
            alert("You need to log in to book an appointment.");
        });
        actionsDiv.appendChild(bookNowBtn);

    } else if (role === "loggedPatient") {
        const bookNowBtn = document.createElement("button");
        bookNowBtn.textContent = "Book Now";
        bookNowBtn.classList.add("btn", "btn-primary");

        bookNowBtn.addEventListener("click", async (e) => {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Session expired or unauthorized. Please log in again.");
                window.location.href = "/";
                return;
            }
            try {
                const patientData = await getPatientData(token);
                showBookingOverlay(e, doctor, patientData);
            } catch (error) {
                console.error("Error preparing reservation:", error);
                alert(`Error preparing reservation: ${error.message || 'Unknown error'}`);
            }
        });
        actionsDiv.appendChild(bookNowBtn);
    }
    card.appendChild(infoDiv);
    card.appendChild(actionsDiv);

    return card;
}