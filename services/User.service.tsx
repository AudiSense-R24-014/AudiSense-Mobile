import * as URL from "./url";

const patientLogin = async (email: string, password: string) => {
    const response = await fetch(URL.PATIENT_LOGIN, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    return data;
};

export default { patientLogin };
