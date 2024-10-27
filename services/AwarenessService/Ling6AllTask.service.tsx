import * as URL from "../url";

const getLing6AllTasksByPatientId = async (id: any) => {
    const response = await fetch(URL.GET_LING6_TASKS_BY_PATIENT_ID(id), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}

const getLing6AllTaskByID = async (id: any) => {
    const response = await fetch(URL.LING6_TASKS_BY_ID(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}

const collectResponse = async (id: any, body: any) => {
    const response = await fetch(URL.LING6_COLLECT_RESPONSE(id), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
}

export default {
    getLing6AllTasksByPatientId,
    getLing6AllTaskByID,
    collectResponse
}