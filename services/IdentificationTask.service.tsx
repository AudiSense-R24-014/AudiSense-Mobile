import * as URL from "./url";

const getIdentificationLevelOneTaskByPatientId = async (id : any) => {
  const response = await fetch(URL.IDENTIFICATION_LEVEL1_TASK_BY_PATIENT_ID(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export default {
    getIdentificationLevelOneTaskByPatientId
}
