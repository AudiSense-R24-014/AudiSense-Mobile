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

const getIdentificationLevelTwoTaskByPatientId = async (id : any) => {
  const response = await fetch(URL.IDENTIFICATION_LEVEL2_TASK_BY_PATIENT_ID(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

const updateAnswerLevel1 = async (id : any, answer: any) => {
  const response = await fetch(URL.UPDATE_ANSWER_LEVEL1(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answer)
  })
  const data = await response.json();
  return data;
}

const updateAnswerLevel2 = async (id : any, answer: any) => {
  const response = await fetch(URL.UPDATE_ANSWER_LEVEL2(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(answer)
  })
  const data = await response.json();
  return data;
}

export default {
    getIdentificationLevelOneTaskByPatientId,
    getIdentificationLevelTwoTaskByPatientId,
    updateAnswerLevel1,
    updateAnswerLevel2
}
