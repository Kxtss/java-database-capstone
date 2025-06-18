// js/services/doctorServices.js

import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + '/doctor';

export async function getDoctors() {
    try {
        const response = await fetch(DOCTOR_API);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result.doctors || [];
    } catch (error) {
        console.error("Error fetching doctors:", error);
        alert(`Error fetching doctors: ${error.message || "Unknown error"}`);
        return [];
    }
}

export async function deleteDoctor(doctorId, token) {
    try {
        const response = await fetch(`${DOCTOR_API}/${doctorId}/${token}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Failed to delete doctor.");
        }
        return { success: response.ok, message: result.message };
    } catch (error) {
        console.error("Error deleting doctor:", error);
        alert(`Error deleting doctor: ${error.message || "Unknown error"}`);
        return { success: false, message: error.message || "Unknown error during deletion" };
    }
}

export async function saveDoctor(doctorData, token) {
    try {
        const method = doctorData.id ? "PUT" : "POST";
        const url = doctorData.id ? `${DOCTOR_API}/${doctorData.id}/${token}` : `${DOCTOR_API}/${token}`;

        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(doctorData)
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Failed to save doctor.");
        }
        return { success: response.ok, message: result.message, doctor: result.doctor };
    } catch (error) {
        console.error("Error saving doctor:", error);
        alert(`Error saving doctor: ${error.message || "Unknown error"}`);
        return { success: false, message: error.message || "Unknown error during save" };
    }
}

export async function filterDoctors(name = '', time = '', specialty = '') {
    try {
        const encodedName = encodeURIComponent(name);
        const encodedTime = encodeURIComponent(time);
        const encodedSpecialty = encodeURIComponent(specialty);

        const url = `${DOCTOR_API}/filter?name=${encodedName}&time=${encodedTime}&specialty=${encodedSpecialty}`;

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `Failed to fetch doctors: ${response.statusText}`);
        }

        const data = await response.json();
        return data.doctors || [];
    } catch (error) {
        console.error("Error filtering doctors:", error);
        alert(`Something went wrong while filtering doctors: ${error.message || "Unknown error"}`);
        return [];
    }
}