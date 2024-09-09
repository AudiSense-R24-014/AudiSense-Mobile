import * as URL from "../url";

const getLing6SeparateTasksByPatientId = async (id: any) => {
    const response = await fetch(URL.GET_LING6_SEPARATE_TASKS_BY_PATIENT_ID(id), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}

const getLing6SeparateTaskByID = async (id: any) => {
    const response = await fetch(URL.LING6_SEPARATE_TASKS_BY_ID(id), {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
}

const collectResponse = async (id: any, body: any) => {
    const response = await fetch(URL.LING6_SEPARATE_COLLECT_RESPONSE(id), {
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
    getLing6SeparateTasksByPatientId,
    getLing6SeparateTaskByID,
    collectResponse
}