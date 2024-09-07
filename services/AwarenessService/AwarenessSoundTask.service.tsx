import * as URL from "../url";

const getAwarenessSoundTasksByPatientId = async (id: any) => {
    const response = await fetch(URL.GET_AWARENESS_TASKS_BY_PATIENT_ID(id), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}

const getAwarenessSoundTaskByID = async (id: any) => {
    const response = await fetch(URL.AWARENESS_BASIC_ID(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}

export default {
    getAwarenessSoundTasksByPatientId,
    getAwarenessSoundTaskByID
}