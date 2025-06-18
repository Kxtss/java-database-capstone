// js/services/patientServices.js

import { API_BASE_URL } from "../config/config.js";
const PATIENT_API = API_BASE_URL + '/patient';

export async function patientSignup(data) {
    try {
        const response = await fetch(`${PATIENT_API}`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message);
        }
        return { success: response.ok, message: result.message };
    }
    catch (error) {
        console.error("Error :: patientSignup :: ", error);
        return { success: false, message: error.message };
    }
}

export async function patientLogin(data) {
    console.log("patientLogin :: ", data);
    return await fetch(`${PATIENT_API}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

export async function getPatientData(token) {
    try {
        const response = await fetch(`${PATIENT_API}/${token}`);
        const data = await response.json();
        if (response.ok) return data.patient;
        return null;
    } catch (error) {
        console.error("Error fetching patient details:", error);
        return null;
    }
}

export async function getPatientAppointments(id, token, user, date = '', name = '') {
    try {
        let queryParams = new URLSearchParams();
        if (date) queryParams.append('date', date);
        if (name) queryParams.append('name', name);

        const url = `${PATIENT_API}/${id}/${user}/${token}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched appointments:", data.appointments);
        if (response.ok) {
            return data.appointments;
        }
        return null;
    }
    catch (error) {
        console.error("Error fetching patient details or appointments:", error);
        return null;
    }
}

export async function filterAppointments(condition, name, token) {
    try {
        const response = await fetch(`${PATIENT_API}/filter/${condition}/${name}/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data;

        } else {
            console.error("Failed to fetch doctors:", response.statusText);
            return { appointments: [] };

        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
        return { appointments: [] };
    }
}